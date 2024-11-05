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
        required : true ,
        default : 'https://media.istockphoto.com/id/1409715003/vector/man-avatar-placeholder-icon-design.jpg?s=612x612&w=0&k=20&c=Lk44BhYJIOpbSCYkymK0GGuziooahH0Mo_2Gzpzuw2Q='
    } ,
} ,{ timestamps : true })

const User = mongoose.model('users', userSchema) ;

module.exports = User