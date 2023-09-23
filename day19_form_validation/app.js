const fields = document.querySelectorAll('.field');
const passwordInput = document.querySelector('input[name="password"]');
const confirmPasswordInput = document.querySelector('input[name="confirm-password"]');
const showPasswordButton = document.querySelector('input[name="password"] ~ .show-hide');
const showConfirmPasswordButton = document.querySelector('input[name="confirm-password"] ~ .show-hide');

const showHidePassword = (event, input, field) => {
    event.preventDefault();
    
    const currentType = input.type;
    if (currentType === "text") {
        input.type = "password";
    } else {
        input.type = "text";
    }
    field.classList.toggle('show');
} 

showPasswordButton.addEventListener('click', (e) => {
    showHidePassword(e, passwordInput, fields[2]);
});

showConfirmPasswordButton.addEventListener('click', (e) => {
    showHidePassword(e, confirmPasswordInput, fields[3]);
});

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const nameToConfigMap = {
    name: {
        validator: (value) => !!value,
        err: 'A name is required.'
    },
    email: {
        validator: validateEmail,
        err: 'Email is not valid.'
    },
    password: {
        validator: (value) => !!value,
        err: 'A password is required'
    },
    "confirm-password": {
        validator: (value) => value === passwordInput.value,
        err: 'Password must match'
    }
}

fields.forEach((field) => {
    const children = field.childNodes;
    const input = children[1];
    input.addEventListener('blur', (e) => {
        const {name, value} = e.target;
        const config = nameToConfigMap[name];

        const successElement = field.querySelector('div.success');
        const errorElement = field.querySelector('div.error');

        if (config.validator(value)) {
            successElement.innerHTML = '<img src="images/success.svg" alt="Success" />';
            errorElement.innerHTML = '';
        } else {
            successElement.innerHTML = '';
            errorElement.innerHTML = `<img src="images/error.svg" alt="Error" />${config.err}`
        }

    });
});