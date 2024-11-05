const Chat = require('../models/chatModel');

const chatController = {
    getChat: async (req, res) => {
        try {

            const allChat = await Chat.find();

            if (allChat.length === 0) {
                return res.status(404).json({ message: "No chats found for this user" });
            }

            res.status(200).json({ result: allChat });
        } catch (error) {
            console.error("Error fetching chats:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } ,

    updateChat : async (req, res) => {
        const id = req.params.id ;

        await Chat.findByIdAndUpdate(id, {
            lastMessage : req.body.lastMessage
        })

        res.json({message : 'updated success'})
    }
};

module.exports = chatController;
