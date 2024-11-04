const mongoose = require('../config/connect')

const chatSchema = new mongoose.Schema({
    "participants": Array,
    "chatName": String,
    "lastMessage": String,
    }, {
    timestamps : true
})

const Chat = mongoose.model('Chat', chatSchema) ;

module.exports = Chat