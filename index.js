let wormPosition = { top: 200, left: 300 };
let wormDirection = "right";
let wormBody = [];
let foodPosition = {};
let gameInterval;
let score = 0;

function startGame() {
  document.addEventListener("keydown", changeDirection);
  gameInterval = setInterval(gameLoop, 100);
  generateFood();
}

function gameLoop() {
  updateWormPosition();
  checkSelfCollision();
  updateWormBody();
  checkFoodCollision();
  checkBoundaryCollision();
}

function changeDirection(event) {
  switch (event.keyCode) {
    case 37: // left
      wormDirection = "left";
      break;
    case 38: // up
      wormDirection = "up";
      break;
    case 39: // right
      wormDirection = "right";
      break;
    case 40: // down
      wormDirection = "down";
      break;
    default:
      break;
  }
}

function updateWormPosition() {
  switch (wormDirection) {
    case "left":
      wormPosition.left -= 20;
      break;
    case "up":
      wormPosition.top -= 20;
      break;
    case "right":
      wormPosition.left += 20;
      break;
    case "down":
      wormPosition.top += 20;
      break;
    default:
      break;
  }
}

function updateWormBody() {
  if (wormBody.length > score) {
    let wormTail = wormBody.shift();
    document.getElementById(wormTail.id).remove();
  }

  let wormElement = document.createElement("div");
  wormElement.style.width = "20px";
  wormElement.style.height = "20px";
  wormElement.style.position = "absolute";
  wormElement.style.top = wormPosition.top + "px";
  wormElement.style.left = wormPosition.left + "px";
  wormElement.style.zIndex = "0";
  wormElement.classList.add("worm");
  wormElement.dataset.direction = wormDirection;

  wormElement.id = "worm-body-" + wormBody.length;

  wormBody.push({
    top: wormPosition.top,
    left: wormPosition.left,
    id: wormElement.id,
  });

  // head & tail add class
  document.getElementById("snake").appendChild(wormElement);
  const [head] = document.querySelectorAll(".head");
  if (head) head.classList.remove("head");
  const [tail] = document.querySelectorAll(".tail");
  if (tail) tail.classList.remove("tail");

  const wormBodyElList = document.querySelectorAll(".worm");
  wormBodyElList[wormBodyElList.length - 1].classList.add("head");

  const neck = wormBodyElList[wormBodyElList.length - 2];
  if (neck) {
    neck.dataset.direction = wormDirection;
  }

  wormBodyElList[0].classList.add("tail");
}

function checkBoundaryCollision() {
  if (wormPosition.top < 0 || wormPosition.top > 380 || wormPosition.left < 0 || wormPosition.left > 580) {
    gameOver();
  }
}

function updateScore() {
  score++;
  document.getElementById("score").innerHTML = +score;
}

function checkFoodCollision() {
  if (wormPosition.top === foodPosition.top && wormPosition.left === foodPosition.left) {
    updateScore();
    document.querySelector("#food").remove();
    generateFood();
  }
}

function checkSelfCollision() {
  for (let i = 1; i < wormBody.length; i++) {
    if (wormPosition.top === wormBody[i].top && wormPosition.left === wormBody[i].left) {
      gameOver();
    }
  }
}

function generateFood() {
  let foodElement = document.createElement("div");
  foodElement.style.width = "20px";
  foodElement.style.height = "20px";
  foodElement.style.position = "absolute";

  foodPosition = {
    top: Math.floor(Math.random() * 20) * 20,
    left: Math.floor(Math.random() * 30) * 20,
  };

  foodElement.style.top = foodPosition.top + "px";
  foodElement.style.left = foodPosition.left + "px";
  foodElement.style.borderRadius = "50%";
  foodElement.style.zIndex = "1";
  foodElement.id = "food";

  document.getElementById("game_board").appendChild(foodElement);
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Your score is " + score);
  location.reload();
}

startGame();