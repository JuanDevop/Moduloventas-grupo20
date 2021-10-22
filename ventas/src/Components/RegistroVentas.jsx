import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'
import {Table,Button, FormGroup,Label,Input,Form} from 'reactstrap'

const RegistroVentas = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(()=>{
        if(auth.currentUser){
            setUser(auth.currentUser)
        }else{
            props.history.push('/login')
        }

    },[props.history])



    return (
        <div>
                <br />   
                    <Form>
                        <div className="row">
                            <FormGroup className="col">
                            <Input type="text " value="02/10/2021" readonly />
                            </FormGroup>
                            <FormGroup className="col">
                            <Input type="text " value="Natalia" readonly />
                            </FormGroup>
                        </div>
                        <br />
                        <div className="row">
                    <FormGroup className="col">
                            <Label>Identificacion Cliente</Label>
                            <Input type="text"></Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>Nombre Cliente</Label>
                            <Input type="text"></Input>
                        </FormGroup>
                        </div>
                        <div className="row">
                        <FormGroup className="col">
                            <Label>Identificador Producto</Label>
                            <Input type="select" >
                            <option>gaseosa</option>
                            <option>ponque</option>
                            <option>galletas</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>Cantidad</Label>
                            <Input type="number"></Input>
                        </FormGroup>
                        <FormGroup className="col">
                            <Label>PrecioUnitario</Label>
                            <Input type="number"></Input>
                        </FormGroup>
                        </div>
                        <br />
                        <Button>Agregar</Button>
                    </Form>
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

                    </tbody>

                </Table>         
              
        </div>

    )
}

export default withRouter(RegistroVentas)