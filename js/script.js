// Wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const nameField = document.querySelector('#name');
    const otherJobField = document.querySelector('#other-job-role');
    const jobRole = document.querySelector('#title');
    const shirtColor = document.querySelector('#color');
    const shirtDesign = document.querySelector('#design');
    const activities = document.querySelector('#activities');
    const totalCost = document.querySelector('#activities-cost');
    const paymentMethod = document.querySelector('#payment');
    const paypalDiv = document.querySelector('#paypal');
    const bitcoinDiv = document.querySelector('#bitcoin');

    // Set focus on the name field on page load.
    nameField.focus();

    // Job Role Logic

    // hide the other job role input by default and show it if other job has been selected
    otherJobField.style.display = 'none';
    
    jobRole.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            otherJobField.style.display = '';
        } else {
            otherJobField.style.display = 'none';
        }
    });

    // Shirt Section logic

    // Disable the color select on load and make it available when the design has been selected
    shirtColor.disabled = true;

    shirtDesign.addEventListener('change', (e) => {
        shirtColor.disabled = false;
        // const regex = /^([a-zA-Z\s?]+)/g;
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
        document.querySelector(`#${paymentMethod}`).style.display = '';
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


});



