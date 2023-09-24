const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

startButton.addEventListener('click', startChangingColor);
stopButton.addEventListener('click', stopChangingColor);

function startChangingColor() {
  if (!intervalId) {
    startButton.disabled = true; // Деактивуємо кнопку "Start"
    intervalId = setInterval(changeBackgroundColor, 1000); // Змінюємо колір кожну секунду (1000 мс)
  }
}

function stopChangingColor() {
  if (intervalId) {
    clearInterval(intervalId); // Зупиняємо інтервал
    intervalId = null;
    startButton.disabled = false; // Активуємо кнопку "Start" знову
  }
}

function changeBackgroundColor() {
  const randomColor = getRandomColor();
  body.style.backgroundColor = randomColor;
}

// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }



function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}