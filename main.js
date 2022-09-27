const cardsContainer = document.querySelector('.cards-container');

const startButton = document.querySelector('#startButton');

const cards = ['airplane', 'cactus', 'car', 'flamingo', 'hat', 'luggage', 'popsicle', 'sunglasses'];

const pairs = cards.concat(cards);

let allCards = [];

let cardsIndex = [];

let flippedNum = 0;

let isWin = false;

let isStart = false;

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    let swap = array[i];
    array[i] = array[randomNum];
    array[randomNum] = swap;
  }
  return array;
}

let shuffledCards = shuffleCards(pairs);

setGame();

startButton.addEventListener("click", startGame);

if (isStart) {
  startButton.disabled = true;
}

function setGame() {
  htmlTemplate = ``;
  for (let i = 0; i < shuffledCards.length; i++) {
    htmlTemplate += `<div class="card" data-card="${shuffledCards[i]}">
    <div class="card-inner">
      <div class="card-face front"></div>
      <div class="card-face back">
        <img class="card-image" src="img/${shuffledCards[i]}.png" alt="image">
      </div>
    </div>
  </div>`;
  }

  cardsContainer.insertAdjacentHTML('afterbegin', htmlTemplate);
}

allCards = [...document.querySelectorAll('.card')];

allCards.forEach(card => {
  card.style.pointerEvents = "none";
})

function startGame() {

  isStart = true;

  if (isStart) {
    startButton.disabled = true;
  }

  allCards.forEach(card => {
    card.firstElementChild.classList.add("isFlipped");
  })

  setTimeout(() => {
    allCards.forEach(card => {
      card.firstElementChild.classList.remove("isFlipped");
      card.style.pointerEvents = "auto";
    })
  }, 2000)
}

allCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    flipCard(e, index);
  });
});

function flipCard(e, index) {

  const clickedCard = e.currentTarget.firstElementChild;
  if (!clickedCard.classList.contains("isFlipped")) {
    clickedCard.classList.add("isFlipped");
  }
  flippedNum++;

  if (flippedNum <= 2) {
    cardsIndex.push(index);
    if (flippedNum == 2) {
      checkCards();
    }
  }

  if (checkWin()) {
    isWin = true;
  } else {
    isWin = false;
  }

  if (isWin) {
    console.log("You have found all the pairs!");
  }

  console.log(flippedNum, cardsIndex);
}

function checkCards() {

  allCards.forEach((card) => {
    card.style.pointerEvents = "none";
  })

  let [firstIndex, secondIndex] = cardsIndex;
  let firstCard = allCards[firstIndex];
  let secondCard = allCards[secondIndex];
  if (firstCard.dataset.card !== secondCard.dataset.card) {
    setTimeout(() => {
      firstCard.firstElementChild.classList.remove("isFlipped");
      secondCard.firstElementChild.classList.remove("isFlipped");
      allCards.forEach((card) => {
        card.style.pointerEvents = "auto";
      })
      flippedNum = 0;
      cardsIndex = [];
    }, 1000);
  } else if (firstCard.dataset.card == secondCard.dataset.card) {
    allCards.forEach((card) => {
      card.style.pointerEvents = "auto";
    })
    flippedNum = 0;
    cardsIndex = [];
  }
}

function checkWin() {
  return allCards.every(card => card.firstElementChild.classList.contains("isFlipped"));
}