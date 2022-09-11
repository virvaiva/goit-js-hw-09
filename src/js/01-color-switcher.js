const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener("click", onClickBtn);
stopBtn.addEventListener("click", onClickStopBtn);

function onClickBtn() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
};


function onClickStopBtn () {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
};

