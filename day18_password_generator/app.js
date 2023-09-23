const charachterSkipCodes = [8, 11, 14]; // skip i, l, o

const LOWER_CASE = [...Array(26)].map((_, i) => String.fromCharCode(i + 97))
    .filter((_, i) => !charachterSkipCodes.includes(i));

    //[...Array(26)].map((_, i) => String.fromCharCode(i + 65));
const UPPER_CASE = LOWER_CASE.map(letter => letter.toUpperCase());

//[...Array(10).keys()];
const NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9];
const SYMBOLS = ['@', '#', '$', '%'];
const SIMILAR_CHARS = ['i', 'l', 'o', 'I', 'L', 'O', '1', '0'];

const passwordInput = document.getElementById('password');
const inputs = [...document.querySelectorAll('input:not([type="text"])')];
const lengthInput = document.getElementById('length');
const lengthText = document.getElementById('lengthText');
const copyButton = document.querySelector('.copy');

console.log(LOWER_CASE);

const generatePassword = (length, hasSymbols, hasNumbers,
    hasLowercase, hasUppercase, excludeSimilars) => {
        const availableCharacters = [
            ...(hasSymbols ? SYMBOLS : []),
            ...(hasNumbers ? NUMBERS : []),
            ...(hasLowercase ? LOWER_CASE : []),
            ...(hasUppercase ? UPPER_CASE : []),
            ...(excludeSimilars ? [] : SIMILAR_CHARS),
        ];

        let password = "";
        if (availableCharacters.length === 0) {
            return password;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * availableCharacters.length);
            password += availableCharacters[randomIndex];
        }

        return password;
}

const updatePassword = () => {
    const length = lengthInput.value;
    const checkboxValues = inputs.slice(1).map(input => input.checked);
    const password = generatePassword(length, ...checkboxValues);
    passwordInput.value = password;
    lengthText.innerHTML = `${length}&nbsp;`;

}

updatePassword();

inputs.forEach(input => input.addEventListener('change', updatePassword));

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.classList.add('copied');
    setTimeout(() => {
        copyButton.classList.remove('copied');
    }, 3000);
})

