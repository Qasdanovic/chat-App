const express = require('express')
const router = express.Router()
const cors = require('cors')

router.use(cors({
      origin: 'http://localhost:3000',
      credentials: true 
  }));
router.use(express.json())

const userController = require('../Controller/userController')
const loginAuth = require('../middlewares/authorisation') ;
const upload = require('../middlewares/multer')

router.route('/register')
      .post(userController.addNewUser)

router.route('/')
      .post(userController.loggingIn)

router.route('/getUsers/:id')
      .get(userController.getAllUser)

router.route('/getUser/:id')
      .get(userController.getUser)



module.exports = router