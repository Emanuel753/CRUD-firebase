import React, {useState, useCallback, useEffect} from 'react'
import {auth, db} from './firebase'
import {withRouter} from 'react-router-dom'
import '../styles/spinner.css'

const Login = ({history}) => {
    
    const [user,setUser] = useState("prueba@prueba.com")
    const [pass,setPass] = useState("123456789")
    const [registrado,setRegistrado] = useState(true)
    const [firebase,setFirebase] = useState(false)
    console.log(auth.currentUser)

    useEffect(()=>{
        auth.onAuthStateChanged((usuario)=>{
            if(usuario){
                history.push("/Admin")
            }else{
                setFirebase(true)
            }
        })
    },[history])

    const enviar = (e) =>{
        e.preventDefault()
 
        if(registrado){ 
            ingresar()
        }else{
            registrarse()
        }
    }
    

    const registrarse = useCallback(async () => {
            
         await auth.createUserWithEmailAndPassword(user, pass).then((res)=>{
             db.collection("usuarios").doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })

            db.collection("user_" + user).add({
                name: "tarea de inicio",
                fecha: Date.now()
            })
            
            setUser("")
            setPass("")
            setRegistrado(true)
            alert("El usuario se creo correctamente")

        }).catch(function(error){
            if (error.code === "auth/invalid-email"){
                alert("Ingrese un mail valido")
                return
            }
            if(error.code === "auth/weak-password"){
                alert("ingrese una contraseña de 8 digitos")
                return
            }
            if(error.code === "auth/email-already-in-use"){
                alert("El usuario ya existe")
                return
            }
        })
                    
    },[user,pass])
 
    const ingresar = useCallback(() => {
        auth.signInWithEmailAndPassword(user, pass).then((res)=>{
            setUser("")
            setPass("")
            history.push('/admin')
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            if(error.code ==="auth/user-not-found"){
                alert("El usuario ingresado no existe")
                return    
            }
            if(error.code ==="auth/invalid-email"){
                alert("El email ingresado es incorrecto")
                return
            }
            if(error.code === "auth/wrong-password"){
                alert("contraseña incorrecta")
                return
            }
            console.log(errorCode)
            // ...
          });
    },[user,pass,history])

    return firebase === true ? (
        <div  className = "container">
              {registrado && (<h1 className = "text-center">Login de usuario</h1>) }
            {!registrado && (<h1 className = "text-center">Crear cuenta</h1>) }
            <hr />
         <div className = "row mt-5 justify-content-center">   
            <form onSubmit = {enviar} className = "col-md-6 col-sm-12 col-xs-12">
                <div className = "form-group">
                    <label htmlFor = "txtUsuario" type="email">Email</label>
                    <input onChange = {e=> setUser(e.target.value)}
                     className = "form-control" 
                     placeholder = "Email" 
                     id="txtUsuario" 
                     type = "email"
                     value = {user}></input>
                </div>
                <div className = "form-group">
                    <label htmlFor = "txtContrasenia" type = "password">Contraseña</label>
                    <input onChange = {e=> setPass(e.target.value)}
                    className = "form-control" 
                    placeholder = "Contraseña" 
                    id="txtContrasenia" 
                    type = "password"
                    value = {pass}></input>
                </div>
                <button type="submit" className ="form-control btn btn-primary  btn-block justify-content-center">Enviar</button>
                
                {registrado && <button onClick = {()=>setRegistrado(!registrado)} type="submit" className ="form-control btn btn-warning  btn-block ">Registrarse</button>}
                {!registrado && <button onClick = {()=>setRegistrado(!registrado)} type="submit" className ="form-control btn btn-warning  btn-block ">Ingresar con mi cuenta</button>}

            </form> 
        </div>
          
        </div>
    ) : (<div className = "lds-padre"><div className="lds-dual-ring"></div><span className = "lds-text">Cargando...</span></div>)

}

export default withRouter(Login)
