import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router';

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
          className=""
          onClick={()=>{navigate("/")}}
        >Task-Tracker</h1>
        <button 
          className=""
          onClick={()=>{navigate("/projects")}}
        >Projects</button>
        {!user?
          <button 
          className=""
          onClick={()=>{navigate("/login")}}
          >Login</button>
          :
          <button 
          className=""
          onClick={handleLogout}
          >Logout</button>
        }
    </div>
  )
}

export default Navbar
