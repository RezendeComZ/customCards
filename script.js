const random = size => Math.floor(Math.random() * size)

let lines = []
let cardsPhrases = []
const footerText = document.querySelector("#group-name")

const cardGoingOut = () => {
  footerText.textContent = cardsPhrases[0].groupName

  if (cardsPhrases[0].questions.length < 1) {
    cardsPhrases.shift()
  }
  faceUpCard.style.animationDuration = "2s"
  faceUpCard.style.animationName = "going-out"
  setTimeout(() => {
    faceUpCardText.textContent = faceDownCardText.textContent
    faceDownCardText.textContent = cardsPhrases[0].questions.pop() || faceDownCard.remove();
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

const getSettings = lines => {
  firstLine = lines[0]
  if (firstLine.startsWith("SETTINGS:")) {
    settings = firstLine.split(" ").slice(1)

    return settings
  }
}

const groupsIndexes = lines => {
  indexes = [] // Group and first question

  // Puting name and start index:
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("GROUP:")) {
      groupObj = {
        groupName: lines[i].split("GROUP:")[1].slice(1, -1),
        start: i + 1
      }
      indexes.push(groupObj)
    }
  }

  // Group size:
  indexes.forEach((group, index) => {
    if (indexes[index + 1]) {
      indexes[index] = {
        ...group,
        size: Math.abs(group.start - indexes[index + 1].start) - 1
      }
    } else { // last
      indexes[index] = {
        ...group,
        size: - (group.start - lines.length)
      }
    }
  });

  return indexes
}

const splitByGroups = lines => {
  groupsIndexesObj = groupsIndexes(lines)
  arrayOfPharasesByGroup = groupsIndexesObj.map(group => {
    linesCopy = lines.slice(0)
    return {
      ...group,
      questions: linesCopy.splice(group.start, group.size),
    }
  })

  return arrayOfPharasesByGroup.map(groupPhrases => {
    return {
      questions: randomizeOrder(groupPhrases.questions),
      groupName: groupPhrases.groupName
    }
  })
}

const getPhrasesByGroup = lines => {
  if (getSettings(lines)) {
    return splitByGroups(lines.slice(1)) // Remove settings when it exist
  } else {
    return splitByGroups(lines)
  }
}

const loadCards = () => {
  cardsPhrases = getPhrasesByGroup(lines)
  cardsPhrases = cardsPhrases.slice(0, cardsPhrases.length - 1)

  // TODO: What happens if it is empty? Or just one?
  // First two questions:
  faceUpCardText.textContent = cardsPhrases[0].questions.pop()
  faceDownCardText.textContent = cardsPhrases[0].questions.pop()
  footerText.textContent = cardsPhrases[0].groupName

  faceUpCard.addEventListener("click", cardGoingOut)
}

fetch('questions.txt')
  .then(response => response.text())
  .then(text => {
    lines = text.split("\n")
    loadCards()
  })