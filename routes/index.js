const router = require('express').Router()
const userRouter = require('./user-router')
const taskRouter = require('./task-router')
const projectRouter = require('./project-router')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/task', taskRouter)

module.exports = router
