const random = size => Math.floor(Math.random() * size)

let lines = []

let cardsPhrases = []

const cardGoingOut = () => {
  faceUpCard.style.animationDuration = "2s"
  faceUpCard.style.animationName = "going-out"
  setTimeout(() => {
    faceUpCardText.textContent = faceDownCardText.textContent
    faceDownCardText.textContent = cardsPhrases.pop() || faceDownCard.remove();
    faceUpCard.style.animationName = "" 
    }, 1800)
}
const faceUpCard = document.querySelector("#face-up-card")
const faceDownCard = document.querySelector("#face-down-card")
const faceUpCardText = document.querySelector("#face-up-card-text")
const faceDownCardText = document.querySelector("#face-down-card-text")

const pickAndRemove = phrases => {
  loadedPhrases = phrases
  for (let i = loadedPhrases.length; i == loadedPhrases.length; i--) {
    item = random(loadedPhrases.length)
    cardsPhrases.push(loadedPhrases[item])
    loadedPhrases.splice(item, 1)
  }
}
  
const getConfigs = lines => {
  firstLine = lines[0]
  if (firstLine.startsWith("CONFIG:")) {
    configs = firstLine.split(" ").slice(1)
    console.log(configs);

    return configs
  }
}

const splitByGroups = lines => {
  // colocar alguma coisa para quebrar em arrays quando encontrar uma line === "GROUP:"
  // Daria para fazer um array com tipo indexOf (só que de todos), colocar esses indexes em array, em em seguida, pegar esses e fazer um map, que retorna  o inicio e o fim desses grupos, pode ser em cima desse array com indexes

  /* 
  Ex: ["GROUP: Fácil", "pergunta fácil", "pergunta facil2", "GROUP: Difícil", "pergunta dificil", "GROUP: Muito difícil", "aaaa"]

  Quando tiver startsWith("GROUP: ") armazenar index (que é onde começa), então:
  indexes = [0, 3, 5] // esses sao os indexs dos grupos

  While indexes.length > 0:
  Pra pegar as frases é fazer um lines.slice(indexes[0] + 1, indexes[1] - 1) pra pegar o primeiro grupo. E jogamos para outro novo array esse grupo em forma de obj: [{group: "Fácil", phrases: ["pergunta fácil", "pergunta facil2"]}]
  No segundo, removemos o primeiro item então:
  indexes = [3 , 5]
  Repete o procedimento pra pegar o segundo grupo: lines.slice(indexes[0] + 1, indexes[1] - 1)
  ficamos com:
  indexes = [5]
  Se indexes.length = 0: // ou seja, ultimo grupo
  lines.slice(5)
  
  mandamos para um array que ficará assim no final:

  [{group: "Fácil", phrases: ["pergunta fácil", "pergunta facil2"]},
   {group: "Dificil", phrases: ["pergunta dificil"]},
   {group: "Muito difícil", phrases: ["aaaa"]},
  ]

  map com operacoes tipo random/uppercase/etc
  , mas deixando ainda o nome do grupo, podemos precisar usar para inserir nas cartas
  */
  return lines
}

const getPhrasesByGroup = lines => {

  if (getConfigs(lines)) { // Remove configs from  here
    console.log("tem config");
    return splitByGroups(lines.slice(1))
  } else {
    console.log(" nao tem config");
    return splitByGroups(lines)
  }
}


const loadCards = () => {
  sortedPhrases = getPhrasesByGroup(lines)
  pickAndRemove(sortedPhrases)
  cardsPhrases = cardsPhrases.slice(0, cardsPhrases.length - 1)
  
  faceUpCardText.textContent = cardsPhrases.pop()
  faceDownCardText.textContent = cardsPhrases.pop()
  
  faceUpCard.addEventListener("click", cardGoingOut)
}

const file = fetch('phrases.txt')
.then(response => response.text())
.then(text => {
  lines = text.split("\n")
  loadCards()})