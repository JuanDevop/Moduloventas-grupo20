import React from 'react'
import { withRouter } from "react-router-dom";
import {Table,Button, FormGroup,Label,Input,Form} from 'reactstrap'
import { auth, db } from '../firebase'

const RegistroVentas = (props) => {

    const [user, setUser] = React.useState(null)
    const [identificador, setIdentificador] = React.useState('')
    const [cliente, setCliente] = React.useState('')
    const [producto, setProducto] = React.useState('')
    const [cantidad, setCantidad] = React.useState('')
    const [precio, setPrecio] = React.useState('')
    const [total, setTotal] = React.useState('')
    const [productos, setProductos] = React.useState([])
    const [lista, setLista]=React.useState([])


    React.useEffect(()=>{
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

    },[props.history])


    const agregar = () => {

        const subtotal = cantidad * precio
        console.log(subtotal)

        const nuevaLinea = {
            producto: producto,
            cantidad: cantidad,
            precio : precio,
            subtotal: subtotal
        }

        setLista([
            ...lista,
            nuevaLinea
        ])

        setProducto('')
        setCantidad('')
        setPrecio('')
    }

    const guardar = async () => {

        if(lista.length <= 0){
            window.alert("Agregue al menos 1 producto");
            return
        }

        lista.map(item => {
            setTotal(item.subtotal + total)
        })

        try {
            const nuevaVenta = {
                idCliente : identificador,
                cliente : cliente,
                desgloceventa: lista,
                total : total
            }
            const data = await db.collection('Ventas').add(nuevaVenta)

        } catch(error) {
            console.log(error)
        }

        setLista([])

    }


    return (
        <div>
                <br />   
                    <Form>
                        <div className="row">
                            <FormGroup className="col">
                            <Input type="text " value="23/10/2021" readonly />
                            </FormGroup>
                            <FormGroup className="col">
                            <Input type="text " value="Natalia" readonly />
                            </FormGroup>
                        </div>
                        <br />
                        <div className="row">
                    <FormGroup className="col">
                            <Label>Identificacion Cliente</Label>
                            <Input type="text" onChange={(e) => setIdentificador(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>Nombre Cliente</Label>
                            <Input type="text" onChange={(e) => setCliente(e.target.value)}></Input>
                        </FormGroup>
                        </div>
                        <div className="row">
                        <FormGroup className="col">
                            <Label>Identificador Producto</Label>
                            <Input type="select" onChange={(e) => setProducto(e.target.value)} >
                            <option disabled selected value> -- seleccione Producto-- </option>
                            {
                                productos.map(item => (
                                <option> {item.Descripcion} </option>
                                ))
                            }
                            </Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>Cantidad</Label>
                            <Input type="number" onChange={(e) => setCantidad(e.target.value)}></Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>Precio Unitario</Label>
                            <Input type="number" onChange={(e) => setPrecio(e.target.value)}></Input>
                        </FormGroup>
                        </div>
                        <br />
                        <Button className="btn btn-success" onClick={() => agregar()}>Agregar</Button>
                    </Form>
                    <br />
                <Table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Valor total</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lista.map(item => (
                                <tr>
                                    <td>{item.producto}</td>
                                    <td>{item.cantidad}</td>
                                    <td>${item.precio}</td>
                                    <td>${item.subtotal}</td>
                                    <td>
                                    <div class="d-grid gap-2 d-md-block">
                                        <button 
                                            className="btn btn-danger btn-sm me-2"
                                        >
                                        Eliminar
                                        </button>
                                    </div>    
                                    </td>
                                </tr>    
                            ))
                        }
                    </tbody>
                    <br />
                    <br />
                    <br />
                    <Button className="btn btn-success" onClick={() => guardar()}>Guardar</Button>
                    
                </Table>         
              
        </div>

    )
}

export default withRouter(RegistroVentas)