import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task
  const projectName = location.state?.projectName
  const [status, setStatus] = useState(task?.status || "");
  const [message, setMessage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const user = useSelector((store)=> store.user)

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user, navigate]);

  const removeTask = async (taskId)=> {
    try {
      const res = await axios.delete(BASE_URL + "/delete/task",
        {
          data: {taskId},
          withCredentials: true
        }
      )
      createMessage("Task Removed")
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (taskId)=> {
    try {
      const res = await axios.put(BASE_URL + "/update/task",
        {
          status,
          taskId
        },
        {withCredentials: true}
      )
      createMessage("Changes Saved")
    } catch (error) {
      console.log(error)
    }
  }

  const createMessage = (msg)=>{
    setMessage(msg);
    setTimeout(()=>{
      setMessage("")
      navigate("/tasks" ,{state: {projectId: task?.project, projectName: projectName }})
    },1500)
  }

  const dateFormat= (taskDate)=>{
    const date = new Date(taskDate);

    const formatted = date.toLocaleString('en-GB',{
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    })

    return formatted;
  }

  useEffect(()=>{
    setCompletedAt(dateFormat(task?.completedAt))
    setCreatedAt(dateFormat(task?.createdAt))
  },[task])

  return (
  <div className="flex flex-col flex-wrap w-full rounded-sm bg-violet-400 gap-2 p-2 my-1 hover:bg-violet-500 mt-5">
    <h3 className='text-center text-2xl font-medium'>Task Details</h3>
    <label>
      <span>Project:</span>
      <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
      <p>{projectName}</p></section>
    </label>
    <label>
      <span>Task:</span>
      <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
      <p>{task?.title}</p></section>
    </label>
    <label>
      <span>Description:</span>
      <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
      <p>{task?.description}</p></section>
    </label>
    <label>
      <span>Created At:</span>
      <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
      <p>{createdAt}</p></section>
    </label>
    {task?.completedAt && 
      <label>
        <span>Completed At:</span>
        <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
        <p>{completedAt}</p></section>
      </label>
    }
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
    <div className="flex justify-between">
        <button 
        className='border w-auto flex items-center p-1 backdrop-blur-md bg-white/10'
        onClick={()=>updateTask(task._id)}
        >Save Changes</button>
        <button 
        className='border w-auto flex items-center p-1 backdrop-blur-md bg-white/10'
        onClick={()=>removeTask(task._id)}
        ><i className="ri-delete-bin-line text-2xl"></i></button>
    </div>
    <h6 className='text-center text-blue-800'>{message}</h6>
</div>
  )
}

export default TaskDetails
