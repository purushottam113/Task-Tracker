import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [email, setEmail] = useState("123@gmail.com");
  const [password, setPassword] = useState("Password@123");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async ()=> {
    if(!email || !password || !country || !name){
      return setErr("Please enter all fields")
    }

    try {
      const res = await axios.post(BASE_URL + "/signup",{
        email,
        password,
        name,
        country
      },{withCredentials: true})
      setErr("")
      setIsSignup(true)
      setTimeout(()=>{
        navigate("/login")
      },1000)
    } catch (error) {
      setErr(error?.response?.data?.message)
    }
  }

  return (
    <div className='flex flex-col items-center mt-15 gap-5 rounded-2xl w-fit shadow-xl shadow-purple-400 p-10'>
      <h1 className='text-xl font-bold text-purple-500'>Sign Up</h1>
      <label className=''>
        <div className="">
          <span 
            className='text-xl'
          >Name:</span>
        </div>
        <input 
          className='p-1 rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </label>
      <label className=''>
        <div className="">
          <span 
            className='text-xl'
          >Country:</span>
        </div>
        <input 
          className='p-1 rounded-sm border focus:border-purple-500 focus:outline-purple-500 md:w-72' 
          type="text" 
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
        />
      </label>
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
        onClick={handleSignup}
      >SignUp</button>
      {isSignup && <h5>User created redirect to login page</h5>}
    </div>
  )
}

export default SignUp;
