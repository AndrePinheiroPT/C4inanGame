const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const session = require('express-session')
const MySQLStore = require('connect-mysql')(session)
const passportSocketIo = require('passport.socketio')

const game = require('./src/game')
const { keySession, options } = require('./config/connection')

const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const path = require('path')
const routes = require('./src/routes')
const passport = require('passport')
const initializePassport = require('./config/passport-config')
initializePassport(passport)

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// Body-Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Session
app.use(session({
    key: 'express.sid',
    secret: keySession,
    resave: true,
    saveUninitialized: true,
    store: new MySQLStore(options)
}))

io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    key: 'express.sid', 
    secret: keySession,    
    store: new MySQLStore(options), 
}));

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Flash
app.use(flash())

// Middleware

app.use((req, res, next) => {
    res.locals.error = req.flash('error')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')

    next()
})


// Sockets
game(io)

// Routes
app.use('/', routes)

const PORT = process.env.PORT || 8089
http.listen(PORT, () => {
    console.log(`> Server is running at port ${PORT}`)
})