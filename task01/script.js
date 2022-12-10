'use strict';

const input = document.querySelector('.input');
const par = document.querySelector('.par');

const addText = () => {
  par.textContent = input.value;
};

const fn = debounce(addText, 300);

input.addEventListener('input', fn);

function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);  
    }, delay);
  }
};


