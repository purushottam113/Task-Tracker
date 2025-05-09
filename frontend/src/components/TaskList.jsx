import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useLocation, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.state?.projectId
    const projectName = location.state?.projectName
    const user = useSelector((store)=> store.user)

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user, navigate]);

    try {
    const fetchTasks = async () => {
        const res = await axios.post(BASE_URL + "/task/list",{
            projectId
        },{withCredentials: true})
        setTasks(res?.data)
      }
    
      useEffect(()=>{
        fetchTasks()
      },[])
  
    } catch (error) {
      console.log(error)
    }
  
    const removeTask = async (taskId, index, event)=> {
      event.stopPropagation();
      try {
        const res = await axios.delete(BASE_URL + "/delete/task",
          {
            data: {taskId},
            withCredentials: true
          }
        )
        setTasks(prev=>{
           const newList = prev.filter((p)=>prev.indexOf(p) !== index);
           return newList;
        })
      } catch (error) {
        console.log(error)
      }
    }
  
  return (
    <div className='w-full mt-5'>
      <h3 className="text-center text-3xl font-semibold m-5">Project:  {projectName}</h3>
      <div className="flex justify-around flex-wrap">
        <h3 className="text-xl font-semibold text-violet-500">Tasks</h3>
        <button 
          className="rounded-sm bg-violet-400 m-1 p-1 px-2 hover:bg-violet-800"
          onClick={()=>navigate("/task/create", {state: {projectId: projectId, projectName: projectName }})}
          ><i className="ri-add-box-fill"></i> Create New Task</button>
      </div>

      <div className="">
        {(Array.isArray(tasks) && tasks.length > 0)? 
        tasks.map((task, index)=>
                  <div className="flex flex-col flex-wrap w-full rounded-sm bg-violet-400 gap-2 p-2 my-1 hover:bg-violet-500"
                      key={index}
                      onClick={()=>navigate("/task/details",{state:{task: task, projectName: projectName}})}
                  >
                    <div className="flex gap-1">
                      <section className='border w-8 flex justify-center items-center p-1 backdrop-blur-md bg-white/10'>{index + 1}</section>
                      <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
                      <p>{task?.title}</p></section>
                    </div>
                    <div className="flex gap-2">
                        <section className='grow-1 border flex gap-1 items-center p-1 backdrop-blur-md bg-white/10'> Status: 
                            <p>{" "+ task?.status}</p>
                        </section>
                        <button 
                        className='border flex items-center p-1 backdrop-blur-md bg-white/10'
                        onClick={(event)=>removeTask(task._id, index, event)}
                        ><i className="ri-delete-bin-line"></i></button>
                    </div>
                  </div>
            )
        : <h3 className='text-center'>No Task Found</h3>
        }
      </div>
    </div>
  )
}

export default TaskList
