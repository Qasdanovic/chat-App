import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LoginForm() {

  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  
  const id = Cookies.get('userId')

  useEffect(() => {
    if (id) {
      console.log(id)
      navigate('/accueil')
    }
  }, [])
  const handelSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password){
      e.preventDefault() ;
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/users/", {
        email : email ,
        password : password
      }, { withCredentials: true })
      console.log(response.data)
    }
    catch(error){
      if (error.response){
        setError('email or password not valid !')
        return;
      }
    }


    navigate('/accueil')
  }

  return (
    <form onSubmit={handelSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <label className="block">
        <span className="text-gray-700">Email</span>
        <input 
          type="email" 
          name="email"
          onChange={(e) => setEmail(e.target.value) }
          required 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </label>

      <label className="block">
        <span className="text-gray-700">Password</span>
        <input 
          type="password" 
          name="password" 
          onChange={(e) => setPassword(e.target.value) }
          required 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </label>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Login
      </button>
      <b className='flex'>do not have account ? <a className='text-blue-700' href="/register">register now</a></b>
      <b className='text-red-700'>{error}</b>
    </form>
  );
}

export default LoginForm;
