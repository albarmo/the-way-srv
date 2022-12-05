const projectRouter = require('express').Router()
const ProjectController = require('../controller/project-controller')
const { authorization, authentification } = require('../middleware/Auth')

projectRouter.get('/', ProjectController.list)
projectRouter.get('/:id', ProjectController.detail)
projectRouter.use(authentification)
projectRouter.post('/:id/join', ProjectController.joinProject)
projectRouter.delete('/:id/leave', ProjectController.leaveProject)
projectRouter.use(authorization)
projectRouter.get('/all/my', ProjectController.myProject)
projectRouter.post('/', ProjectController.create)
projectRouter.put('/:id', ProjectController.update)
projectRouter.delete('/:id', ProjectController.delete)

projectRouter.get('/:id/member', ProjectController.listMember)
module.exports = projectRouter
