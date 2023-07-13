import React, { useEffect, useState } from 'react'
import './style.css'
import {MdOutlineCancel} from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import {TbEdit} from 'react-icons/tb'
const ListToDo = ({tasks,setTasks,setTask,task,isScreenSmall, setIsScreenSmall}) => {
    const[todos,setTodos] = useState([])
    const[inProgress,setInProgress]=useState([])
    const[closed,setClosed] = useState([])
    useEffect(()=>{
        console.log(tasks)
    const  fTodos =tasks && tasks.filter((task)=>task.status === "todos")
    const  fInProgress =tasks && tasks.filter((task)=>task.status === "inProgress")
    
    const fClosed =tasks &&  tasks.filter((task)=>task.status === "closed")
    setTodos(fTodos)
    setInProgress(fInProgress)
    setClosed(fClosed)
    },[tasks])
    console.log(todos && todos?.length)
    console.log(inProgress && inProgress?.length)
    console.log(closed && closed?.length)
    const statues = ['todos','inProgress','closed']
    return (
        <div className={`${isScreenSmall ? "list-wrapper-xsize" :  "list-wrapper"}`}>
         
            {
                statues.map((status,index)=>{
                    return(
                       <Section key={index} task={task} tasks={tasks} setTasks={setTasks} status={status} todos={todos} inProgress={inProgress} closed={closed} />
   
                    )
                })
            }
           
            
        </div>
    )
}

export default ListToDo

const Section = ({status,tasks,setTasks,todos,inProgress,closed,task ,setTask}) =>{

    const [{ isOver }, drop] = useDrop(() => ({
		
        accept: 'task',
        drop:(item)=>addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver()
       
        })
        
      }))

    let text = "todo"
    let bg="primary"
    let count=todos && todos?.length
    let taskToMap = todos
    console.log(tasks)
    if(status === "inProgress"){
        text = "in progress"
        bg = "warning"
        count=inProgress && inProgress?.length
        console.log(inProgress)
        taskToMap=inProgress
    }
    if(status === "closed"){
        text = "Closed"
        bg = "secondary"
       count =closed && closed?.length
       taskToMap = closed
       console.log(closed)
    }
    const addItemToSection = (id)=>{
       setTasks((prev)=>{
        const nTask = prev.map(t=>{
            if(t.id === id){
             return {...t,status:status}
            }
            return t
        })
        return nTask
       })
        }
    return (<>
    <div style={{background:`${isOver ? '#eee' : ''}`}} ref={drop}>
     
        <Header bg={bg} text={text} w={count} />
        {
          taskToMap &&  taskToMap?.length > 0 && taskToMap?.map((task)=>(<Tasks key={task.id} task={task} tasks={tasks} setTasks={setTasks}  />))
        } 
    </div>
    </>)
}
const Header = ({bg,text,w})=>{
    return(<>
    <div className={`bg-${bg} text-light d-flex justify-content-between p-4 m-2 fs-5`}>
        {text}
        <span className='badge bg-light rounded text-dark'>{w}</span>
    </div>
    </>)
}

const Tasks = ({tasks,setTasks,task})=>{
    const [{ isDragging }, drag] = useDrag(() => ({
		
    type: 'task',
    item:{id:task.id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
   
    })
    
  }))
  console.log(isDragging)
    const handleDelete = (id) =>{
       const filterData = tasks.filter((task)=>task.id !== id)
       setTasks(localStorage.setItem('tasks',JSON.stringify(filterData)))
       setTasks(filterData)
     
       
    }
    const[onUpdate,setOnUpdate] = useState(false)
    const[taskUpdated,setTaskUpdated] = useState({
        id:task && task?.id,
        name:task.name,
        status:task.status
    })
    console.log(taskUpdated)
    const handleUpdate =(task)=>{
  
     console.log(task)
     setTasks((prev) => {
        const updatedTasks = prev.map((x) => {
          if (x.id === task.id) {
            return { ...x, id: task.id,name:task.name,status:task.status }; // Modification de la propriété "task"
          }
          return x; // Renvoie l'élément sans modification s'il ne correspond pas à l'ID
        });
        
        return updatedTasks;
      });
localStorage.setItem('tasks',JSON.stringify(tasks))
setOnUpdate(false)
    }
    return(<>
    <div ref={drag} className={`p-4 m-2 d-flex justify-content-between ${isDragging ? "bg-dark text-light opacity-50" : "text-dark"}`} style={{boxShadow:'0 0 10px rgb(114, 110, 110)'}}>
    
        {onUpdate ? <div className='d-flex flex-column gap-10' style={{width:'70%'}}>

            <input className='custom-input form-control' type='text'  name='taskUpdate' value={taskUpdated.name} onChange={(e)=>setTaskUpdated({...taskUpdated,id:task.id,status:task.status,name:e.target.value})}  /> <button onClick={()=>handleUpdate(taskUpdated)} className='d-blcck mx-auto p-1 btn-sm btn-success
            '>Save</button>
        </div> :  <p className='position-relative'>  { (task.name)}</p> } 

        <div>
        <MdOutlineCancel className='fs-4' onClick={()=>handleDelete(task.id)} />      
        <TbEdit className='fs-4 mx-3' onClick={()=>   setOnUpdate(!onUpdate)   } />
        
        </div>
      
    </div>
    </>)
}