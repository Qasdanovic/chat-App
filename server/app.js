const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/UserRouter')
const chatRouter = require('./routes/chatRouter')
const messageRouter = require('./routes/messagesRouter')
const cors = require('cors')
require('dotenv').config()

// const middle = require('./middlewares/authorisation')

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())


//routers
app.use('/users', userRouter)
app.use('/chats', chatRouter)
app.use('/message', messageRouter)

// app.get('/cookie', middle)


app.listen(process.env.PORT || 4000, () => {
    console.log('server started')
})



