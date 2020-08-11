const express = require('express')
const routes = express.Router()
const passport = require('passport')
const UserController = require('./controllers/UserController')

const userController = new UserController()

function checkLogged(req, res, next){
    if(req.user){
        next()
    }else{
        req.flash('error_msg', 'Faça o seu login!')
        res.redirect('/login')
    }
}

routes.get('/game', checkLogged, (req, res) => {
    res.render('game', { user: req.user })
})

routes.get('/registry', (req, res) => {
    res.render('registry')
})

routes.get('/login', (req, res) => {
    res.render('login')
})

routes.get('/ranking', userController.index)
routes.post('/registryUser', userController.store)
routes.post('/login', passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/login',
    failureFlash: true
}))


module.exports = routes