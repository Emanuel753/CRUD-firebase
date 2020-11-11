import React,{useEffect, useState} from 'react'
import {auth} from './firebase'
import {withRouter} from 'react-router-dom'
import Tareas from './Tareasusuarios'

const Admin = ({history}) => {
    const [user,setUser] = useState(null)

    useEffect(()=>{
            const usuario =  auth.currentUser
            if(usuario){
              const email = auth.currentUser.email

              setUser(email)
             }else{
                history.push("/login")
             }

        
    },[history])

    return (
        <div>
            
            <Tareas user = {user} />
        </div>
    )
}

export default withRouter(Admin)
