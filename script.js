const faceUpCard = document.querySelector("#face-up-card")

const cardGoingOut = () => {
  faceUpCard.style.animationPlayState = "running"
}

faceUpCard.addEventListener("click", cardGoingOut)