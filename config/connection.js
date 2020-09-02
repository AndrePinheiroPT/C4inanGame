const Sequelize = require('sequelize')
const db = new Sequelize('pq228fa6c5t5cl7x', 'cienr9qysd1u3a91', 'q0kltuknyuynua1k', {
    host: 'z8dl7f9kwf2g82re.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
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