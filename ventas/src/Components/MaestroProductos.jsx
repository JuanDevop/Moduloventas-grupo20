import React from 'react'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label, Input, Form} from 'reactstrap'
import { auth, db } from '../firebase'
import { withRouter } from "react-router-dom";

const MaestroProductos = (props) => {
     
    const [modal,setModal] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [productos, setProductos] = React.useState([])
    const [nuevoProducto, setNuevoProducto] = React.useState({})
    const [id, setId] = React.useState('')
    const [descripcion, setDescripcion] = React.useState('')
    const [valorUnitario, setValorUnitario] = React.useState('')
    const [cantidadDisponible, setCantidadDisponible] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)

    const mostrarModal = () =>{
        setModal(!modal)
        setId('')
        setDescripcion('')
        setValorUnitario('')
        setCantidadDisponible('')
    }

    React.useEffect(() => {

        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }

        const obtenerDatos = async () => {
            try {
                const data = await db.collection('productos').get()
                const arrayData = data.docs.map(doc => ({id:doc.id , ...doc.data()}))
                setProductos(arrayData)     
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos()
    
    }, [props.history])

    const agregar = async () => {

        if(!id.trim()|| !descripcion.trim() || !valorUnitario.trim()|| !cantidadDisponible.trim()){
            window.alert("Campos incompletos");
            return
        }

        try{

            const nuevaTarea = {
                ID: id,
                Descripcion : descripcion,
                Disponibilidad : cantidadDisponible,
                valorUnitario : valorUnitario
            }

            const data = await db.collection('productos').add(nuevaTarea)
            setProductos([
                ...productos,
                nuevaTarea
            ])
            mostrarModal()

        }catch(error){
            console.log(error)
        }


    }

    const eliminar = async (docId) => {

        try {
            
            await db.collection('productos').doc(docId).delete()

            const arrayFiltrado = productos.filter(item => item.id !== id)
            setProductos(arrayFiltrado)

        } catch (error) {
            console.log(error)
        }
    }

    const botonEditar = () => {

    }

    const editar = async () => {

    }

    return (
        <div>
        <Container>
            <br />
            <br />
            <br />
            <Button color="success" onClick={()=>mostrarModal()}>Crear Nuevo Producto</Button>
            <br /><br />



            <Table>
                <thead>
                    <tr>
                        <th >Id</th>
                        <th >Descripcion</th>
                        <th >Valor Unitario</th>
                        <th >Cantidades Disponibles</th>
                        <th >Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map(item => (
                            <tr key={item.id}>
                                <td width="8%" align="center">{item.ID}</td>
                                <td width="46%" >{item.Descripcion}</td>
                                <td width="14%" align="center">${item.valorUnitario}</td>
                                <td width="18%" align="center">{item.Disponibilidad}</td>
                                <td width="14%" align="center">
                                <div class="d-grid gap-2 d-md-block">
                                    <button 
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => eliminar(item.id)}
                                    >
                                    Eliminar
                                    </button>
                                    <button 
                                    className="btn btn-warning btn-sm"
                                    >
                                    Editar
                                    </button>
                                </div>    
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </Table>

        </Container>

        <Modal className="modal-dialog modal-dialog-centered" isOpen={modal}>
            <ModalHeader>
                {modoEdicion ? 'Editar Producto':'Crear Nuevo Producto'}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="id">Id</Label>
                        <Input type="text" id="id" name="id" onChange={e => setId(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion" > Descripcion</Label>
                        <Input type="text" id="descripcion" name="descripcion" onChange={e => setDescripcion(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="valorunitario" > Valor Unitario</Label>
                        <Input type="number" step="1" id="valorunitario" name="valorunitario" onChange={e => setValorUnitario(e.target.value)}/>
                    </FormGroup>
                    <FormGroup >
                            <Label for="disponible" > Cantidad Disponible</Label>
                            <Input type="number" step="1" id="disponible" name="disponible" onChange={e => setCantidadDisponible(e.target.value)}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            
            <ModalFooter>
                {
                    modoEdicion ? (
                        <Button className="btn btn-success" onClick={() => editar()}> Editar</Button>
                    ) : (
                        <Button className="btn btn-success" onClick={() => agregar()}> Insertar</Button>
                    )
                }
                <Button className="btn btn-danger" onClick={()=>mostrarModal()}> Cancelar</Button>
            </ModalFooter>
        </Modal>
    </div>
    )
}

export default withRouter(MaestroProductos)