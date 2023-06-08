const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let position = 0;
let isJumping = false;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 160) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        position -= 20;
        dino.style.bottom = position + "px";
        if (position <= 0) {
          isJumping = false;
          clearInterval(downInterval);
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + "px";
    }
  }, 20);
}

function createCactus() {
  let endTime = "";
  const cactus = document.createElement("div");
  let cactusPosition = 1020;
  let randomTime = Math.floor(Math.random() * 6000);

  if (
    (endTime != "" && randomTime - endTime <= 0) ||
    (randomTime - endTime > 0 && randomTime - endTime < 500)
  ) {
    randomTime = Math.floor(Math.random() * 6000);
  }

  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML  = "<h1 class='game-over'> Fim de jogo </h1>";
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);

  endTime = randomTime;
  setTimeout(createCactus, randomTime);
}

createCactus();

document.addEventListener("keyup", handleKeyUp);
