const body = document.querySelector('body');
const keyButtons = [... document.querySelectorAll('.key')];
const keys = keyButtons.map(keyButton => keyButton.dataset.key);
const keyToButtonMap = keyButtons.reduce((acc, cur) => {
    const curKey = cur.dataset.key;
    acc[curKey] = cur;
    return acc;
}, {});

let currentKey;

body.addEventListener('keyup', (e) => {
    checkKey(e.key); 
});

keyButtons.forEach((keyButton) => {
    keyButton.addEventListener('click', (e) => {
        const clickedKey = e.target.dataset.key;
        checkKey(clickedKey);
    })
});

const checkKey = (inputKey) => {
    console.log(inputKey);
    if (inputKey.toUpperCase() === currentKey) {
        setRandomKey();
    }
}

const setRandomKey = () => {
    if (currentKey) {
        keyToButtonMap[currentKey].classList.remove('jiggle');
    }
    const randomIndex = Math.floor(Math.random() * keys.length);
    currentKey = keys[randomIndex];
    keyToButtonMap[currentKey].classList.add('jiggle');
}

setRandomKey();