const startBtnEL = document.querySelector('button[data-start]');
const stopBtnEL = document.querySelector('button[data-stop');
const bodyEL = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtnEL.addEventListener('click', onStartBtnClick);
stopBtnEL.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  timerID = setInterval(() => {
    bodyEL.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtnEL.disabled = true;
  stopBtnEL.disabled = false;
}

function onStopBtnClick() {
  clearInterval(timerID);

  startBtnEL.disabled = false;
  stopBtnEL.disabled = true;
}
