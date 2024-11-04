const mongoose = require('../config/connect')

const userSchema = mongoose.Schema({
    username : {
        type : String ,
        required : true
    } ,
    email : {
        type : String ,
        required : true
    } ,
    password : {
        type : String ,
        required : true
    } ,
    profilePicture : {
        type : String ,
        required : true
    } ,
} ,{ timestamps : true })

const User = mongoose.model('users', userSchema) ;

module.exports = User