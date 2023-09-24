const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);

function startChangingColor() {
  if (!intervalId) {
    startButton.disabled = true;
    changeBackgroundColor(); // Викликати функцію без затримки
    intervalId = setInterval(changeBackgroundColor, 1000);
  }
}

function stopChangingColor() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    startButton.disabled = false;
  }
}

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}