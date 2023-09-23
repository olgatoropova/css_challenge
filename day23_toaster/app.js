const toaster = document.querySelector('.toaster');
const closeButton = document.getElementById('closeToaster');
let alreadyOpen = false;

const toggleToaster = (shouldBeOpen) => {
    if (!alreadyOpen && shouldBeOpen) {
        toaster.classList.remove('collapsed');
        alreadyOpen = true;
        // close automatically after some time 
        setTimeout(() => {
            toaster.classList.add('collapsed');
        }, 20000);

    } else {
        toaster.classList.add('collapsed');
    }
}

closeButton.addEventListener('click', () => toggleToaster(false));

document.addEventListener('mouseout', (e) => {
    console.log('mouseout');
    // if user goes to url bar to exit website
    if (!e.toElement && !e.relatedTarget) {
        toggleToaster(true);
    }
});