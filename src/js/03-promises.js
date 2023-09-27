import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = { position, delay };
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result); 
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  const delayInput = form.querySelector('input[name="delay"]');
  const stepInput = form.querySelector('input[name="step"]');
  const amountInput = form.querySelector('input[name="amount"]');

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (step < 0 || delay < 0 || amount <= 0) {
    Notiflix.Notify.failure('❌ Please enter valid values for step, delay, and amount.');
    return; 
  }

  const promises = [];

  for (let i = 1; i < amount; i++) {
    promises.push(createPromise(i, delay + i * step));
  }

  for (const promise of promises) {
    try {
      const result = await promise;
      Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    } catch (error) {
      Notiflix.Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
    }
  }
});