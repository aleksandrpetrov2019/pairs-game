(() => {
  document.body.classList.add("start-page__body");

  const container = document.querySelector('.container');

  const title = document.createElement("h1");
  title.classList.add("start-page__title");
  title.textContent = "Игра в пары";

  const welcomeText = document.createElement('p');
  welcomeText.classList.add("start-page__welcome-text");
  welcomeText.textContent = "Правила игры: перед вами лежат карты рубашкой вверх, ваша задача последовательно открывать пары одинаковых карт. После открытия пары разных карт они будут закрыты обратно. Таким образом, к концу игры у вас будет поле с перевёрнутыми картами. Выберите уровень сложности:";

  const levelList = document.createElement('ul');
  levelList.classList.add("start-page__list", "row");

  const easyLevel = document.createElement('li');
  easyLevel.classList.add("start-page__item", "col-4");
  const normalLevel = document.createElement("li");
  normalLevel.classList.add("start-page__item", "col-4");
  const hardLevel = document.createElement("li");
  hardLevel.classList.add("start-page__item", "col-4");

  const easyLevelLink = document.createElement('a');
  easyLevelLink.classList.add("start-page__link", "easy", "px-6", "py-2");
  easyLevelLink.textContent = "Лёгкий";
  easyLevelLink.href = "easy.html";
  easyLevel.style.textAlign = "center";
  const normalLevelLink = document.createElement("a");
  normalLevelLink.classList.add("start-page__link", "normal", "px-6", "py-2");
  normalLevelLink.textContent = "Средний";
  normalLevelLink.href = "normal.html";
  normalLevel.style.textAlign = "center";
  const hardLevelLink = document.createElement("a");
  hardLevelLink.classList.add("start-page__link", "hard", "px-6", "py-2");
  hardLevelLink.textContent = "Трудный";
  hardLevelLink.href = "hard.html";
  hardLevel.style.textAlign = "center";

  easyLevel.append(easyLevelLink);
  normalLevel.append(normalLevelLink);
  hardLevel.append(hardLevelLink);

  levelList.append(easyLevel, normalLevel, hardLevel);

  container.append(title);
  container.append(welcomeText);
  container.append(levelList);
})();

