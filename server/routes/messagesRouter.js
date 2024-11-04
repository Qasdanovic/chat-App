const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(cors({
      origin: 'http://localhost:3000',
      credentials: true 
  }));


router.use(express.json())

const messageController = require('../Controller/messagesController')
const loginAuth = require('../middlewares/authorisation');

router.route('/sendMessage')
      .post(messageController.sendMessage)

router.route('/getAllMessages')
      .get(messageController.getAllMessages)


// router.route('/')
//       .post(userController.loggingIn)


module.exports = router