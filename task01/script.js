'use strict';

const input = document.querySelector('.input');
const par = document.querySelector('.par');

const addText = () => {
  par.textContent = input.value;
};

input.addEventListener('change', () => {
  setTimeout(addText, 3000);
});






