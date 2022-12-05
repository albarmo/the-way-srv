const taskRouter = require('express').Router()
const TaskController = require('../controller/task-controller')
const { authorization, authentification } = require('../middleware/Auth')

taskRouter.get('/', TaskController.list)
taskRouter.get('/:id', TaskController.detail)
taskRouter.use(authentification)
taskRouter.use(authorization)
taskRouter.post('/', TaskController.create)
taskRouter.put('/:id', TaskController.update)
taskRouter.delete('/:id', TaskController.delete)

module.exports = taskRouter
