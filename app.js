require('dotenv').config()
const express = require('express')
const App = express()
const cors = require('cors')
const port = process.env.PORT || 3001
const logger = require('morgan')
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

App.use(cors())
App.use(logger('dev'))

App.use(express.urlencoded({ extended: 'false' }))
App.use(express.json())

App.use(routes)
App.use(errorHandler)

App.get('/', (req, res) => {
  return res.status(200).json({ ServerStatus: `Running` })
})

// Define the static file path
App.use(express.static(__dirname + '/public/uploads'))
App.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

App.listen(port, () => {
  console.log(`This Server running on port ${port}`)
})

module.exports = App
