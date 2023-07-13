
import './App.css';
import CreateToDoList from './Component/CreateToDoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListToDo from './Component/ListToDo';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
function App() {
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  useEffect(() => {
      const handleResize = () => {
          const isSmall = window.matchMedia("(max-width: 600px)").matches;
          setIsScreenSmall(isSmall);
      };

      // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
      window.addEventListener("resize", handleResize);

      // Vérifie la taille de l'écran au chargement initial de la page
      handleResize();
      console.log(isScreenSmall)
      // Nettoie l'écouteur d'événement lorsque le composant est démonté
      return () => {
          window.removeEventListener("resize", handleResize);
      };

  }, [isScreenSmall]);
  const[task,setTask] = useState({
    id : "",
    name: "",
    status:"todos"
})
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
    <CreateToDoList task={task} isScreenSmall={isScreenSmall} setIsScreenSmall={setIsScreenSmall} setTask={setTask} tasks={tasks} setTasks={setTasks} />
    <ListToDo task={task} setTask={setTask} tasks={tasks} setTasks={setTasks} isScreenSmall={isScreenSmall} setIsScreenSmall={setIsScreenSmall} />
  
    </DndProvider>

  );
}

export default App;
