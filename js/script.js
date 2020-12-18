// Wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    // Global Variables
    const nameField = document.querySelector('#name');
    const nameHint = document.querySelector('#name-hint');
    const emailField = document.querySelector('#email');
    const emailHint= document.querySelector('#email-hint');
    const otherJobField = document.querySelector('#other-job-role');
    const jobRole = document.querySelector('#title');
    const shirtColor = document.querySelector('#color');
    const shirtDesign = document.querySelector('#design');
    const activities = document.querySelector('#activities');
    const activitiesHint = document.querySelector('#activities-hint');
    const activitiesCheckboxes = document.querySelectorAll('#activities input[type="checkbox"]');
    const totalCost = document.querySelector('#activities-cost');
    const paymentMethod = document.querySelector('#payment');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');
    const form = document.querySelector('form');
    const cardNumber = document.querySelector('#cc-num');
    const cardNumberHint = document.querySelector('#cc-hint');
    const zipCode = document.querySelector('#zip');
    const zipHint = document.querySelector('#zip-hint');
    const cvv = document.querySelector('#cvv');
    const cvvHint = document.querySelector('#cvv-hint');


    // Set focus on the name field on page load.
    nameField.focus();
    // nameField.classList.add('focus');


    // Job Role Logic

    // hide the other job role input by default and show it if other job has been selected
    otherJobField.style.display = 'none';
    
    jobRole.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            otherJobField.style.display = 'inherit';
        } else {
            otherJobField.style.display = 'none';
        }
    });

    // Shirt Section logic

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
    
    // Activities section logic starts here

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
        
    });

    // Payment section logic starts here

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

    // Form validation logic starts here

    // Name field validator function
    function checkName(name) {
        const regex = /^\s?$/;
        return regex.test(name)
    }
        
    // Email field validator functions (check for empty string and for format)
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

    // On submit, calls all the validator functions and show error messages while preventing the submit of the form
    form.addEventListener('submit', (e) => {

        if (!checkName(nameField.value)) {
            nameHint.style.display = 'none';
        }   else {
            nameHint.style.display = 'inherit';
            e.preventDefault();
        }

        if (checkEmailEmpty(emailField.value)) {
            emailHint.style.display = 'inherit';
            emailHint.textContent = 'Email field cannot be blank';
            e.preventDefault();
        } else if ( !checkEmailFormat(emailField.value) ) {
            emailHint.style.display = 'inherit';
            emailHint.textContent = 'Email address must be formatted correctly';
            e.preventDefault();
        } else {
            emailHint.style.display = 'none';
        }

        
        if (checkActivites(activitiesCheckboxes)) {
            activitiesHint.style.display = 'none';
        } else {
            activitiesHint.style.display = 'inherit';
            e.preventDefault();
        }

        // Convert the payment method HTMl collection into an array and only validate fields if credit-card is selected
        Array.from(paymentMethod.options).forEach(function(option) {
            if (option.value === 'credit-card') {
                if (checkCreditCard({cardnumber: cardNumber.value})) {
                    cardNumberHint.style.display = 'none';
                } else {
                    cardNumberHint.style.display = 'inherit';
                    e.preventDefault();
                }
    
                if (checkCreditCard({zipcode: zipCode.value})) {
                    zipHint.style.display = 'none';
                } else {
                    zipHint.style.display = 'inherit';
                    e.preventDefault();
                }
    
                if (checkCreditCard({cvv: cvv.value})) {
                    cvvHint.style.display = 'none';
                } else {
                    cvvHint.style.display = 'inherit';
                    e.preventDefault();
                }
            }
        })

    });

});
