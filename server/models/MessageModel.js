const mongoose = require('../config/connect')

const messageSchema = new mongoose.Schema({
        "chatId": String ,
        "senderId": String,
        "message": String,
    }, {
    timestamps : true
})

const Message = mongoose.model('messages', messageSchema) ;

module.exports = Message