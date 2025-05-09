import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const CreateProject = ({onUpdateList}) => {
    const [name, setName] = useState("");
    const [err, setErr] = useState("");
    const user = useSelector((store)=> store.user)
    const navigate = useNavigate();

    useEffect(()=>{
      if(!user){
        navigate("/login")
      }
    },[user, navigate]);

    const addProject = async ()=> {
       if(!name){
         return setErr("Please enter project name")
       }
       try {
         const res = await axios.post(BASE_URL + "/add/project",{
            name
         },{withCredentials: true})
         onUpdateList(res?.data)
         setName("")
         setErr("")
       } catch (error) {
         setErr(error?.response?.data?.message)
         setName("")
       }
    }

  return (
    <div className="w-full rounded-xl bg-violet-400 p-2 my-1 hover:bg-violet-500 md:flex md:gap-2"
    >
  <section className='flex justify-start items-center p-1 backdrop-blur-md bg-white/10 display:block'>Add New Project:</section>
  <input className='border flex items-center p-1 backdrop-blur-md bg-white/10'
    value={name}
    onChange={(e)=>setName(e.target.value)}
  />
  <button 
    className='border flex items-center p-1 px-3 backdrop-blur-md bg-white/10 hover:bg-violet-400'
    onClick={()=>addProject()}
  >Enter</button>
  <h4 className='text-lg'>{err}</h4>
</div>
  )
}

export default CreateProject
