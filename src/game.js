const users = require('../models/users')

let userState
function gameMiddleware(req, res, next){
    if(req.user != undefined){
        async function setUser(){
            userState = await users.findOne({
                where: {
                    name: req.user.name
                },
                raw: true
            })
        }
        setUser()
    }

    next()
}

const game = io => {
    io.on('connection', socket => {
        const playerId = socket.id
        console.log(`> Socket ${playerId} connected`)
    
        let score = 0
        let imageSrc = 'img/Happy.png'
        let difficult = 'easy'
        let intervalId = 0
        let loading = 0
    
        let observers = []
    
        function createObserver(func) {
            observers.push(func)
            console.log('Observer created!')
        }
    
        function notifyAll(command){
            observers.forEach(observer => observer(command))
            console.log(`Notify ${observers.length} observers`)
        }
    
        const elements = {
            angry: {
                type: 'angry',
                isGold: 0
            },
            happy: {
                type: 'happy',
                isGold: 0
            },
            sad: {
                type: 'sad',
                isGold: 0
            }
        }
    
        const { angry, happy, sad } = elements
    
        class Game{
    
            startGame(){
                loading = 1
                score = 0
                difficult = 'easy'
                socket.emit('startGame', { score, imageSrc })
            }
    
            async updateCoins({ isGold }){
                if(isGold){
                    await users.update({
                        coins: userState.coins + 1
                    }, {
                        where: {
                            name: userState.name
                        }
                    })
                    userState = await users.findOne({
                        where: {
                            name: userState.name
                        },
                        raw: true
                    })
    
                    socket.emit('updateCoins', { coins: userState.coins })
                }
            }
        
            updateScore({ isGold }){
                score++
    
                socket.emit('updateScore', { score, isGold })
            }
    
            async updateHightscore(command){
                if(score > userState.hightscore){
                    await users.update({
                        hightscore: score
                    }, {
                        where: {
                            name: userState.name
                        }
                    })
                    userState = await users.findOne({
                        where: {
                            name: userState.name
                        },
                        raw: true
                    })
                    socket.emit('updateHightscore', { hightscore: userState.hightscore })
                }
            }
    
            setDifficult(command){
                switch(score){
                    case 80:
                        difficult = 'medium'
                        break
                    case 180:
                        difficult = 'hard'
                        break
                    case 380:
                        difficult = 'very hard'
                        break
                    case 600:
                        difficult = 'impossible'
                        break
                }
            }
    
            updateImages(command){
                const imgsList = [
                    'img/Sad.png',
                    'img/Happy.png',
                    'img/Angry.png'
                ]
    
                let randomIndex = Math.floor(Math.random() * 3)
                while(imageSrc.indexOf(`${imgsList[randomIndex]}`) != -1){
                    randomIndex = Math.floor(Math.random() * 3)
                }
                imageSrc = imgsList[randomIndex]
                socket.emit('updateImages', { imageSrc })
            }
    
            levels(command){
                intervalId != 0 ? clearInterval(intervalId) : null
                switch(difficult){
                    case 'easy':
                        intervalId = setInterval(game.updateImages, 10000)
                        break
                    case 'medium':
                        intervalId = setInterval(game.updateImages, 5000)
                        break
                    case 'hard': 
                        intervalId = setInterval(game.updateImages, 3000)
                        break
                    case 'very hard':
                        intervalId = setInterval(game.updateImages, 1000)
                        break
                    case 'impossible':
                        intervalId = setInterval(game.updateImages, 700)
                        break
                }
            }
    
            reloadButtons({ isGold, type }){
                if(isGold){
                    elements[type].isGold = 0
                    socket.emit('setNormal', { type })
                }
    
                // goldProbability = 1 / 10 = 10%
                if(Math.floor(Math.random() * 10) == 1 && !isGold){
                    elements[type].isGold = 1
                    socket.emit('setGold', { type })
                }
            }
    
        
            gameOver(){
                loading = 0
                clearInterval(intervalId)
                socket.emit('gameOver', { coins: userState.coins })
            }
    
            async continueGame(){
                if(userState.coins >= 10){
                    await users.update({
                        coins: userState.coins - 10
                    }, {
                        where: {
                            name: userState.name
                        }
                    })
                    userState = await users.findOne({
                        where: {
                            name: userState.name
                        },
                        raw: true
                    })
    
                    loading = 1
                    socket.emit('continue', { coins: userState.coins, score, imageSrc })
                    
                }
            }
        }
    
        const game = new Game()
    
        
        createObserver(game.updateCoins)
        createObserver(game.updateScore)
        createObserver(game.updateHightscore)
        createObserver(game.setDifficult)
        createObserver(game.updateImages)
        createObserver(game.levels)
        createObserver(game.reloadButtons)
        
        socket.emit('activateColors', { hightscore: userState.hightscore })
    
        socket.on('startClicked', (state) =>  game.startGame() )
        socket.on('continueClicked', (state) => game.continueGame() )
    
        socket.on('buttonPressed', ({ button }) => {
            switch(button){
                case 'angry':
                    imageSrc.indexOf('Angry.png') != -1 ? notifyAll(angry) : game.gameOver()
                    break
                case 'happy':
                    imageSrc.indexOf('Happy.png') != -1 ? notifyAll(happy) : game.gameOver()
                    break
                case 'sad':
                    imageSrc.indexOf('Sad.png') != -1 ? notifyAll(sad) : game.gameOver()
                    break
            }
        })
    
        socket.on('disconnect', () => {
            console.log(`> Socket ${playerId} disconnected`)
        })
    })
}

module.exports = {
    gameMiddleware,
    game
}
