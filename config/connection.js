const Sequelize = require('sequelize')
const db = new Sequelize('database_name', 'name', 'password', {
    host: 'host',
    dialect: 'mysql'
})

async function connect(){
    try{
        await db.authenticate()
        console.log('> Connected to database: cainan_game')
    }catch(err){
        console.log(`Error on connection: ${err}`)
    }
}
connect()

module.exports = db
