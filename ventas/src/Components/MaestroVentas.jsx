import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Label, Input, Form, FormText } from 'reactstrap'
import RegistroVenta from "./RegistroVenta"

const data = [{
    id: "V-0001", idcliente: "1090447211", nombrecliente: "Juan perez", idvendedor:"VEN001", nombrevenderor:"Carlos Lopez", fechaventa:"01/10/2021", cantidadproductos:15, valortotal:150000, estado:'P'
}];

export class MaestroVentas extends React.Component {
    state = {
        data: data,
        form: {
            id: '',
            idcliente: '',
            nombrecliente: '',
            idvendedor: '',
            nombrevenderor: '',
            fechaventa: "01/01/2021", 
            cantidadproductos: 0, 
            valortotal: 0, 
            estado:'P',
        },
        modalInsertar: false,
    }

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
        console.log(this.state)
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true })
    }

    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false })
    }

    insertar = () => {
        var valorNuevo = { ...this.state.form };
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ data: lista, modalInsertar: false })
    }

    render() {
        return (
            <div>
                <Container>
                    <br />
                    <br />
                    <br />
                    <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear Nueva Venta</Button>
                    <br /><br />



                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Id cliente</th>
                                <th>Valor Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((elemento) => (
                                <tr>
                                    <td>{elemento.id}</td>
                                    <td>{elemento.idcliente}</td>
                                    <td>{elemento.valortotal}</td>
                                    <td>{elemento.estado}</td>
                                    <td><Button color="primary">Editar</Button>
                                        <Button color="danger">Eliminar</Button></td>
                                </tr>
                            ))}
                        </tbody>

                    </Table>

                </Container>

                <Modal className="modal-dialog modal-dialog-centered" isOpen={this.state.modalInsertar}>
                   <RegistroVenta handleAddVentasClick={this.ocultarModalInsertar}></RegistroVenta>
                </Modal>
            </div>
        )
    }
}


export default MaestroVentas;