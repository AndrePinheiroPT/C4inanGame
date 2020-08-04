export const angryDOM = document.createElement('button')
export const happyDOM = document.createElement('button')
export const sadDOM = document.createElement('button')
export const reloadGame = document.createElement('button')
export const continueGame = document.createElement('button')
export const blackButton = document.createElement('button')
export const bronzeButton = document.createElement('button')
export const blueButton = document.createElement('button')
export const purpleButton = document.createElement('button')
export const redButton = document.createElement('button')

export const gameButtons = document.createElement('div')
export const messageContent = document.createElement('div')
export const informationContent = document.createElement('div')
export const reloadButtons = document.createElement('div')
export const scoreDiv = document.createElement('div')
export const blackWindow = document.createElement('div')
export const disabledButtom = document.createElement('input')

export const gameoverTitle = document.createElement('h2')
export const singleTitle = document.createElement('h4')

export const image = document.createElement('img')
export const toy = document.createElement('img')

export const buttonList = document.querySelector('.button-list')
export const container = document.querySelector('.container')
export const startGame = document.querySelector('.start')
export const gameHome = document.querySelector('.game-home')
export const informationButtom = document.querySelector('.information')
export const rules = document.querySelector('.rules')
export const contact = document.querySelector('.contact')
export const coinDiv = document.querySelector('.coins')
export const hightscoreDiv = document.querySelector('.hightScore')

toy.setAttribute('src', '../public/img/pos1.png')

reloadGame.setAttribute('class', 'button medium')
gameoverTitle.setAttribute('class', 'gameover')
continueGame.setAttribute('class', 'button gold continue')
scoreDiv.setAttribute('class', 'score')
angryDOM.setAttribute('class', 'button low')
happyDOM.setAttribute('class', 'button low')
sadDOM.setAttribute('class', 'button low')
image.setAttribute('class', 'game-image')
toy.setAttribute('class', 'c4inan-pos1')
messageContent.setAttribute('class', 'message')
informationContent.setAttribute('class', 'information-content')
blackWindow.setAttribute('class', 'black-window')
singleTitle.setAttribute('class', 'single-title')
disabledButtom.setAttribute('type', 'checkbox')
disabledButtom.setAttribute('class', 'disabled-animations')
blackButton.setAttribute('class', 'black-button')
bronzeButton.setAttribute('class', 'bronze-button')
blueButton.setAttribute('class', 'blue-button')
purpleButton.setAttribute('class', 'purple-button')
redButton.setAttribute('class', 'red-button')

gameoverTitle.appendChild(document.createTextNode('FIM DE JOGO'))
angryDOM.appendChild(document.createTextNode('Raiva'))
happyDOM.appendChild(document.createTextNode('Alegria'))
sadDOM.appendChild(document.createTextNode('Tristeza'))
reloadGame.appendChild(document.createTextNode('RECOMECAR?'))
continueGame.appendChild(document.createTextNode('CONTINUAR?'))

gameButtons.appendChild(angryDOM)
gameButtons.appendChild(happyDOM)
gameButtons.appendChild(sadDOM)

reloadButtons.appendChild(reloadGame)
reloadButtons.appendChild(continueGame)

bronzeButton.disabled = true
blueButton.disabled = true
purpleButton.disabled = true
redButton.disabled = true

