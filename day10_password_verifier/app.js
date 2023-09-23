const codeInputs = document.querySelectorAll('input[type=text]');
const verifyButton = document.querySelector('.verify');
const bodyElement = document.querySelector('body');

codeInputs.forEach((codeInput) => {

    codeInput.addEventListener('keyup', (e) => {
        console.log(e.key);
        if (!isNaN(e.key)) {
            if (codeInput.nextElementSibling) {
                codeInput.nextElementSibling.focus();
            } else {
                verifyButton.focus();
            }
        }
    })

});

bodyElement.addEventListener('paste', (e) => {
    e.preventDefault();
    let paste = (e.clipboardData || window.clipboardData).getData('text');
    if (!isNaN(paste)) {
        for (i = 0; i < codeInputs.length; i++) {
            codeInputs[i].value = paste.charAt(i);
        }
        verifyButton.focus();
    }
})