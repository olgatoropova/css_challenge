const creditCardElement = document.querySelector('.credit-card__wrapper');
const cardNumberInput = document.querySelector('input[name="card-number"]');
const cvvInput = document.querySelector('input[name="cvv"]');

const firstNumberToType = {
    3: "american",
    4: "visa",
    5: "mastercard",
    6: "discover"
}

cardNumberInput.addEventListener('blur', (e) => {
    const cardNumber = cardNumberInput.value;
    const cardType = firstNumberToType[cardNumber[0]];
    creditCardElement.classList = "";
    creditCardElement.classList.add('credit-card__wrapper');
    creditCardElement.classList.add(cardType);
});

cvvInput.addEventListener('focus', (e) => {
    creditCardElement.classList.add('flip');
});

cvvInput.addEventListener('blur', (e) => {
    creditCardElement.classList.remove('flip');
});