const Sequelize = require('sequelize')

const keySession = 'Ilikebananasandoranges'

let dbConfiguration = {
    database: 'cainan_game',
    name: 'root',
    password: 'andre2004',
    host: 'localhost'
}

let options = {
    config: {
      user: 'root', 
      password: 'andre2004',
      database: 'sessionStore',
      host: 'localhost'
    }
}

if(process.env.NODE_ENV == 'production'){
    dbConfiguration.database = 'rebrjpazb26ovbkr'
    dbConfiguration.name = 'zfzncq4q77qiip3d'
    dbConfiguration.password = 'trfsj7mzt00ppfhv'
    dbConfiguration.host = 'z3iruaadbwo0iyfp.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'

    options.config.user = 'otykfxetqhsnrjgu'
    options.config.password = 'ayyxala6qntj1y64'
    options.config.database = 'pmufjf5ymt547v4j'
    options.config.host = 'l0ebsc9jituxzmts.cbetxkdyhwsb.us-east-1.rds.amazonaws.com'
}

const db = new Sequelize(dbConfiguration.database, dbConfiguration.name, dbConfiguration.password, {
    host: dbConfiguration.host,
    dialect: 'mysql'
})

async function connect(){
    try{
        await db.authenticate()
        console.log(`> Connected to database: ${dbConfiguration.database}`)
    }catch(err){
        console.log(`Error on connection: ${err}`)
    }
}

connect()

module.exports = {
    keySession,
    options,
    db
}
