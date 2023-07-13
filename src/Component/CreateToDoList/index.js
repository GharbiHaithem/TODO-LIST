import React, { useState } from 'react'
import './style.css'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import FadingText from '../FadingText';
const CreateToDoList = ({tasks,setTasks}) => {
    const[task,setTask] = useState({
        id : "",
        name: "",
        status:"todos"
    })
    console.log(task)
    const handleSubmit=(e)=>{
        e.preventDefault()
        setTasks((prev)=>{
        
            return [...prev || [],task]
        })
        setTask({...task,id:"",name:""})
        localStorage.setItem("tasks",JSON.stringify(tasks))
        toast.success("TODO Creted Successfuly")
    }
    console.log(tasks)
    return (
      <div className='container'>
      <div className='text-center my-3 py-3 ' style={{height:'100px'}}><h1 ><FadingText text={'TODO APPLICATION'} /></h1></div>
        <div className='to-do-list-wrapper'>
        
        <form onSubmit={handleSubmit}>
           <div className='form-group d-flex align-items-center gap-20'> 
           <input className='custom-input form-control' name='task' value={task.name} onChange={(e)=>setTask({...task,id:uuidv4(),name:e.target.value})} type='text' placeholder='Enteer Task ...'  />
           <button className='btn btn-sm btn-success ' type='submit'>Add Task</button>
           </div>
        </form>
    </div>
      </div>
    )
}

export default CreateToDoList
