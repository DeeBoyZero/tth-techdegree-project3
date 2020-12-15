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
        
        if ( e.target.value === "js puns" ) {
            
        }
    });


});



