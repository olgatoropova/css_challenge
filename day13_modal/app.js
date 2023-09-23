const openLink = document.querySelector('#elgatoKeyLights');
const closeButton = document.querySelector('.modal .close');
const overlayElement = document.querySelector('.overlay');


openLink.addEventListener('click', (e) => {
    e.preventDefault();
    overlayElement.classList.add('showing');
});

closeButton.addEventListener('click', () => {
    overlayElement.classList.remove('showing');
});