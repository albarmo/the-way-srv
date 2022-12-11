const router = require('express').Router()
const userRouter = require('./user-router')
const taskRouter = require('./task-router')
const projectRouter = require('./project-router')
const blogRouter = require('./blog-router')
const vendorRouter = require('./vendor-router')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/task', taskRouter)
router.use('/blog', blogRouter)
router.use('/vendor', vendorRouter)

module.exports = router
