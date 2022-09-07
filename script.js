const faceUpCard = document.querySelector("#face-up-card")

const cardGoingOut = () => {
  faceUpCard.style.animationDuration = "2s"
  faceUpCard.style.animationName = "going-out"
  setTimeout(() => {
    faceUpCard.style.animationName = "" 
  }, 1000)
}

faceUpCard.addEventListener("click", cardGoingOut)