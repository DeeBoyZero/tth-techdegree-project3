/*************************
Treehouse Unit 3 project
Form validation
Author:  Mathieu Desilets
*************************/

// Wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    
    // Global Variables
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');
    const emailHint= document.querySelector('#email-hint');
    const otherJobField = document.querySelector('#other-job-role');
    const jobRole = document.querySelector('#title');
    const shirtColor = document.querySelector('#color');
    const shirtDesign = document.querySelector('#design');
    const activities = document.querySelector('#activities');
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
    const totalCost = document.querySelector('#activities-cost');
    const paymentMethod = document.querySelector('#payment');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');
    const form = document.querySelector('form');
    const cardNumber = document.querySelector('#cc-num');
    const zipCode = document.querySelector('#zip');
    const cvv = document.querySelector('#cvv');

    // Set focus on the name field on page load.
    nameField.focus();
 
    /*****************
    // Job Role Logic
    *****************/

    // hide the other job role input by default and show it if other job has been selected
    otherJobField.style.display = 'none';
    
    jobRole.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            otherJobField.style.display = 'inherit';
        } else {
            otherJobField.style.display = 'none';
        }
    });

    /********************** 
    // Shirt Section logic
    **********************/

    // Disable the color select on load and make it available when the design has been selected
    shirtColor.disabled = true;

    shirtDesign.addEventListener('change', (e) => {
        shirtColor.disabled = false;
        const regex = /^([^\(]+)/g

            for (let i = 1; i < shirtColor.length; i++) {
    
                if (shirtColor.options[i].dataset.theme !== e.target.value ) {
                    shirtColor.options[i].hidden = true;
                } else {
                    shirtColor.options[i].hidden = false;
                }
                let newTxt = shirtColor.options[i].text.match(regex);
                shirtColor.options[i].text= newTxt[0];
            }
            if ( e.target.value === 'js puns') {
                shirtColor.options[1].selected = true;
            } else if ( e.target.value === 'heart js' ) {
                shirtColor.options[4].selected = true;
            }
          
    });
    
    /************************************** 
    // Activities section logic starts here
    **************************************/

    // This variable will be used to calculate and to show the total cost of selected activities
    let total = 0;

    activities.addEventListener('change', (e) => {
       
        if (e.target.checked) {
            total += +e.target.dataset.cost;
            totalCost.textContent = `Total: $${total}`;
        } else {
            total = total - +e.target.dataset.cost;
            totalCost.textContent = `Total: $${total}`;
        }

        // EXTRA CREDIT
        // Prevent users from registering for conflicting activities
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
        
    });

    // Activities accessibility stuff - Make the focus states of the activities more obvious to all users.
    for (let i = 0; i < activitiesCheckboxes.length; i++) {
        activitiesCheckboxes[i].addEventListener('focus', (e) => {
            e.target.parentElement.classList.add('focus');
        })
        activitiesCheckboxes[i].addEventListener('blur', (e) => {
            e.target.parentElement.classList.remove('focus');
        })
    }

    /***********************************
    // Payment section logic starts here
    ***********************************/

    // Function used to show only the selected payment related fields
    function showPaymentField(paymentMethod) {
        document.querySelector(`#${paymentMethod}`).style.display = 'inherit';
    }
    // Function used to hide other payment method related fields
    function hidePaymentField(paymentMethod) {
        document.querySelector(`#${paymentMethod}`).style.display = 'none';
    }

    // Hide paypal and bitcoin display on load
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
    // Remove first select option as it is not used (select payment method)
    paymentMethod.remove(0);
    // Select credit card as payment option on load
    Array.from(paymentMethod.options).forEach(function(option) {
        if (option.value === 'credit-card') {
            option.selected = true;
        }
    })

    // EXTRA CREDIT - Real-time error message
    // Validates the credit card number as the user type it   
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

    paymentMethod.addEventListener('change', (e) => {

        // Convert the HTML collection to an array-like and Iterate through payment select options to show and hide fields as needed
        Array.from(e.target.options).forEach(function(option) {
            if (option.selected) {
                showPaymentField(option.value);
            }
            if (!option.selected) {
                hidePaymentField(option.value);
            }
        })
    });

    /***********************************
    // Form validation logic starts here
    ***********************************/

    // Name field validator function. Check if name field is empty
    function checkName(name) {
        return /^\s*$/.test(name)
    }
        
    // Email field validator functions (check for empty string and for invalid format)
    function checkEmailEmpty(email) {
        return /^\s?$/.test(email);
    }

    function checkEmailFormat(email) {
        return /^\S+@\S+\.com$/.test(email)
    }

    // Validate if at least 1 activity is checked(Using a node list returned by document.querySelectorAll)
    function checkActivites(list) {
        for ( let i = 0; i < list.length; i++ ) {
            if ( list[i].checked ) {
                return true;
            }
        }
        return false;
    }

    // Validate payment information of credit card.
    // Using named arguments so i can use 1 unique fonction for every required credit card field
    function checkCreditCard({cardnumber,zipcode,cvv} = {}) {

        if (cardnumber) {
            return /^\d{13,16}$/.test(cardnumber);
        } else if (zipcode) {
            return /^\d{5}$/.test(zipcode);
        } else if (cvv) {
            return /^\d{3}$/.test(cvv);
        }

    }

    // Validates the field and add valid class to its parent / For checkboxes, it adds the class to the fieldset
    function addValidClass(element) {

        // Verify if the element passed is a nodeList () (Ex. I get a nodeList of Checkboxes in the activity section)
        if (NodeList.prototype.isPrototypeOf(element)) {
            const lastChild = element[0].parentElement.parentElement.parentElement.lastElementChild;
            element[0].parentElement.parentElement.parentElement.classList.add('valid');
            element[0].parentElement.parentElement.parentElement.classList.remove('not-valid');
            lastChild.style.display = 'none';
        } else {
            const lastChild = element.parentElement.lastElementChild;
            element.parentElement.classList.add('valid');
            element.parentElement.classList.remove('not-valid');
            lastChild.style.display = 'none';

        }
    }

    // Validates the field and add not-valid class to its parent when it fails validation and prevent form submission / For checkboxes, it adds the class to the fieldset
    function addNotValidClass(element, event) {

        // Verify if the element passed is a nodeList () (Ex. I get a nodeList of Checkboxes in the activity section)
        if (NodeList.prototype.isPrototypeOf(element)) {
            const lastChild = element[0].parentElement.parentElement.parentElement.lastElementChild;
            element[0].parentElement.parentElement.parentElement.classList.add('not-valid');
            element[0].parentElement.parentElement.parentElement.classList.remove('valid');
            lastChild.style.display = 'inherit'
        } else {
            const lastChild = element.parentElement.lastElementChild;
            element.parentElement.classList.add('not-valid');
            element.parentElement.classList.remove('valid');
            lastChild.style.display = 'inherit'
        }
        event.preventDefault();
    }

    // On submit, calls all the validator functions and show error messages while preventing the submit of the form
    form.addEventListener('submit', (e) => {

        if (checkName(nameField.value)) {
            addNotValidClass(nameField, e);
        }   else {
            addValidClass(nameField);
        }

        // EXTRA CREDIT
        // Conditional error message, 1 for blank field and 1 for invalid format
        if (checkEmailEmpty(emailField.value)) {
            emailHint.textContent = 'Email field cannot be blank';
            addNotValidClass(emailField, e);
        } else if ( !checkEmailFormat(emailField.value) ) {
            emailHint.textContent = 'Email address must be formatted correctly';
            addNotValidClass(emailField, e);
        } else {
            addValidClass(emailField);
        }
        
        if (checkActivites(activitiesCheckboxes)) {
            addValidClass(activitiesCheckboxes, e);
        } else {
            addNotValidClass(activitiesCheckboxes, e);
        }

        // Convert the payment method HTMl collection into an array and only validate fields if credit-card is selected
        Array.from(paymentMethod.options).forEach(function(option) {
            if (option.value === 'credit-card' && option.selected) {
                if (checkCreditCard({cardnumber: cardNumber.value})) {
                    addValidClass(cardNumber, e);
                } else {
                    addNotValidClass(cardNumber, e);
                }
    
                if (checkCreditCard({zipcode: zipCode.value})) {
                    addValidClass(zipCode, e);
                } else {
                    addNotValidClass(zipCode, e);
                }
    
                if (checkCreditCard({cvv: cvv.value})) {
                    addValidClass(cvv, e);
                } else {
                    addNotValidClass(cvv, e);
                }
            }
        })
    });
});
