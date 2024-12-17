import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TodoCard from "./Components/TodoCard";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import Intro from "./Components/Intro";

const firebaseUrl = 'https://frontend-545b3-default-rtdb.asia-southeast1.firebasedatabase.app/';

function App(){
  let {user} = useUser();
  let {isSignedIn} = useAuth();
  let taskInput = useRef(null);
  let [todos, setTodos] = useState([])  
  let [formStatus, setFormStatus] = useState(false);  

  function handleSubmit(){ 
    setFormStatus(true);  
    let task = taskInput.current.value;
    axios.post(`${firebaseUrl}todos.json`, {  
      title: task,
      createdBy : user.username, // Which todo(task) is added by which user.
    }).then(()=>{
      setFormStatus(false);
      taskInput.current.value= ""; 
      fetchTodos();
    })
  }

  function fetchTodos(){  
    axios.get(`${firebaseUrl}todos.json`).then(todos=>{
      let tempTodos = []; 
      for(let key in todos.data){ 
        let todo = {  
          id: key,
          ...todos.data[key]  
        }
        tempTodos.push(todo)  
      }
      setTodos(tempTodos);
    })
  }

  function handleDelete(id){
    // console.log('delet the function') // to check it (we should not pass id while checking)
    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{
      fetchTodos();
    })
  }
  useEffect(()=>{  
    fetchTodos();
  }, [])

  return (
    <>

    <div className="border-b py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">Planit</h1>
        <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
      </div>
    </div>

    <SignedIn>
    <div className="w-[400px] mx-auto mt-12">
      <h1 className="text-xl font-semibold">Manage your daily todos <span className="text-purple-600">@{isSignedIn ? user.firstName : ""}</span></h1>
      <p className="text-lg text-gray-800 mt-2">Simplify your tasks with an intuitive and efficient Planit app.</p>
      <div className="mt-2">
        <input type="text" ref={taskInput} className="w-full p-3 rounded-md border focus:outline-none" placeholder="Add task i.e. Learn FrontEnd" />
        <button onClick={handleSubmit} className="p-3 rounded-md mt-4 bg-purple-300 text-purple-600 font-medium">{!formStatus ? "Create Task" : "Submitting..."}</button>
      </div> 

      <div className="mt-12 mb-6">
        { todos.length > 0 ? (todos.filter(todo=> (isSignedIn ? todo.createdBy == user.username : true)).map(todo=> (<TodoCard id={todo.id} handleDelete={handleDelete} title={todo.title} key={todo.id}/>)))
        : <p className="text-gray-500 text-center">No todos are added yet.</p>
        }
      </div>
    </div>
    </SignedIn>
    <SignedOut>
      <Intro/>
    </SignedOut>

    </>
  )
}

export default App;