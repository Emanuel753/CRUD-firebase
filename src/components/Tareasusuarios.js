import React,{useState,useEffect} from 'react'
import {db} from './firebase'

const Tareas = ({user})=>{
    const [tareas,setTareas] = useState([])
    const [tarea, setTarea] = useState("")
    const [edicion, setEdicion] = useState(false)
    const [id, setID] = useState("")
    useEffect(()=>{
        try {
            const obtenerDatos = async () =>{
                
                const data = await db.collection("user_" + user).get()
                const arrayData = await data.docs.map(doc => ({
                    id:doc.id,
                    ...doc.data()
                }))
                setTareas(arrayData)
            }
            obtenerDatos()
        } catch (error) {
            console.log(error)
        }
    },[user])

    const agregarTarea = async (e) =>{
        e.preventDefault()

        if(!tarea.trim()){
            console.log("ingrese una tarea")
            return
        }

        try {
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now()
            }
            const data = await db.collection("user_" + user).add(nuevaTarea)
            setTarea('')
            setTareas([
                ...tareas,
                {...nuevaTarea,id: data.id}
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const eliminar = async (id) =>{
        
        await db.collection("user_" + user).doc(id).delete()
        const arrayEliminado = tareas.filter(items => items.id !== id)
        setTareas(arrayEliminado)
        console.log("Se elimino la tarea")
    }

    const editarTarea = (item)=>{  
        setTarea(item.name)
        setEdicion(true)
        setID(item.id)
    }
    const finalizarEdicion = async (e)=>{
        e.preventDefault()

        if(!tarea.trim()){
            console.log("ingrese una tarea")
            return
        }
        try {
            
            await db.collection("user_" + user).doc(id).update({name: tarea})

            const arraEditado = tareas.map((items)=>(
                items.id === id ? {id:id,name: tarea,fecha:items.fecha}: items
            ))
            setTareas(arraEditado)
        } catch (error) {
            console.log(error)
        }
        setTarea("")
        setEdicion(false)
        setID("")
    }

    return (
        <div className = "container mt-3">
          <div className = "row">
              <div className = "col-md-6">
                    <ul className = "list-group">
                        {tareas.map((datos)=>
                           (<li className = "list-group-item" key = {datos.id}>
                            {datos.name}    
                            <button className = "btn btn-danger float-right"
                            onClick = {()=> eliminar(datos.id)}>
                                Eliminar
                            </button>
                            <button className = "btn btn-warning float-right mr-2"
                            onClick = {e=>editarTarea(datos)}>
                                Modificar
                            </button>
                            </li>)
                        )}
                    </ul>
              </div>
              <div className = "col-md-6">
                   <h3>Formulario</h3> 
                   <form onSubmit = {edicion ? finalizarEdicion : agregarTarea}>
                       <input 
                       type = "text"
                       placeholder = "Ingrese una tarea"
                       className = "form-control mb-2"
                       onChange = {e=>setTarea(e.target.value)}
                       value = {tarea}
                       />
                       {!edicion ? (<button 
                       type = "submit"
                       className = "btn btn-dark btn-block">Agregar</button>)
                       :
                       (<button 
                        type = "submit"
                        className = "btn btn-warning btn-block"
                        >Editar</button>)}
                       
                   </form>            
              </div>
          </div>
        </div>
    )
}

export default Tareas