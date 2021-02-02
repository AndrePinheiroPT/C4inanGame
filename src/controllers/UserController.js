const users = require('../../models/users')
const bcrypt = require('bcryptjs')

class UserController{
    async store(req, res){
        const { name, password, password_confirm } = req.body

        let error = 0
        const usersList = await users.findAll({raw: true})

        if(password != password_confirm){
            error = 'As senhas não coincidem!'
        }
        if(password === null || password === undefined || password === '' || password.length < 6){
            error = 'A sua senha é invalida!'
        }
        if(name.trim() === null || name.trim() === undefined || name.trim() === '' || name.trim().length > 20){
            error = 'O seu nome é invalido!'
        }
        for(let i = 0; i < usersList.length; i++){
            if(usersList[i].name == name.trim()){
                error = 'Esse estelar já existe!'
            }
        }

        if(error == 0){
            try{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        users.create({
                            name: name.trim(),
                            password: hash
                        })

                        res.redirect('/login')
                    })
                })
            }catch(err){
                console.log(`> Hash error: ${err}`)
            }
        }else{
            res.render('registry', {error})
        }
    }

    async index(req, res){
        const usersList = await users.findAll({raw: true})

        const redList = []
        const purpleList = []
        const blueList = []
        const bronzeList = []
        const blackList = []
        
        usersList.sort((a, b) => parseFloat(b.hightscore) - parseFloat(a.hightscore))

        usersList.forEach(user => {
            if(user.hightscore < 80){
                blackList.push(user)
            }else if(user.hightscore >= 80 && user.hightscore < 180){
                bronzeList.push(user)
            }else if(user.hightscore >= 180 && user.hightscore < 380){
                blueList.push(user)
            }else if(user.hightscore >= 380 && user.hightscore < 600){
                purpleList.push(user)
            }else if(user.hightscore >= 600){
                redList.push(user)
            }
        });

        res.render('ranking', {
            blackList,
            blueList,
            bronzeList,
            purpleList,
            redList
        })
    }
}

module.exports = UserController