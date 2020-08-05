const Sequelize = require('sequelize')
const db = require('../config/connection')

const users = db.define('users', {
    name: {
        type: Sequelize.STRING(100)
    },
    password: {
        type: Sequelize.STRING
    },
    hightscore: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    coins: {
        type: Sequelize.INTEGER,
        defaultValue: 100
    }
})

users.sync()

module.exports = users