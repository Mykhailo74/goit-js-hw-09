import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay(timeLeft) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(timeLeft.days);
  hoursElement.textContent = addLeadingZero(timeLeft.hours);
  minutesElement.textContent = addLeadingZero(timeLeft.minutes);
  secondsElement.textContent = addLeadingZero(timeLeft.seconds);
}

function startTimer(targetDate) {
  toggleInputDisabled(true); 

  const timerInterval = setInterval(function () {
    const currentDate = new Date();
    const timeLeftMs = targetDate - currentDate;

    if (timeLeftMs <= 0) {
      clearInterval(timerInterval);
      toggleInputDisabled(false); 
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.failure('Time is up!');
      return;
    }

    const timeLeft = convertMs(timeLeftMs);
    updateTimerDisplay(timeLeft);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

function toggleInputDisabled(disabled) {
  datetimePicker.disabled = disabled;
}

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    if (selectedDates.length > 0) {
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      
      if (selectedDate <= currentDate) {
        Notiflix.Notify.failure('Please choose a date in the future');
        startButton.disabled = true;
      } else {
        startButton.disabled = false;
        startButton.addEventListener('click', function () {
          startTimer(selectedDate);
          startButton.disabled = true;
        });
      }
    }
  },
};

const flatpickrInstance = flatpickr(datetimePicker, flatpickrOptions);