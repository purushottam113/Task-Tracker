import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("Password@123");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async ()=> {
    if(!email || !password){
      return setErr("Please enter email and passowrd")
    }


    try {
      const res = await axios.post(BASE_URL + "/login",{
        email,
        password
      },{withCredentials: true})
      setErr("")
      dispatch(addUser(res?.data))
      navigate("/projects")
    } catch (error) {
      setErr(error?.response?.data?.message)
    }
  }

  return (
    <div className='flex flex-col items-center mt-15 gap-5 rounded-2xl w-fit shadow-xl shadow-purple-400 p-10'>
      <h1 className='text-xl font-bold text-purple-500'>Login</h1>
      <label className=''>
        <div className="">
          <span 
            className='text-xl'
          >Email:</span>
        </div>
        <input 
          className='p-1 rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
      </label>
      <label className=''>
        <div className="">
          <span 
            className='text-xl'
          >Password:</span>
        </div>
        <input 
          className='p-1 rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
      </label>
      <h6 
        className='text-red-500'
      >{err}</h6>
      <button
        className='border-1 rounded-sm w-full hover:bg-violet-500 bg-purple-400 p-2'
        onClick={handleLogin}
      >Login</button>
      <h6
        className='text-xs text-blue-500 cursor-pointer hover:text-blue-800'
        onClick={()=>navigate("/signup")}
      >
      New User? SignUp here...</h6>
    </div>
  )
}

export default Login
