const express = require('express')
const userRouter = express.Router()
const {addUser, login} = require('../controllers/userController.js')

userRouter.post('/', addUser)
userRouter.post('/login', login)

module.exports = userRouter;