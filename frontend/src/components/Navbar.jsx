import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const user = useSelector((store)=> store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleLogout = async ()=>{
      try {
        await axios.post(BASE_URL + "/logout",{},{ withCredentials: true })
        dispatch(removeUser())
        return navigate("/login")
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className="flex justify-around items-center bg-purple-600 h-14">
        <h1 
          className="text-xl font-bold hover:text-white cursor-pointer"
          onClick={()=>{navigate("/projects")}}
        ><i className="ri-task-fill"></i>Task-Tracker</h1>
        <button 
          className="hover:text-white"
          onClick={()=>{navigate("/projects")}}
        >Projects</button>
        {!user?
          <button 
          className="hover:text-white"
          onClick={()=>{navigate("/login")}}
          ><i className="ri-login-box-line"></i>Login</button>
          :
          <button 
          className="hover:text-red-300"
          onClick={handleLogout}
          ><i className="ri-logout-box-line"></i>Logout</button>
        }
    </div>
  )
}

export default Navbar
