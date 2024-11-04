const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(cors({
      origin: 'http://localhost:3000',
      credentials: true 
  }));

router.use(express.json())

const chatController = require('../Controller/chatController')
// const loginAuth = require('../middlewares/authorisation');



// router.route('/')
//       .post(userController.loggingIn)

router.route('/getChat')
      .get(chatController.getChat)


module.exports = router