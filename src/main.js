import { startGame, 
    reloadButtons,
    reloadGame,
    image,
    continueGame,
    gameButtons, 
    gameHome, 
    angryDOM, 
    happyDOM, 
    sadDOM,
    scoreDiv,
    coinDiv,
    hightscoreDiv,
    gameoverTitle
} from './elements.js'

import { disabledAnimations } from './messages.js'

let score = 0
let hightscore = 0
let coins = 0
let imageSrc = 'img/emoji2.png'
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
        element: angryDOM,
        isGold: 0
    },
    happy: {
        type: 'happy',
        element: happyDOM,
        isGold: 0
    },
    sad: {
        type: 'sad',
        element: sadDOM,
        isGold: 0
    }
}

const { angry, happy, sad } = elements

class Game{

    startGame(){
        loading = 1
        gameHome.innerHTML = ''
        // render score
        score = 0
        scoreDiv.innerHTML = `Pontuação: ${score}`
        gameHome.appendChild(scoreDiv)
        // render image
        image.setAttribute('src', imageSrc)
        gameHome.appendChild(image)
        // Render buttons
        gameHome.appendChild(gameButtons)
        // Set Difficult
        difficult = 'easy'
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

    reloadButtons({ element, isGold, type }){

        if(isGold){
            elements[type].isGold = 0
            element.setAttribute('class', 'button low')
        }

        // goldProbability = 1 / 10 = 10%
        if(Math.floor(Math.random() * 10) == 1 && !isGold){
            elements[type].isGold = 1
            element.setAttribute('class', 'button gold')
        }
    }

    updateCoins({ isGold }){
        if(isGold){
            coins++
            if(disabledAnimations){
                coinDiv.innerHTML = `Moedas<br> ${coins}`
            }else{
                coinDiv.innerHTML = `Moedas<br> ${coins}`
                coinDiv.style.borderWidth = '15px'
                setTimeout(() => coinDiv.style.borderWidth = '5px', 300)
            }
        }
    }

    updateHightscore(command){
        if(score > hightscore){
            hightscore = score

            if(disabledAnimations){
                hightscoreDiv.innerHTML = `Maximo<br> ${score}`
            }else{
                hightscoreDiv.innerHTML = `Maximo<br> ${score}`
                hightscoreDiv.style.borderWidth = '15px'
                setTimeout(() => hightscoreDiv.style.borderWidth = '5px', 300)
            }
        }
    }

    updateScore({ isGold }){

        if(isGold){
            scoreDiv.style.borderColor = '#FFD700'
        }else{
            scoreDiv.style.borderColor = 'black'
        }

        score++
        if(disabledAnimations){
            scoreDiv.innerHTML = `Pontuação: ${score}`
        }else{
            scoreDiv.innerHTML = `Pontuação: ${score}`
            scoreDiv.style.borderWidth = '15px'
            setTimeout(() => scoreDiv.style.borderWidth = '5px', 300)
        }
    }

    updateImages(command){
        const imgsList = [
            'img/emoji2.png',
            'img/emoji3.png',
            'img/emoji4.png'
        ]

        let randomIndex = Math.floor(Math.random() * 3)
        while(image.src.indexOf(`${imgsList[randomIndex]}`) != -1){
            randomIndex = Math.floor(Math.random() * 3)
        }
        
        imageSrc = imgsList[randomIndex]
        image.setAttribute('src', imageSrc)
        console.log(imageSrc)
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

    gameOver(){
        coins >= 10 ? continueGame.disabled = false : continueGame.disabled = true
        loading = 0
        clearInterval(intervalId)
        gameHome.removeChild(image)
        gameHome.appendChild(gameoverTitle)
        gameHome.removeChild(gameButtons)
        gameHome.appendChild(reloadButtons)
    }

    continueGame(){
        if(coins >= 10){
            coins -= 10
            coinDiv.innerHTML = `Moedas<br> ${coins}`
            coinDiv.style.borderWidth = '15px'
            setTimeout(() => coinDiv.style.borderWidth = '5px', 300)
            // game
            loading = 1
            gameHome.innerHTML = ''
            // render score
            scoreDiv.innerHTML = `Pontuação: ${score}`
            gameHome.appendChild(scoreDiv)
            // render image
            image.setAttribute('src', imageSrc)
            gameHome.appendChild(image)
            // Render buttons
            gameHome.appendChild(gameButtons)
        }
    }
}

const game = new Game()

createObserver(game.updateCoins)
createObserver(game.updateScore)
createObserver(game.updateHightscore)
createObserver(game.setDifficult)
createObserver(game.levels)
createObserver(game.updateImages)
createObserver(game.reloadButtons)


startGame.onclick = () => game.startGame()
reloadGame.onclick = () => game.startGame()
continueGame.onclick = () => game.continueGame()

angry.element.onclick = () => image.src.indexOf('emoji4.png') != -1 ? notifyAll(angry) : game.gameOver()
happy.element.onclick = () => image.src.indexOf('emoji3.png') != -1 ? notifyAll(happy) : game.gameOver()
sad.element.onclick = () => image.src.indexOf('emoji2.png') != -1 ? notifyAll(sad) : game.gameOver()

