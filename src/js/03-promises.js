import Notiflix from 'notiflix';
// 1. Get access to the elements of the form and the form itself;
// 2. Add submit event listener to the form Button; get access to fields values;
// 3. Loop through the promisified function and call it as many times as 
// it is said in the amount field;
// 4. Number of promise = position; 
// Take into the account delay for the first function call and steps;
// 5.

const formRef = document.querySelector('.form');
const delayRef = document.querySelector('[name="delay"]');
const stepsRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');
const btnRef = document.querySelector('button');



function createPromise(position, delay) {

  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;

    setTimeout (() => {

      if (shouldResolve) {
        // Fulfill
        resolve ({ position, delay });
        
      } else {
        reject ({ position, delay });
        // Reject
      }
    }, delay)
  })
  
}


formRef.addEventListener('submit', (e) => {
  e.preventDefault();
  
 
  const delay = Number(formRef.elements.delay.value);
  console.log(delay);
  const step = Number(formRef.elements.step.value);
  console.log(step);
  const amount = Number(formRef.elements.amount.value);
  console.log(amount)

  let position = 0;

  let promiseDelay = delay;

  for(let i = 1; i <= amount; i+=1) {
    
    position += 1;

    createPromise(position, promiseDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  
  promiseDelay += step;
  }
  
  formRef.reset()
})
