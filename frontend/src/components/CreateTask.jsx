import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const CreateTask = () => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.state?.projectId;
    const projectName = location.state?.projectName;
    const user = useSelector((store)=> store.user)

    useEffect(()=>{
      if(!user){
        navigate("/login")
      }
    },[user, navigate]);

    const createTask = async ()=> {
       if(!title){
         return setErr("Please enter task title")
       }
       else if(!title){
         return setErr("Please enter task description")
       }

       try {
         const res = await axios.post(BASE_URL + "/create/task",{
            title,
            description,
            status,
            projectId
         },{withCredentials: true})
         setTitle("")
         setErr("")
         navigate("/tasks" ,{state: {projectId: projectId, projectName: projectName }})
       } catch (error) {
         setErr(error?.response?.data?.message)
         setTitle("")
       }
    }

  return (
    <div className='flex flex-col items-center mt-15 gap-5 rounded-2xl w-fit shadow-xl shadow-purple-400 p-10'>
      <h1 className='text-xl font-bold text-purple-500'>Create Task</h1>
      <label className='flex gap-2'>
        <div className="">
          <span 
            className='text-xl'
          >Project:</span>
        </div>
        <span 
          className='text-xl' 
        >{projectName}</span>
      </label>
      <label className=''>
        <div className="">
          <span 
            className='text-xl'
          >Title:</span>
        </div>
        <input 
          className='p-1 rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="text" 
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </label>
      <label className='w-full'>
        <div className="">
          <span 
            className='text-xl'
          >Description:</span>
        </div>
        <textarea 
          className='p-1 w-full rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="text" 
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
      </label>
      <label className='w-full'>
        <div className="">
          <span 
            className='text-xl'
          >status:</span>
        </div>
        <select className='p-1 w-full rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72'
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
        >
            <option value="Pending" className='hover:bg-purple-500'>Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed"> Completed</option>
        </select>
      </label>
      

      <h6 
        className='text-red-500'
      >{err}</h6>
      <button
        className='border-1 rounded-sm w-full hover:bg-violet-500 bg-purple-400 p-2'
        onClick={createTask}
      >Create Task</button>
      {isCreated && <h5>Task Created</h5>}
    </div>
  )
}

export default CreateTask
