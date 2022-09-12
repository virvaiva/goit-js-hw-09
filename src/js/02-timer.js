// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// all modules
import Notiflix from 'notiflix';

const refs = {
    startBtn: document.querySelector('[data-start]'),
    inputEl: document.querySelector('#datetime-picker'),

    intrfaceEl: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    }
};

let intervalId = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', startClickTime);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (Date.now() < selectedDates[0]) {   
            refs.startBtn.disabled = false;            
        } else {
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startBtn.disabled = true;            
        }
      console.log(selectedDates[0]);
     },
};

flatpickr('#datetime-picker', options);

function startClickTime() {
    refs.startBtn.disabled = true;
    refs.inputEl.disabled = true;
    intervalId = setInterval(() => {
        const selectedTime = new Date(refs.inputEl.value)
        const deltaTime = selectedTime - Date.now();

        if (deltaTime <= 1000) {
            clearInterval(intervalId)
        }
        changeInterface(deltaTime);
    }, 1000)
    
}
function changeInterface (deltaTime) {
    const data = convertMs(deltaTime);
    Object.entries(data).forEach(([key, value]) => {
        refs.intrfaceEl[key].textContent = addLeadingZero(value);
        
    })
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero (value) {
    return value.toString().padStart(2, '0');
}