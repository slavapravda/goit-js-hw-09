// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
// Notiflix
import Notiflix from 'notiflix';

const datePickr = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;

let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future 🙅‍♂️');
      btnStartEl.disabled = true;
    } else {
      btnStartEl.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};
flatpickr(datePickr, options);

class Timer {
  constructor() {
    this.timerId = null;
    this.isAcive = false;
    btnStartEl.disabled = true;
  }

  start() {
    if (this.isAcive) {
      return;
    }
    this.isAcive = true;
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;

      if (deltaTime <= 0) {
        return this.stop();
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }, 1000);
  }

  stop() {
    clearInterval(timerId);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer();
btnStartEl.addEventListener('click', () => timer.start());
