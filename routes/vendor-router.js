const vendorRouter = require('express').Router()
const VendorController = require('../controller/vendor-controller')
const { authorization, authentification } = require('../middleware/Auth')

vendorRouter.get('/', VendorController.list)
vendorRouter.get('/:id', VendorController.detail)
vendorRouter.use(authentification)
vendorRouter.use(authorization)
vendorRouter.post('/', VendorController.create)
vendorRouter.put('/:id', VendorController.update)
vendorRouter.delete('/:id', VendorController.delete)

module.exports = vendorRouter
