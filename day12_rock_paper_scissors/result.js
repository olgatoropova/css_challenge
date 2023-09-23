const body = document.querySelector('body');
const playAgain = document.querySelector('button');
const userImage = document.querySelector('.your-pick > img')
const computerImage = document.querySelector('.computer-pick > img')
const youWinText = document.querySelector('.you-win');
const computerWinsText = document.querySelector('.computer-win');
const urlParams = new URLSearchParams(window.location.search)
const userChoice = parseInt(urlParams.get('user'));
const computerChoice = parseInt(urlParams.get('computer'));


const choiceToImageMap = {
    0: {image: "rock.png", alt: "Rock"},
    1: {image: "paper.png", alt: "Paper"},
    2: {image: "scissors.png", alt: "Scissors"},
}

playAgain.addEventListener('click', () => {
    window.location.href = "index.html"
});

userImage.src = `images/${choiceToImageMap[userChoice].image}`;
userImage.alt = `${choiceToImageMap[userChoice].alt}`;

computerImage.src = `images/${choiceToImageMap[computerChoice].image}`;
computerImage.alt = `${choiceToImageMap[computerChoice].alt}`;

const tieUpdateUI = () => {
    youWinText.innerText = "tie"
    computerWinsText.innerText = "tie";
}

const youWinUpdateUI = () => {
    body.classList.add("you-win");
    youWinText.innerText = "you win";
}

const computerWinsUpdateUI = () => {
    body.classList.add("computer-win");
    computerWinsText.innerText = "computer wins";
}


const checkWinner = () => {
    if (userChoice === computerChoice) {
        tieUpdateUI();
        return;
    }

    switch (userChoice) {
        case 0: // rock
            if (computerChoice == 2) { // scissors
                youWinUpdateUI();
            } else { // paper
                computerWinsUpdateUI();
            }
            return;
        case 1: // paper
            if (computerChoice == 0) { // rock
                youWinUpdateUI();
            } else { // scissors
                computerWinsUpdateUI();
            }
            return;
        case 2: // scissors
            if (computerChoice == 1) { // paper
                youWinUpdateUI();
            } else { // rock
                computerWinsUpdateUI();
            }
            return;

    }
}
checkWinner();
