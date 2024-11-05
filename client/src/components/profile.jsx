import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [profilePicture, setProfilePicture] = useState('')
    const [newProfilePicture, setNewProfilePicture] = useState('')
    const [user, setUser] = useState('')
    const [id, setId] = useState('')
    const [fileName, setFileName] = useState('')

    const redirect = useNavigate(null)

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (!userId){
            return redirect('/')
        }
        const parsedId = userId.startsWith('j:') ? userId.slice(3, userId.length - 1) : userId;
        setId(parsedId);
    }, []);

    useEffect(() => {
        if(id){
            try {
                axios.get(`http://localhost:4000/users/getUser/${id}`)
                    .then((res) =>{
                        setUser(res.data)
                        setUsername(res.data.username)
                        setEmail(res.data.email)
                        setProfilePicture(res.data.profilePicture)
                    })
            } catch (error) {
                console.log(error);
            }
        }
    },[id])

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setFileName(file.name)
    };

    useEffect(() => {
        if(profilePicture){
            const filePath = `${profilePicture}`;
            const fileName = filePath.split("\\").pop();
            setProfilePicture(`/images/${fileName}`)
            console.log(profilePicture)
        }
      }, [user])

      const handelSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        try {
            await axios.put(`http://localhost:4000/users/updateUser/${id}`, {
                username: username,
                email: email,
                profilePicture: fileName,
            });
            redirect('/accueil'); // Redirect after successful update
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    


    return ( 
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h2>
            {profilePicture && (
                <div className="flex justify-center mb-4">
                    <img 
                        src={newProfilePicture || profilePicture} 
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover cursor-pointer border-2 border-gray-300"
                        onClick={() => document.getElementById('profilePicInput').click()} // Trigger file input on click
                    />
                    <input
                        type="file"
                        id="profilePicInput"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                    />
                </div>
            )}
            <form onSubmit={handelSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>
                
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Update
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;