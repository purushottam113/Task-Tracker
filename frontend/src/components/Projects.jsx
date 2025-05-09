import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import CreateProject from './CreateProject';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user)

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user, navigate]);

  try {
  const fetchProjects = async () => {
      const res = await axios.get(BASE_URL + "/projectlist",{withCredentials: true})
      setProjectList(res?.data)
    }
  
    useEffect(()=>{
      fetchProjects()
    },[])

  } catch (error) {
    console.log(error)
  }

  const removeProject = async (_id, index, event)=> {
    event.stopPropagation();
    try {
      const res = await axios.delete(BASE_URL + "/delete/project",
        {
          data: {_id},
          withCredentials: true,
        })
      setProjectList(prev=>{
         const newList = prev.filter((p)=>prev.indexOf(p) !== index);
         return newList;
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateProjectList = (newProject)=>{
    if(!Array.isArray(projectList)){
      setProjectList([])
    }
    setProjectList(prev=> [...prev, newProject]);
  }

  return (
    <div className='w-full mt-5'>
      <h3 className="text-center text-3xl font-semibold m-5">Projects</h3>
      <div className="">
        {(Array.isArray(projectList) && projectList.length > 0)?
        projectList.map((project, index)=>
                  <div className="flex w-full rounded-sm bg-violet-400 gap-2 p-2 my-1 hover:bg-violet-500"
                      key={index}
                      onClick={()=>navigate("/tasks" ,{state: {projectId: project._id, projectName: project.name }})}
                  >
                    <section className='border w-8 flex justify-center items-center p-1 backdrop-blur-md bg-white/10'>{index + 1}</section>
                    <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
                    <p>{project?.name}</p></section>
                    <button 
                      className='border flex items-center p-1 backdrop-blur-md bg-white/10'
                      onClick={(event)=>removeProject(project._id, index, event)}
                    ><i className="ri-delete-bin-line"></i></button>
                  </div>
        )
      :
      <h3>No Projects Found</h3>
      }
        <CreateProject onUpdateList={updateProjectList}/>
      </div>
    </div>
  )
}

export default Projects
    