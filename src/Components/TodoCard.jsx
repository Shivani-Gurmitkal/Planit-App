import React, { useState } from 'react'
import { FaTrash } from "react-icons/fa6";
import { GoCircle } from "react-icons/go";
import { GoCheckCircle } from "react-icons/go";
import Loader from '../Loader';

let NotDone = () => <GoCircle />;
let Done = () => <GoCheckCircle />;

function TodoCard({title,handleDelete,id}) {
  let [deleteStatus, setDeleteStatus] = useState(false);
  let [checkStatus, setCheckStatus] = useState (true);

  function handleDeleteClick(){
    setDeleteStatus(true);
    handleDelete(id);
  }

  function handleCheck(){
    setCheckStatus((prev)=>!prev);
  }
  
  return (
    <div>

      <div className="border shadow mt-5 rounded-md box-border p-3 flex justify-between items-center">
        <div className="flex gap-4 justify-center items-center">
          <button  onClick={handleCheck}>{checkStatus ? <NotDone /> : <Done />}</button>
          <h2 className={`text-lg ${!checkStatus ? 'line-through text-gray-500' : ""}`}>{title}</h2>
        </div>
        <button onClick={handleDeleteClick} className='hover:text-red-700'>{deleteStatus ? <Loader /> : <FaTrash />}</button>
      </div>

    </div>
  )
}

export default TodoCard