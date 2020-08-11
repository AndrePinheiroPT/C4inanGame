const localStrategy = require('passport-local').Strategy
const users = require('../models/users')
const bcrypt = require('bcryptjs')


function initialize(passport){
    async function authenticateUser(name, password, done){
        const user = await users.findOne({
            where: {
                name: name
            },
            raw: true
        })

        if(user != null){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'A senha está incorreta!'})
                }
            })
        }else{
            return done(null, false, {message: 'O estelar não existe!'})
        }

    }

    passport.use(new localStrategy({
        usernameField: 'name',
        passwordField: 'password'
    }, authenticateUser))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        async function findUser(){
            try{
                const user = await users.findOne({
                    where: {
                        id: id
                    },
                    raw: true
                })
    
                done(null, user)
            }catch(err){
                done(err)
            }
        }
        findUser()
    })
}

module.exports = initialize