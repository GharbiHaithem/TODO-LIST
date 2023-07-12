
import './App.css';
import CreateToDoList from './Component/CreateToDoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListToDo from './Component/ListToDo';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  const[tasks,setTasks] = useState([])
  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  },[])
  return (
   
    <DndProvider backend={HTML5Backend}>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    <CreateToDoList tasks={tasks} setTasks={setTasks} />
    <ListToDo tasks={tasks} setTasks={setTasks}/>
    </DndProvider>

  );
}

export default App;
