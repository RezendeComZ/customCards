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

const randomizeOrder = phrases => {
  let loadedPhrases = phrases
  let newOrder = []
  for (let i = loadedPhrases.length; i == loadedPhrases.length; i--) {
    item = random(loadedPhrases.length)
    newOrder.push(loadedPhrases[item])
    loadedPhrases.splice(item, 1)
  }
  newOrder.pop() // There must be a better solution than that!
  return newOrder
}
  
const getConfigs = lines => {
  firstLine = lines[0]
  if (firstLine.startsWith("CONFIG:")) {
    configs = firstLine.split(" ").slice(1)

    return configs
  }
}

const groupsIndexes = lines => {
  indexes = [] // First phrase by group

  // Puting name and start index:
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("GROUP:")) {
      groupObj = {name: lines[i].split("GROUP:")[1],
                  start: i + 1}
      indexes.push(groupObj)
    }
  }

  // Puting size:
  indexes.forEach((group, index) => {
    if (!indexes[index + 1]) { // last
      indexes[index] = {
        ...group,
        size: - (group.start - lines.length)
      }
    } else {
      indexes[index] = {
        ...group,
        size: Math.abs(group.start - indexes[index + 1].start) - 1
      }
    }
  }
  );

  return indexes
}

const splitByGroups = lines => {
  let groupsIndexesObj = groupsIndexes(lines)
  let arrayOfPharasesByGroup = groupsIndexesObj.map(group => {
    let linesCopy = lines.slice(0)
    return linesCopy.splice(group.start, group.size)})
  let randomPhrasesByGroup = arrayOfPharasesByGroup.map(groupPhrases => randomizeOrder(groupPhrases)) 

  return randomPhrasesByGroup.flat().reverse()
}

const getPhrasesByGroup = lines => {
  if (getConfigs(lines)) {
    return splitByGroups(lines.slice(1)) // Remove configs
  } else {
    return splitByGroups(lines) // no config
  }
}

const loadCards = () => {
  cardsPhrases = getPhrasesByGroup(lines)
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