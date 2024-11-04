import MessagesBox from "../message/messagesBox";
import Person from "../personnes/Persons";
import '../../main.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

function Main() {

    const [id, setId] = useState('');
    const [users, setUsers] = useState([]);
    const [allChats, setAllChats] = useState([])
    const [userActuel, setUserActuel] = useState('')
    const [currentChat, setCurrentChat] = useState({_id : 0})

    const redirect = useNavigate()

    /**
     * @desc this useEffect to get the user id from cookies
     */
    useEffect(() => {
        const userId = Cookies.get('userId');
        if (!userId){
            return redirect('/')
        }
        const parsedId = userId.startsWith('j:') ? userId.slice(3, userId.length - 1) : userId;
        setId(parsedId);
    }, []);

    /**
     * @desc this useEffect to get all users to display for new chat
     */
    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:4000/users/getUsers/${id}`)
            .then((response) => setUsers(response.data.users))
            .catch(error => console.log("Error fetching users:", error));
    }, [id]);

    /**
     * @desc this useEffect to get all chats
     */

    useEffect(() => {
        axios.get(`http://localhost:4000/chats/getChat`)
        .then((chats) => {
            setAllChats(chats.data.result)
        })
        
    }, [])


    if(id){
        try {
            axios.get(`http://localhost:4000/users/getUser/${id}`)
                .then((res) => setUserActuel(res.data))
        } catch (error) {
            console.log(error);
    }
}


    const getChat = (idFriend) => {
        console.log(idFriend)
        if (!allChats) return ;
        const chatWanted = allChats.filter(chat => {
            return chat.participants[0] === idFriend && chat.participants[1] === id || chat.participants[1] === idFriend && chat.participants[0] === id
        })
        console.log(chatWanted)
        setCurrentChat(chatWanted[0])
    }

    const disconnect = () => {
        Cookies.remove('token')
        Cookies.remove('userId')
        redirect('/')
    }


    return (
        <div>
            <div className="flex justify-between items-center mb-3 bg-white rounded-md shadow-md p-4">
                <p className="text-left font-bold">Hello {userActuel ?userActuel.username : ''}</p>
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">Update Profile</button>
                    <button className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600" onClick={disconnect}>Disconnect</button>
                </div>
            </div>

            <div className="main">
                <div className="friends">
                    {
                        users.length > 0 ? users.map(user => (
                            <div className="person" onClick={() => getChat(user._id)} key={user._id}>
                                <Person userId={user._id} profile={user.profilePicture} name={user.username} />
                            </div>
                        ))
                        :
                        'Loading users...'
                    }
                </div>
                <div className="messagesBox">
                    <MessagesBox idSender={id} currentChat={currentChat} idChat={currentChat._id} />
                </div>
            </div>
        </div>
    );
}

export default Main;
