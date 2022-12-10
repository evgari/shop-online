'use strict';

const timerField = document.querySelector('[data-timer-deadline]');
const deadline = timerField.dataset.timerDeadline;
console.log(deadline);

const createTimer = () => {
  const timerHTML = `
    <p class="timer__title">До конца акции осталось:</p>
    <p class="timer__item timer__item_days">
      <span class="timer__count timer__count_days"></span>
      <span class="timer__units timer__units_days"></span>
    </p>
    <p class="timer__item timer__item_hours">
      <span class="timer__count timer__count_hours"></span>
      <span class="timer__units timer__units_hours"></span>
    </p>
    <p class="timer__item timer__item_minutes">
      <span class="timer__count timer__count_minutes"></span>
      <span class="timer__units timer__units_minutes"></span>
    </p>
    <p class="timer__item timer__item_seconds">
      <span class="timer__count timer__count_seconds"></span>
      <span class="timer__units timer__units_seconds"></span>
    </p>
  `;

  timerField.innerHTML = timerHTML;
};

const timer = deadline => {
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerCountSeconds = document.querySelector('.timer__count_seconds');

  const timerTextDays = document.querySelector('.timer__units_days');
  const timerTextHours = document.querySelector('.timer__units_hours');
  const timerTextMinutes = document.querySelector('.timer__units_minutes');
  const timerTextSeconds = document.querySelector('.timer__units_seconds');

  const timerBlockDays = document.querySelector('.timer__item_days');
  const timerBlockSeconds = document.querySelector('.timer__item_seconds');
  timerBlockSeconds.style.display = 'none';

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    const timeRemainig = dateStop - dateNow;

    const seconds = Math.floor(timeRemainig / 1000) % 60;
    const minutes = Math.floor(timeRemainig / 1000 / 60) % 60;
    const hours = Math.floor(timeRemainig / 1000 / 60 / 60) % 24;
    const days = Math.floor(timeRemainig / 1000 / 60 / 60 / 24);

    return {timeRemainig, seconds, minutes, hours, days};
  };

  const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ?
       2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  const formatNum = param => {
    if (param < 10) {
      return '0' + param;
    } else {
      return param;
    }
  };

  const start = () => {
    const {timeRemainig, seconds, minutes, hours, days} = getTimeRemaining();

    timerCountDays.textContent = days;
    timerCountHours.textContent = formatNum(hours);
    timerCountMinutes.textContent = formatNum(minutes);
    timerCountSeconds.textContent = formatNum(seconds);

    timerTextDays.textContent = declOfNum(days,
        ['день', 'дня', 'дней']);
    timerTextHours.textContent = declOfNum(hours,
        ['час', 'часа', 'часов']);
    timerTextMinutes.textContent = declOfNum(minutes,
        ['минута', 'минуты', 'минут']);
    timerTextSeconds.textContent = declOfNum(seconds,
        ['секунда', 'секунды', 'секунд']);

    const intervalId = setTimeout(start, 1000);

    if (days <= 0) {
      timerBlockDays.style.display = 'none';
      timerBlockSeconds.style.display = 'inline-block';
    }

    if (timeRemainig <= 0) {
      clearTimeout(intervalId);
      timerField.innerHTML = '';
    }
  };

  start();
};

if (timerField) {
  createTimer();
  timer(deadline);
}

