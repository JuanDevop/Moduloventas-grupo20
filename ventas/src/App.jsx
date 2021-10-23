import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Admin from './Components/Admin';
import {auth} from './firebase'
import React from 'react';
import RegistroVentas from './Components/RegistroVentas';
import MaestroProductos from './Components/MaestroProductos';
// import MaestroVentas from './Components/MaestroVentas';




function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])

  return firebaseUser !== false ? (
  <Router>
    <Navbar firebaseUser={firebaseUser} />
    <div className="container mt-3">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/RegistroVentas">
        <RegistroVentas />
        </Route>
        <Route path="/MaestroVentas">
  
        </Route>
        <Route path="/MaestroProductos">
          <MaestroProductos />
        </Route>
        <Route path="/" exact>
          
        </Route>
      </Switch>
    </div>
  </Router>
  ) : (
    <p>Cargando ...</p>
  )
}

export default App;

