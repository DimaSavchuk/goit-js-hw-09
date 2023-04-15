const switchStartEl = document.querySelector('[data-start]');
const switchStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let timerId = null;

switchStartEl.addEventListener('click', onSwitchStart);

function onSwitchStart() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);

    switchStartEl.disabled = true;
};

switchStopEl.addEventListener('click', onSwitchStop);

function onSwitchStop() {
    clearInterval(timerId);

    if (switchStartEl.disabled = true) {
        switchStartEl.disabled = false;
    }
}