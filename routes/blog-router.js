const blogRouter = require('express').Router()
const BlogController = require('../controller/blog-controller')
const { authorization, authentification } = require('../middleware/Auth')

blogRouter.get('/', BlogController.list)
blogRouter.get('/:id', BlogController.detail)
blogRouter.use(authentification)
blogRouter.use(authorization)
blogRouter.post('/', BlogController.create)
blogRouter.put('/:id', BlogController.update)
blogRouter.delete('/:id', BlogController.delete)

module.exports = blogRouter
