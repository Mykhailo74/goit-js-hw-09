import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  if (inputStep < 0 || inputDelay < 0 || inputAmount <= 0) {
    Notiflix.Notify.failure(`❌ Please enter valid values for step, delay, and amount.`);
    return;
  }

  for (let i = 1; i <= inputAmount; i++) {
    createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    inputDelay += inputStep;
  }
}
