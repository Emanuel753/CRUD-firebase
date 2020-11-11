import React from 'react'
import {Link} from 'react-router-dom'
import {auth} from './firebase'
import {withRouter} from 'react-router-dom'

const navBar = ({history}) => {

  const cerrarSesion = () =>{
    auth.signOut().then(()=>{
      history.push("/")
    })
  }

    return (
        <div>
            <nav className ="navbar navbar-expand-lg navbar-dark bg-primary" >
                 <Link className ="navbar-brand" to="/">Emanuel</Link>
                 <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                   <span className ="navbar-toggler-icon"></span>
                 </button>
                 <div className ="collapse navbar-collapse" id="navbarNavAltMarkup">
                   <div className ="navbar-nav">
                     {auth.currentUser && <Link className ="nav-item nav-link float-right" to="/Admin">Admin <span className ="sr-only">(current)</span></Link>}
                     {auth.currentUser ? 
                     (<button className ="btn btn-dark float-right" onClick = {()=> cerrarSesion()}>Salir</button>):
                     (<Link className ="nav-item nav-link float-right" to="/login">Login</Link>)
                    }
                     
                   </div>
                 </div>
            </nav>
        </div>
    )
}

export default withRouter(navBar)
