const faceUpCard = document.querySelector("#face-up-card")

const cardGoingOut = () => {
  faceUpCard.style.animationPlayState = "running"
  setTimeout(() => faceUpCard.style.animationPlayState = "paused", 2000)
}

faceUpCard.addEventListener("click", cardGoingOut)