const userRouter = require('express').Router()
const UserController = require('../controller/user-controller')
const { authorization, authentification } = require('../middleware/Auth')

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.use(authentification)
userRouter.get('/me', UserController.currentUser)
userRouter.put('/:id', UserController.updateUser)
userRouter.use(authorization)
userRouter.get('/', UserController.list)
userRouter.delete('/:id', UserController.deleteUser)

module.exports = userRouter
