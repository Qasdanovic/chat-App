import { useEffect, useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

function UserForm() {

    const navigate = useNavigate()
    const [error, setError] = useState({ username : '', email : '' ,password : '', profilePicture : '' })
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    useEffect(() => {
        setError({
            username: !username ? 'username is required' : '',
            email: !email ? 'email is required' : '',
            password: !password ? 'password is required' : '',
            profilePicture: !profilePicture ? 'profilePicture is required' : ''
        });
    }, [username, email, password, profilePicture]);
    

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!username || !email || !password || !profilePicture){
            toast.error('All fields are required')
            return;
        }
        else{
            try{
                await axios.post('http://localhost:4000/users/register', {
                    email : email ,
                    username : username ,
                    password : password ,
                    profilePicture : profilePicture
                })
                toast.success('user created successfully')
                navigate('/')
            }catch(err){
                toast.error('email already existe !')
            }

            // .then(() => navigate('/register'))
            // .catch(err => console.log('cannot send data',err))
        }
        
    }
    
    return ( 
        <form onSubmit={submitHandler} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-5">
            <h2 className="text-2xl font-bold text-center">Register New User</h2>
    
            <label className="block">
            <span className="text-gray-700">Username</span>
            <input 
                type="text" 
                onChange={(e) => setUsername(e.target.value)}
                name="username" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <span style={{'color' : 'red'}}>{error.username}</span>
            </label>
    
            <label className="block">
            <span className="text-gray-700">Email</span>
            <input 
                type="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <span style={{'color' : 'red'}}>{error.email}</span>
            </label>
    
            <label className="block">
            <span className="text-gray-700">Password</span>
            <input 
                type="password" 
                name="password" 
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <span style={{'color' : 'red'}}>{error.password}</span>
            </label>
    
            <label className="block">
            <span className="text-gray-700">Profile Picture URL</span>
            <input 
                type="file" 
                name="profilePicture" 
                onChange={(e) => setProfilePicture(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
            <span style={{'color' : 'red'}}>{error.profilePicture}</span>
            </label>
    
            <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
            Register
            </button>
            <b className="flex">already have in account ? <a href="/" className="text-blue-700">log-in now</a></b>
      </form>
    );
}

export default UserForm;