import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { auth } from '../firebase'
import { withRouter } from "react-router-dom";

const Navbar = (props) => {

    const cerrarSesion= () => {
        auth.signOut()
            .then(()=>{
                props.history.push('/login')
            })
    }

    return (
        <div>
            {
                props.firebaseUser !== null ? (
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link className="navbar-brand" to="/admin">
                            <img src="https://cdn-icons-png.flaticon.com/512/1069/1069102.png" alt="" width="30" height="24"/>
                            <span> </span>
                            Modulo Ventas</Link>
    
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                  
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <NavLink className="btn btn-primary mr-2" to="/RegistroVentas" >
                                    Registro Ventas
                                </NavLink>
                                <NavLink className="btn btn-primary mr-2" to="/MaestroVentas">
                                    Maestro Ventas
                                </NavLink>
                                <NavLink className="btn btn-primary mr-2" to="/MaestroProductos">
                                    Maestro Productos
                                </NavLink>
                                <button className="btn btn-primary"
                                    onClick = {()=> cerrarSesion()}
                                    > Cerrar Sesión </button>
                            </ul>
  
    
                        </div>
                    </div>
                </nav>
                ) : (
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                       <div className="container-fluid">
                            <Link className="navbar-brand" to="/admin">
                                <img src="https://cdn-icons-png.flaticon.com/512/1069/1069102.png" alt="" width="30" height="24"/>
                                <span> </span>
                                Modulo Ventas
                            </Link>
                            <div class="d-flex">
                                <NavLink className="btn btn-primary " to="/login">
                                Login
                                </NavLink>
                            </div>
                        </div> 
                    </nav>

                )
            }

        </div>
    )
}

export default withRouter(Navbar)