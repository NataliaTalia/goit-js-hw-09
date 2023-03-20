// 1) Get access to Start button 
// 2) Add event listener to Start button that will change <body> color on click choosing color at random 
// 3) Have the function keep changing the <body> color once every second 
// 4) Deactivate the Start button when the function of changing the color keeps running 
// 5) Stop the color change function when the stop button is clicked 


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');

let intervalId = null;
startBtnRef.addEventListener('click', onClick);

function onClick() {
    startBtnRef.disabled = true;
    intervalId = setInterval(() => {
        bodyRef.style.backgroundColor = getRandomHexColor();
        }, 1000)
}

stopBtnRef.addEventListener('click', onCahngeColorStop);

function onCahngeColorStop() {
    startBtnRef.disabled = false;
    clearInterval(intervalId);
}