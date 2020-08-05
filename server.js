const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const routes = require('./src/routes')



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

// Routes
app.use('/', routes)

const PORT = 2000
app.listen(PORT, () => {
    console.log(`The server is running at port ${PORT}`)
})