// Wait for the DOM content to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
    const nameField = document.querySelector('#name');
    const otherJobField = document.querySelector('#other-job-role');
    const jobRole = document.querySelector('#title');
    const shirtColor = document.querySelector('#color');
    const shirtDesign = document.querySelector('#design');

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


});



