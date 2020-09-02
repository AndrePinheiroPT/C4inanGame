import {
    blackWindow,
    messageContent,
    informationButtom,
    rules,
    contact,
    container,
    singleTitle,
    toy,
    disabledButtom,
    blackButton,
    bronzeButton,
    blueButton,
    purpleButton,
    redButton
} from './elements.js'

export let disabledAnimations = 0
toy.setAttribute('src', '/img/pos1.png')

disabledButtom.onclick = () => {
    if(disabledButtom.checked){
        disabledAnimations = 1
        bronzeButton.style.animation = 'none'
        blueButton.style.animation = 'none'
        purpleButton.style.animation = 'none'
        redButton.style.animation = 'none'
        toy.style.animation = 'none'
        messageContent.style.animation = 'none'
        document.body.style.animation = 'none'
        
    }else{
        disabledAnimations = 0
        bronzeButton.style.animation = 'animation-moviment 5s ease-in-out infinite'
        blueButton.style.animation = 'animation-moviment 5s ease-in-out infinite'
        purpleButton.style.animation = 'animation-moviment 5s ease-in-out infinite'
        redButton.style.animation = 'animation-moviment 5s ease-in-out infinite'
        toy.style.animation = 'toy 2s'
        messageContent.style.animation = 'message 2s'
        document.body.style.animation = 'animation-moviment 5s ease-in-out infinite'
    }
}

rules.onclick = () => {
    singleTitle.appendChild(document.createTextNode('Regras!'))
    const text = 'As regras são simples! Ao começar o jogo aparecerá três imagens de forma aléatoria e três botões. Cada um desses botões irá corresponder a uma imagem, mas CUIDADO! Exite a chance de aparecer armadilhas... De qualquer forma, boa sorte em obter a maior pontuação maxima :) '
    messageContent.appendChild(singleTitle)
    messageContent.appendChild(document.createTextNode(text))
    messageContent.style.height = '180px'
    
    
    container.appendChild(blackWindow)
    container.appendChild(toy)
    container.appendChild(messageContent)
}

contact.onclick = () => {
    const link = document.createElement('a')
    link.setAttribute('href', ' https://github.com/AndrePinheiroPT/C4inanGame')
    link.appendChild(document.createTextNode('GitHub'))
    singleTitle.appendChild(document.createTextNode('Contacto!'))
    const text = 'Entre em contacto comigo! É super importante divulgar falhas encontradas no jogo e muito mais! Faça sua issue no '
    messageContent.appendChild(singleTitle)
    messageContent.appendChild(document.createTextNode(text))
    messageContent.appendChild(link)
    messageContent.style.height = '90px'
    
    
    container.appendChild(blackWindow)
    container.appendChild(toy)
    container.appendChild(messageContent)
}

informationButtom.onclick = () => {
    singleTitle.appendChild(document.createTextNode('Configurações!'))
    messageContent.appendChild(singleTitle)

    const contentConfig = document.createElement('div')
    contentConfig.setAttribute('class', 'content-config')
    contentConfig.appendChild(document.createTextNode('Desativar animações: '))

    contentConfig.appendChild(disabledButtom)

    contentConfig.appendChild(document.createElement('br'))
    contentConfig.appendChild(document.createElement('hr'))

    contentConfig.appendChild(document.createTextNode('Cores para o fundo: '))
    contentConfig.appendChild(document.createElement('br'))
    
    contentConfig.appendChild(blackButton)
    contentConfig.appendChild(bronzeButton)
    contentConfig.appendChild(blueButton)
    contentConfig.appendChild(purpleButton)
    contentConfig.appendChild(redButton)
    
    messageContent.appendChild(contentConfig)
    messageContent.style.height = '120px'
    container.appendChild(blackWindow)
    container.appendChild(toy)
    container.appendChild(messageContent)
}


blackWindow.onclick = () => {
    singleTitle.innerHTML = ''
    messageContent.innerHTML = ''
    container.removeChild(toy)
    container.removeChild(blackWindow)
    container.removeChild(messageContent)
} 

blackButton.onclick = () => document.body.removeAttribute('class')
bronzeButton.onclick = () => document.body.setAttribute('class', 'backGround-bronze')
blueButton.onclick = () => document.body.setAttribute('class', 'backGround-blue')
purpleButton.onclick = () => document.body.setAttribute('class', 'backGround-purple')
redButton.onclick = () => document.body.setAttribute('class', 'backGround-red')





