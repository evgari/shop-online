'use strict';

const input = document.querySelector('.input');
const par = document.querySelector('.par');

const addText = () => {
  par.textContent = input.value;
};

const f = debounce(addText, 300);

input.addEventListener('input', () => {
  f();
});

function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);  
    }, delay);
  }
};


