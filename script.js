(() => {
  function reduceNumber() {
    if (Number(timer.textContent) > 0) {
      timer.textContent -= 1;
    } else {
      popupCont = document.querySelector(".popup-container");
      popupCont.style.display = "flex";
      popup = document.querySelector(".popup");
      popup.textContent = "Вы проиграли :("
      clearInterval(intervalID);
      pauseButton = document.querySelector(".pause-button");
      pauseButton.disabled = true;

    }
  }

  function createTimer() {
    const timerContainer = document.createElement("div");
    timerContainer.classList.add("timer-container");

    const timer = document.createElement("div");
    timer.classList.add("timer");
    timer.textContent = "60";

    const pauseButton = document.createElement("button");
    pauseButton.classList.add("pause-button");
    pauseButton.textContent = "Пауза";

    intervalID = setInterval(reduceNumber, 1000);

    timerContainer.append(pauseButton, timer);

    return {
      timerContainer,
      timer,
      intervalID,
      pauseButton,
    };
  }

  function createGameHeader() {
    const header = document.createElement("header");
    header.classList.add("game-header");

    const nav = document.createElement("nav");
    nav.classList.add("container", "nav");

    const backLink = document.createElement("a");
    backLink.classList.add("back-link");
    backLink.textContent = "Закончить игру";
    backLink.href = "index.html";

    timerObject = createTimer();

    pauseButton = timerObject.pauseButton;
    timer = timerObject.timer;
    intervalID = timerObject.intervalID;

    nav.append(backLink, timerObject.timerContainer);
    header.append(nav);

    return {
      header,
      backLink,
      pauseButton,
      timer,
      intervalID,
    };
  }

  function createCard(cardID) {
    const card = document.createElement("div");
    const frontFace = document.createElement("img");
    const backFace = document.createElement("img");
    const hiddenFace = document.createElement("img");

    card.classList.add("memory-card");
    card.setAttribute("data-number", cardID + (cardID % 2));
    frontFace.classList.add("front-face");
    backFace.classList.add("back-face");
    hiddenFace.classList.add("hidden-face");

    frontFace.setAttribute("src", "./img/" + cardID + ".svg");
    backFace.setAttribute("src", "./img/blue2.svg");
    hiddenFace.setAttribute("src", "./img/hidden.png");

    card.append(frontFace, backFace, hiddenFace);

    return card;
  }

  function getSortCards(numberOfCards) {
    let array = [];
    for (let i = 1; i <= numberOfCards; i++) {
      array.push(createCard(i));
    }

    return array; //массив объектов
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function createGame(rows, cols) {
    const headerObject = createGameHeader();
    document.body.prepend(headerObject.header);

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let collected = 0;

    headerObject.pauseButton.addEventListener("click", () => {
      if (intervalID !== 0) {
        headerObject.pauseButton.textContent = "Продолжить";
        lockBoard = true;
        clearInterval(intervalID);
        intervalID = 0;
      } else {
        headerObject.pauseButton.textContent = "Пауза";
        lockBoard = false;
        intervalID = setInterval(reduceNumber, 1000);
      }
    });

    const gameField = document.querySelector(".game-field");
    const row = document.createElement("div");
    row.classList.add("row", "row-cols-" + cols);

    const cards = shuffle(getSortCards(rows * cols));

    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }

    function checkForMatch() {
      let isMatch = firstCard.dataset.number === secondCard.dataset.number;
      isMatch ? disableCards() : unflipCards();
    }

    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;

      this.classList.add("flip");

      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
      secondCard = this;

      checkForMatch();
    }

    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);

      collected++;

      if (collected === rows*cols/2) {
        popupCont = document.querySelector(".popup-container");
        popupCont.style.display = "flex";
        popup = document.querySelector(".popup");
        popup.textContent = "Вы победили :)";
        clearInterval(intervalID);
        headerObject.pauseButton.disabled = true;
      }

      resetBoard();
    }

    function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
      }, 600);
    }

    cards.forEach((card) => {
      card.addEventListener("click", flipCard);

      const cardCell = document.createElement("div");
      cardCell.classList.add("col", "p-3");

      cardCell.append(card);
      row.append(cardCell);
    });

    gameField.append(row);
  }

  window.createGame = createGame;
})();
