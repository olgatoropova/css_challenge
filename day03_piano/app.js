const whiteKeys = [... document.querySelectorAll('path.white-keys')];
const blackKeys = [... document.querySelectorAll('path.black-keys')];
const keys = [... whiteKeys, ...blackKeys];

let audio;

keys.forEach( (key, i) => {
    key.dataset.index = ++i;
    key.addEventListener('click', (e) => {
        playSound(e.target.dataset.index);
    });
});

const playSound = (index) => {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    }
    audio = new Audio(`audio/key-${index}.mp3`);
    audio.play();
}