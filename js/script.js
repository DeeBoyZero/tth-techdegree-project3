// Wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
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

    // user for credit card validation
    const cardNumber = document.querySelector('#cc-num');
    const cardNumberHint = document.querySelector('#cc-hint');
    const zipCode = document.querySelector('#zip');
    const zipHint = document.querySelector('#zip-hint');
    const ccv = document.querySelector('#cvv');
    const ccvHint = document.querySelector('#cvv-hint');


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
    paymentMethod.options[0].selected = true;
    paymentMethod.addEventListener('change', (e) => {

        // Convert the HTML collection to an array-like and Iterate through payment select options to show and hide fields as needed
        Array.from(e.target.options).forEach(function(option) {
            let option_value = option.value;
            if (option.selected) {
                showPaymentField(option_value);
            }
            if (!option.selected) {
                hidePaymentField(option_value);
            }
        })
    });

    // Form validation logic starts here

    // Name field validator function
    function checkName(name) {
        const regex = /^\s?$/;
        return regex.test(name)
    }
        
    // Email field validator function ( check for empty string and for format)
    function checkEmail(email) {
        const regexEmpty = /^\s?$/;
        const regexFormat = /^\S+@\S+\.com$/;

        if ( regexEmpty.test(email) ) {
            emailHint.textContent = 'Email field cannot be blank';
        } else if ( !regexFormat.test(email) ) {
            emailHint.textContent = 'Email address must be formatted correctly';
        } else {
            return false;
        }
        return true;
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

    // Validate payment information of credit card

    function checkCreditCard(){

    }

    form.addEventListener('submit', (e) => {
        
        if (!checkEmail(emailField.value)) {
            emailHint.style.display = 'none';
        } else {
            emailHint.style.display = 'inherit';
            e.preventDefault();
        }

        if (!checkName(nameField.value)) {
            nameHint.style.display = 'none';
        }   else {
            nameHint.style.display = 'inherit';
            e.preventDefault();
        }
        
        if (checkActivites(activitiesCheckboxes)) {
            activitiesHint.style.display = 'none';
        } else {
            activitiesHint.style.display = 'inherit';
            e.preventDefault();
        }

        if (paymentMethod.options[0].selected) {
            
            if ( /^\d{13,16}$/.test(cardNumber.value) ) {
                cardNumberHint.style.display = 'none';
            } else {
                cardNumberHint.style.display = 'inherit';
                e.preventDefault();
            }

            if ( /^\d{5}$/.test(zipCode.value)) {
                zipHint.style.display = 'none';
            } else {
                zipHint.style.display = 'inherit';
                e.preventDefault();
            }

            if ( /^\d{3}$/.test(ccv.value)) {
                ccvHint.style.display = 'none';
            } else {
                ccvHint.style.display = 'inherit';
                e.preventDefault();
            }

        }


    });


});
