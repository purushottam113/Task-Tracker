import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import CreateProject from './CreateProject';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);

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

  const removeProject = async (_id, index)=> {
    try {
      const res = await axios.post(BASE_URL + "/delete/project",
        {
          _id
        },
        {withCredentials: true}
      )
      setProjectList(prev=>{
         const newList = prev.filter((p)=>prev.indexOf(p) !== index);
         return newList;
      })
    } catch (error) {
      console.log(error)
    }
  }

  const updateProjectList = (newProject)=>{
    setProjectList(prev=> [...prev, newProject]);
  }

  if(projectList.length >= 0) <h3>Loading</h3>

  return (
    <div className='w-full mt-5'>
      <h3 className="text-center text-3xl font-semibold m-5">Projects</h3>
      <div className="">
        {projectList.map((project, index)=>
                  <div className="flex w-full bg-violet-400 gap-2 p-2 my-1 hover:bg-violet-500"
                      key={index}
                  >
                    <section className='border w-8 flex justify-center items-center p-1 backdrop-blur-md bg-white/10'>{index + 1}</section>
                    <section className='grow-1 border flex items-center p-1 backdrop-blur-md bg-white/10'>
                    <p>{project?.name}</p></section>
                    <button 
                      className='border flex items-center p-1 backdrop-blur-md bg-white/10'
                      onClick={()=>removeProject(project._id, index)}
                    ><i className="ri-delete-bin-line"></i></button>
                  </div>
        )}
        <CreateProject onUpdateList={updateProjectList}/>
      </div>
    </div>
  )
}

export default Projects
    