const buttons = [...document.querySelectorAll('li > button')];

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        computerChoice = Math.floor(Math.random() * 3);
        console.log(computerChoice);
        window.location.href = `result.html?user=${i}&computer=${computerChoice}`;
    });
});
