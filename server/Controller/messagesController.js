const Message = require('../models/MessageModel')


const messagesController = {
    sendMessage : async (req, res) => {
        const message = {
            "chatId": req.body.chatId ,
            "senderId": req.body.senderId,
            "message": req.body.message,
        }
        try {
            const newMessage = new Message(message)
            await newMessage.save()
            return res.status(200).json({ message : 'new message sent successfuly' })
        } catch (error) {
            return res.status(500).json({ error : error })
        }
    } ,

    getAllMessages : async (req, res) => {
        const allMessages = await Message.find()
        if (!allMessages) return ;

        return res.status(200).json({result : allMessages})
    }
}


module.exports = messagesController