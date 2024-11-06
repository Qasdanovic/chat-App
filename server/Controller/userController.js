const User = require('../models/UsersModel');
const Chat = require('../models/chatModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    addNewUser: async (req, res) => {
        try {

            const { username, password, email, profilePicture } = req.body;

            const checkEmail = await User.findOne({ email: email });
            if(checkEmail) {
                return res.status(409).json({ message: "Email already exists" });
            }
            
            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = new User({
                email: email,
                password: hashedPass,
                username: username,
                profilePicture: profilePicture
            });

            await newUser.save();
            console.log('New user added');

            const existingUsers = await User.find({ _id: { $ne: newUser._id } });

            const chatPromises = existingUsers.map(async (user) => {
                const existingChat = await Chat.findOne({ participants: { $all: [newUser._id, user._id] } });
                if (!existingChat) {
                    const chat = new Chat({
                        participants: [newUser._id, user._id],
                        chatName: `Chat between ${newUser.username} and ${user.username}`,
                        lastMessage: 'No messages yet',
                    });
                    return chat.save();
                }
            });

            await Promise.all(chatPromises);

            res.status(201).json({ message: "User registered and chats created" });
        } catch (error) {
            console.error("Error adding new user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    loggingIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find the user by email
            const findUser = await User.findOne({ email: email });
            if (!findUser) {
                return res.status(401).json({ message: "User not found" });
            }

            // Verify password
            const match = await bcrypt.compare(String(password), String(findUser.password));
            if (!match) {
                return res.status(401).json({ message: "Incorrect password" });
            }

            // Generate JWT token
            const token = jwt.sign(
                { username: findUser.username, email: email },
                process.env.SECRET_KEY,
                { expiresIn: '1h' }
            );

            // Set cookies
            res.cookie('token', token, {
                maxAge: 3600000,
                httpOnly: true
            });

            res.cookie('userId', findUser._id.toString(), {
                maxAge: 3600000,
                httpOnly: false,
                sameSite: 'Lax',
                secure: process.env.NODE_ENV === 'production'
            });

            res.json({ user: findUser, token: token });
        } catch (error) {
            console.error("Error logging in:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getAllUser: async (req, res) => {
        try {
            const users = await User.find({ _id: { $ne: req.params.id } });
            if (!users || users.length === 0) {
                return res.json({ message: 'No users found!' });
            }
            return res.json({ users: users });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getUser : async (req, res) => {
        const userWanted = await User.findOne({_id : req.params.id})
        if (!userWanted){
            return res.json({message : 'theres no user found'})
        }
        res.json(userWanted)
    } ,

    updateUser : async (req, res) => {
        const {username, email, profilePicture} = req.body ;
        const id = req.params.id
        const data = {
            username : username ,
            email : email ,
            profilePicture : profilePicture ,
        }

        await User.findByIdAndUpdate(id, data)
        return res.json({message : 'updated success'})
    } ,

    checkUser : (req, res) => {
        const {email} = req.body;
        User.findOne({email : email})
        .then(user => {
            if(user){
                return res.status(200).json({message : 'user exist'})
            } else {
                return res.status(404).json({message : 'user not exist'})
            }
        })
    }
};

module.exports = userController;
