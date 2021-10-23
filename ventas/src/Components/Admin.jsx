import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'
import {Table,Button,Container,Modal,ModalBody,ModalHeader, FormGroup , ModalFooter,Label,Input,Form,FormText} from 'reactstrap'

const Admin = (props) => {

    const [user, setUser] = React.useState(null)


    React.useEffect(()=>{
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }

    },[props.history])

    const handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]:e.target.value,
            }  
        })
        console.log(this.state) 
    }

    const mostrarModalInsertar=()=>{
        this.setState({modalInsertar:true})
    }

    const ocultarModalInsertar=()=>{
        this.setState({modalInsertar:false})
    }

    const insertar=()=>{
        var valorNuevo={...this.state.form};
        var lista=this.state.data;
        lista.push(valorNuevo);
        this.setState({data:lista,modalInsertar:false})
    }


    return (
        <div className="mt-5">
            <Container>
                <br />   
                    <Button color="success" onClick={()=>mostrarModalInsertar()}>Crear Nuevo Usuario</Button>
                <br /><br />   

                <Table>
                    <thead>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>ROL</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((elemento)=>(
                            <tr>
                                <td>{elemento.cedula}</td>
                                <td>{elemento.nombre}</td>
                                <td>{elemento.rol}</td>
                                <td>{elemento.estado}</td>
                                <td><Button color="primary">Editar</Button>
                                <Button color="danger">Eliminar</Button></td>
                            </tr>   
                        ))}
                    </tbody>

                </Table>

            </Container>         
            <Modal  className="modal-dialog modal-dialog-centered" >
            <ModalHeader>
                Crear Nuevo Usuario
            </ModalHeader>    
            <ModalBody>
                <Form>
                <FormGroup>
                    <Label for= "cedula"> Cedula</Label>
                    <Input type="text" id="cedula" name="cedula" />
                </FormGroup>
                <FormGroup>
                    <Label for= "nombre" > Nombre</Label>
                    <Input type="text" id="nombre" name="nombre" />
                </FormGroup>
                <FormGroup>
                    <Label for= "ROL"> Rol</Label>
                    <Input type="select" id="rol" name="rol" >
                       <option>Administrador</option> 
                       <option>Vendedor</option> 
                    </Input>
                </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="Primary" onClick={()=>insertar()}> Insertar</Button>
                <Button color="Primary" onClick={()=>ocultarModalInsertar()}> Cancelar</Button>
            </ModalFooter>


        </Modal>   
        </div>
    )
}

export default withRouter(Admin)