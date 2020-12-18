# Team Treehouse FSJS unit 3 project
## by Mathieu Desilets

## A simple form validation app

### Techno used
- HTML
- CSS
- Javascript

### Extra credit informations

1. Prevent users from registering for conflicting activities
```
for ( let i = 0; i< activitiesCheckboxes.length; i++ ) {
    if ( activitiesCheckboxes[i].dataset.dayAndTime === e.target.dataset.dayAndTime) {
        if ( !e.target.checked ) {
            activitiesCheckboxes[i].disabled = false;
            activitiesCheckboxes[i].parentElement.classList.remove('disabled');
        } else {
            activitiesCheckboxes[i].disabled = true;
            activitiesCheckboxes[i].parentElement.classList.add('disabled');
        }
        e.target.disabled = false;
        e.target.parentElement.classList.remove('disabled');
    }
}
```
2. Real-time error message has been configured on the credit card number field. It validates the input with a keyup  listener. It adds and remove class as needed and hide or show the hint message.
```
cardNumber.addEventListener('keyup', (e) => {
    if (checkCreditCard({cardnumber: cardNumber.value})) {
        e.target.parentElement.classList.add('valid');
        e.target.parentElement.classList.remove('not-valid');
        e.target.parentElement.lastElementChild.style.display = 'none';
    } else {
        e.target.parentElement.classList.add('not-valid');
        e.target.parentElement.classList.remove('valid');
        e.target.parentElement.lastElementChild.style.display = 'inherit';
    }
}); 
```

3. Conditional error message has been set on the email field. The content of the error message will depend on the result of the field validation. **If field is blank** : *Email field cannot be blank*. **If invalid format** : *Email address must be formatted correctly*.
```
if (checkEmailEmpty(emailField.value)) {
    emailHint.textContent = 'Email field cannot be blank';
    addNotValidClass(emailField, e);
} else if ( !checkEmailFormat(emailField.value) ) {
    emailHint.textContent = 'Email address must be formatted correctly';
    addNotValidClass(emailField, e);
} else {
    addValidClass(emailField);
}
```