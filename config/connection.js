const Sequelize = require('sequelize')
const db = new Sequelize('rebrjpazb26ovbkr', 'zfzncq4q77qiip3d', 'u5r2ra00u7um4ihw', {
    host: 'z3iruaadbwo0iyfp.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
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