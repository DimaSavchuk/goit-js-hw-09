import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const submitButton = formEl.querySelector('button[type="submit"]');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    submitButton.disabled = true;
    const data = {};

    new FormData(formEl).forEach((value, name) => (data[name] = value));

    let delayCounter = Number(data.delay);

    if (Number(data.amount) <= 0 || Number(data.step) < 0 || Number(data.delay) < 0) {
        Notify.failure(`❌ Invalid range entered`);
    } else {
        const promises = [];
        for (let i = 1; i <= Number(data.amount); i += 1) {
            const promise = createPromise(i, delayCounter)
                .then(({ position, delay }) => {
                    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
                })
                .catch(({ position, delay }) => {
                    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
                });

            promises.push(promise);
            delayCounter += Number(data.step);
        }

        Promise.all(promises).finally(() => {
            submitButton.disabled = false;
        })
    }
}


function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay });
            } else {
                reject({ position, delay });
            }
        }, delay)
    );
}