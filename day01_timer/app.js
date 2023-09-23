const settingsButton = document.querySelector('.settings');
const startButton = document.querySelector('.start');
const seconds = document.querySelector('.seconds > input[type=text]');
const minutes = document.querySelector('.minutes > input[type=text]');
const ring = document.querySelector('.ring');

let startTime = 0;
let timer = null;
let running = false;
let originalMinutes = 0;
let originalSeconds = 0;

startButton.addEventListener('click', () => {
    if (!running) {
        startTimer();
    } else {
        pauseTimer();
    }
});

settingsButton.addEventListener('click', () => {
    if (running) {
        pauseTimer();
    }
    seconds.disabled = false;
    minutes.disabled = false;
});

const validateTimeInput = (e) => {
    const validatedInput = e.target.value
                            .replace('/[^0-9]/g', '')
                            .substring(0,2);
    e.target.value = validatedInput;
}

seconds.addEventListener('keyup', validateTimeInput);
minutes.addEventListener('keyup', validateTimeInput);

const startTimer = () => {
    running = true;
    startButton.innerText = 'stop';
    
    startTime = Date.now();
    
    const secondsValue = parseInt(seconds.value);
    const minutesValue = parseInt(minutes.value);
    const totalSeconds = secondsValue + minutesValue * 60;
    if (totalSeconds <= 0) {
        finishTimer();
    }
 
    timer = setInterval(() => {
        const currentTime = Date.now();
        const diff = currentTime - startTime;
        const totalSecondsLeft = totalSeconds - Math.floor(diff / 1000);
        console.log("totalSecondsLeft=" + totalSecondsLeft);
        
        const minutesLeft = Math.floor(totalSecondsLeft / 60);
        const secondsLeft = totalSecondsLeft - minutesLeft * 60;

        seconds.value = padNumber(secondsLeft);
        minutes.value = padNumber(minutesLeft);

        if (totalSecondsLeft <= 0) {
            finishTimer();
        }
    }, 1000);
}

const pauseTimer = () => {
    running = false;
    startTime = 0;
    clearInterval(timer);
    startButton.innerText = 'start';
}

const padNumber = (number) => {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

const finishTimer = () => {
    clearInterval(timer);
    ring.classList.add('ending');
    setTimeout(() => {
         alert("Time's up!");
         resetTimer();
    }, 0);
}

const resetTimer = () => {
    clearInterval(timer);
    seconds.value = originalSeconds;
    minutes.value = originalMinutes;
    startButton.innerText = "start";
    ring.classList.remove('ending');
    running = false;
}

const setOriginalTime = () => {
    originalSeconds = padNumber(parseInt(seconds.value));
    originalMinutes = padNumber(parseInt(minutes.value));
}

setOriginalTime();
resetTimer();