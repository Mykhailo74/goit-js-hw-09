import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Функція для створення промісу зі затримкою
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = { position, delay };

      // Використовуємо початковий код для визначення, чи виконувати або відхиляти проміс
      if (position % 2 === 0) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

// Отримуємо посилання на форму
const form = document.getElementById("promiseForm");

// Обробник подачі форми
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Забороняємо стандартну подію форми

  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  const promises = [];

  // Створюємо promises і додаємо їх до масиву
  for (let i = 0; i < amount; i++) {
    promises.push(createPromise(i, delay + i * step));
  }

  // Очікуємо виконання всіх promises
  try {
    const results = await Promise.all(promises);
    console.log("All promises resolved:", results);
  } catch (error) {
    console.error("At least one promise was rejected:", error);
  }
});


// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
