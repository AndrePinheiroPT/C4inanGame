const Sequelize = require('sequelize')
const db = new Sequelize('cainan_game', 'root', 'andre2004', {
    host: 'localhost',
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