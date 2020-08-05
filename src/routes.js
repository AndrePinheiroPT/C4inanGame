const express = require('express')
const routes = express.Router()
const UserController = require('./controllers/UserController')

const userController = new UserController()


routes.get('/registry', (req, res) => {
    res.render('registry')
})

routes.get('/login', (req, res) => {
    res.render('login')
})

routes.get('/ranking', userController.index)
routes.post('/registryUser', userController.store)


module.exports = routes