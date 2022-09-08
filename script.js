const random = size => Math.floor(Math.random() * size)

let phrases = []

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

const pickAndRemove = () => {
  loadedPhrases = phrases
  for (let i = loadedPhrases.length; i == loadedPhrases.length; i--) {
    randomItem = random(loadedPhrases.length)
    cardsPhrases.push(loadedPhrases[randomItem])
    delete loadedPhrases[randomItem]
    loadedPhrases = loadedPhrases.filter(el => el !== undefined)
  }
}

const loadCards = () => {
  pickAndRemove()
  cardsPhrases = cardsPhrases.slice(0, cardsPhrases.length - 1)
  
  faceUpCardText.textContent = cardsPhrases.pop()
  faceDownCardText.textContent = cardsPhrases.pop()
  
  faceUpCard.addEventListener("click", cardGoingOut)
}

const file = fetch('phrases.txt')
.then(response => response.text())
.then(text => {
  phrases = text.split("\n")
  loadCards()})