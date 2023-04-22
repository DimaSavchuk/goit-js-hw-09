import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const dateImportEl = document.querySelector('#datetime-picker');
const buttomStartEl = document.querySelector('[data-start]');
const dateDaysEl = document.querySelector('[data-days]');
const dateHoursEl = document.querySelector('[data-hours]')
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

buttomStartEl.disabled = true;

flatpickr(dateImportEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        if (selectedDate < new Date()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            buttomStartEl.disabled = false;
            buttomStartEl.addEventListener('click', () => {
                dateImportEl.disabled = true;
                const timerId = setInterval(() => {
                    const deltaTime = selectedDates[0] - Date.now();

                    if (deltaTime <= 0) {
                        clearInterval(timerId);
                        Notiflix.Notify.success('Time out!');
                        dateImportEl.disabled = false;
                        buttomStartEl.disabled = true;
                    } else {
                        const finalTime = convertMs(deltaTime);

                        dateDaysEl.textContent = finalTime.days;
                        dateHoursEl.textContent = finalTime.hours;
                        dataMinutesEl.textContent = finalTime.minutes;
                        dataSecondsEl.textContent = finalTime.seconds;
                    }
                }, 1000)
            });
        }
    },
});


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };

}

function pad(value) {
    return String(value).padStart(2, '0');
}