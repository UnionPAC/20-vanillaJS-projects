const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

// Show input error message
showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}


// Show success outline
showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid 

checkEmail = (email) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(email.value.trim())) {
        showSuccess(email);
    } else {
        showError(email, 'Please enter a valid email')
    }
}

// Check required fields

checkRequired = (inputArr) => {
    inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
    } else {
        showSuccess(input);
    }
    });
}

// Get Field Name

getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Check Input Length

checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} chacters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} can't be more than ${max} chacters`);
    } else {
        showSuccess(input);
    }
}

// Check if passwords match

checkPassMatch = (input1, input2) => {
 if (input1.value !== input2.value) {
     showError(input2, 'Passwords do not match');
 } 
}

// Event Listeners

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let fields = [username, email, password, confirmPassword];

    checkRequired(fields);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPassMatch(password, confirmPassword)

    /* if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, 'Please enter a password');
    } else {
        showSuccess(password);
    }

    if (confirmPassword.value === '') {
        showError(confirmPassword, 'Please re-enter password')
    } */
});