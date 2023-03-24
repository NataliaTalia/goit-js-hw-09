import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';



const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minRef = document.querySelector('span[data-minutes]');
const secRef = document.querySelector('span[data-seconds]');
startBtnRef.disabled = true;

function updateClockface ({days, hours, minutes, seconds}) {
    
    daysRef.textContent = `${days}`;
    hoursRef.textContent = `${hours}`;
    minRef.textContent = `${minutes}`;
    secRef.textContent = `${seconds}`;
}

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {

      console.log(selectedDates[0]);

      const today = new Date();

      if(selectedDates[0] < today) {

        Notiflix.Report.warning('Warning!', 'Choose the date in the future', 'OKAY');
          startBtnRef.disabled = true;

      } else {

        const countdown = new Countdown(selectedDates[0]);
        startBtnRef.disabled = false;
        startBtnRef.addEventListener('click', (e) => {

            const pickerField = document.querySelector('#datetime-picker');

            if(e.target.dataset.action === 'start') {
             startBtnRef.textContent = 'Stop';
             e.target.dataset.action = 'stop';
             pickerField.disabled = true;
        
            countdown.start();
        
            } else {

                startBtnRef.textContent = 'Start';
                e.target.dataset.action = 'start';
                pickerField.disabled = false;
        
               countdown.stop();
        
            }
          })
      }
    },
  });

  
  class Countdown {

    constructor(selectedDate) {
        this.selectedDate = selectedDate;
        this.intervalId = null;
        
      }

      
    start () {
        
        const startTime = this.selectedDate.getTime();
       
        this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;
        console.log(deltaTime);
 
        
        if(deltaTime <= 1000) {
            
            clearInterval(this.intervalId);
            Notiflix.Report.warning('Countdown finished', 'To start new countdown, please, refresh the page', 'OKAY');
            startBtnRef.disabled = true;
        } else {
            console.log(deltaTime)
        }

        const time = convertMs(deltaTime);
        updateClockface(time);

        
        }, 1000);

      
    }
    stop () {

        clearInterval(this.intervalId);
        console.log("Stop")
    }
}

 function pad(value) {
    return String(value).padStart(2, '0');
 }

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }