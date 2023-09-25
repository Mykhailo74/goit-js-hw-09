// import { Notify } from 'notiflix/build/notiflix-notify-aio';

 // Функція для створення промісу зі затримкою
      function createPromise(position, delay) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = { position, delay };
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
              resolve(result); // Виконувати проміс
            } else {
              reject(result); // Відхиляти проміс
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
        for (const promise of promises) {
          try {
            const result = await promise;
            console.log(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
          } catch (error) {
            console.log(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
          }
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
