import {
    blackWindow,
    messageContent,
    rules,
    container,
    singleTitle,
    toy
} from './elements.js'

rules.onclick = () => {
    singleTitle.appendChild(document.createTextNode('Regras!'))
    const text = 'As regras são simples! Ao começar o jogo aparecerá três imagens de forma aléatoria e três botões. Cada um desses botões irá corresponder a uma imagem, mas CUIDADO! Exite a chance de aparecer armadilhas... De qualquer forma, boa sorte em obter a maior pontuação maxima :) '
    messageContent.appendChild(singleTitle)
    messageContent.appendChild(document.createTextNode(text))
    
    
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