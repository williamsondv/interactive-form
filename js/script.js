const titleSelect = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const colorSelect = document.getElementById('color');
const shirtDesigns = document.getElementById('design');
const activitiesFieldset = document.getElementById('activities');
const paymentMethod = document.getElementById('payment');
let totalCost = 0;

//set focus on first text field on load
document.getElementById('name').focus();

//hide other-job-role text field
otherJobRole.style.display = "none";

//add eventlistener to "Job Role" select element to display "other-job-role" when "other" is selected
titleSelect.addEventListener("change", function(event){
    if(titleSelect.value == 'other') {
        otherJobRole.style.display = "inline";
    } else if (titleSelect.value != 'other') {
        otherJobRole.style.display = "none";
    }
});

//disable the "color" select element
colorSelect.disabled = true;

//add eventlistener to "Design Theme" select element to cycle available colors
shirtDesigns.addEventListener("change", function(event){
    const options = colorSelect.children;
    colorSelect.disabled = false;
    if(shirtDesigns.value == 'js puns'){
        colorSelect.selectedIndex = "1";
        for(let i = 1; i < 4; i++) {
            options[i].style.display = "inline";
            options[i + 3].style.display = "none"
        }
    } else if(shirtDesigns.value == 'heart js') {
        colorSelect.selectedIndex = "4";
        for(let i = 1; i < 4; i++) {
            options[i + 3].style.display = "inline";
            options[i].style.display = "none"
        }
    }
});

//add eventlistener to "Register for Activites" fieldset to display total cost
activitiesFieldset.addEventListener("change", function(event){
    if(event.target.checked) {
        totalCost += parseInt(event.target.getAttribute("data-cost"));
        document.getElementById("activities-cost").innerHTML = `Total: $${totalCost}`;
    } else {
        totalCost -= parseInt(event.target.getAttribute("data-cost"));
        document.getElementById("activities-cost").innerHTML = `Total: $${totalCost}`;
    }
});

//set initial value to "Payment Info" select element and hide unselected elements
paymentMethod.value = 'credit-card';
document.getElementById('bitcoin').style.display = 'none';
document.getElementById('paypal').style.display = 'none';

//add eventlistener to "Payment Info" select element to display appropriate items
paymentMethod.addEventListener("change", function(event){
    if(event.target.value == 'credit-card') {
        document.getElementById('bitcoin').style.display = 'none';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('credit-card').style.display = 'block';
    } else if (event.target.value == 'bitcoin') {
        document.getElementById('bitcoin').style.display = 'block';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('credit-card').style.display = 'none';
    } else if (event.target.value == 'paypal') {
        document.getElementById('bitcoin').style.display = 'none';
        document.getElementById('paypal').style.display = 'block';
        document.getElementById('credit-card').style.display = 'none';
    }
});

//form validation
document.querySelector('form').addEventListener("submit", function(event){
    nameVerify();
    emailValidate();
    validateActivities();
    validateCreditCard();
    validateCVV();
    validateZipCode();

    
    if(
    nameVerify() &&
    emailValidate() &&
    validateActivities() &&
    validateCreditCard() &&
    validateCVV() &&
    validateZipCode()
    ) {
        
    } else {
        event.preventDefault();
    }
});

//verify that name is not empty or blank
function nameVerify() {
    if (document.getElementById('name').value == null || document.getElementById('name').value == "") {
        let errorMessage = document.createElement('DIV');
        if(!document.getElementById('name-error')){
        errorMessage.innerHTML = `<p id="name-error">The Name Field Must Not Be Empty. Please Try Again.</p>`;
        document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
        addNotValid(document.getElementById('name'))
        } 
        return false;
    } else {
        if(document.getElementById('name-error')){
            addValid(document.getElementById('name'))
            document.getElementById('name-error').remove();
        }
        return true;
    }
}

//validate email address
function emailValidate() {
    let email = document.getElementById('email');
    let regEx = /^[A-Za-z-1-9]+@[A-Za-z-1-9]+.com$/;
    if(!regEx.test(email.value)) {
        let errorMessage = document.createElement('DIV');
        if(!document.getElementById('email-error')){
        errorMessage.innerHTML = `<p id="email-error">The Email Field Must Not Be Empty and Must Be Formatted as "example@example.com". Please Try Again.</p>`;
        document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
        addNotValid(email);
        }
        return false;
    } else {
        if(document.getElementById('email-error')){
            addValid(email);
            document.getElementById('email-error').remove();
        }
        return true;
        }
}

//validate that at least one activity has been selected
function validateActivities() {
    let inputs = document.querySelectorAll('[type="checkbox"]');
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].checked) {
            if(document.getElementById("activities-error")) {
                document.getElementById("activities-error").remove();
            }
            addValid(activitiesFieldset.firstElementChild);
            return true;
        }
    }
    let errorMessage = document.createElement('DIV');
    if(!document.getElementById('activities-error')){
        addNotValid(activitiesFieldset.firstElementChild);
        errorMessage.innerHTML = `<p id="activities-error">At Least One Activity Must Be Selected. Please Try Again.</p>`;
        document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
    } 
    return false;

}

//validate credit card input at 13-16 digits
function validateCreditCard() {
   if(document.getElementById("payment").options.selectedIndex == '1'){
        let creditCard = document.getElementById('cc-num');
        let regEx = /^[0-9]{13,16}$/;
    if(!regEx.test(creditCard.value)) {
        let errorMessage = document.createElement('DIV');
        if(!document.getElementById('credit-error')){
        errorMessage.innerHTML = `<p id="credit-error">The Credit Card Number Must be 13 to 16 Numbers Long and Contain No Special Characters. Please Try Again.</p>`;
        document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
        addNotValid(creditCard);
        }
        return false;
    } else {
        if(document.getElementById('credit-error')){
            addValid(creditCard);
            document.getElementById('credit-error').remove();
        }
        return true;
        }
    } return true;
}

//validate  CVV
function validateCVV() {
    if(document.getElementById("payment").options.selectedIndex == '1'){
        let cvv = document.getElementById('cvv');
        let regEx = /^[0-9]{3}$/;
    if(!regEx.test(cvv.value)) {
        let errorMessage = document.createElement('DIV');
        if(!document.getElementById('cvv-error')){
        errorMessage.innerHTML = `<p id="cvv-error">The CVV Number Must be 3 Numbers Long and Contain No Special Characters. Please Try Again.</p>`;
        document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
        addNotValid(cvv);
        }
        return false;
    } else {
        if(document.getElementById('cvv-error')){
            addValid(cvv);
            document.getElementById('cvv-error').remove();
        }
        return true;
        }
    } return true;
}

//validate Zip Code
function validateZipCode() {
    if(document.getElementById("payment").options.selectedIndex == '1'){
        let zip = document.getElementById('zip');
        let regEx = /^[0-9]{5}$/;
    if(!regEx.test(zip.value)) {
        let errorMessage = document.createElement('DIV');
        if(!document.getElementById('zip-error')){
            if(zip.value == "" || zip.value == "null"){
                errorMessage.innerHTML = `<p id="zip-error">The Zip Code Must Not Be Empty. Please Try Again.</p>`;
                document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
                addNotValid(zip);
            } else {
                errorMessage.innerHTML = `<p id="zip-error">The Zip Code Must Be 5 Numbers Long and Contain No Special Characters. Please Try Again.</p>`;
                document.getElementsByTagName('form')[0].insertBefore(errorMessage, document.getElementsByTagName('button')[0]);
                addNotValid(zip);
            }
        }
        return false;
    } else {
        if(document.getElementById('zip-error')){
            addValid(zip);
            document.getElementById('zip-error').remove();
        }
        return true;
        }
    } return true;
}

//add .focus class on focus event for checkboxes
function addFocusCheckboxes() {
    let checkboxes = document.querySelectorAll("[type='checkbox']");

    for(let i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('focus', function(){
        checkboxes[i].parentElement.className = "focus"
    });
    }
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].addEventListener('blur', function(){
            checkboxes[i].parentElement.className = "none"
        });
    }
}


//call addFocusCheckboxes
addFocusCheckboxes();

//function to add .not-valid class and display hints
function addNotValid(element) {
        element.parentElement.classList.remove("valid");
        element.parentElement.classList.add("not-valid");
        element.parentElement.lastElementChild.style.display = "block";
}

//function to remove .not-valid class and hide hints
function addValid(element) {
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
}

//function to addEventListener to checkboxes to disable conflicting events (time)
function disableConflicting() {
    let inputs = document.querySelectorAll('[type="checkbox"]');
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('click', function(event){
            for(let j = 0; j < inputs.length; j++) {
                if(inputs[i].getAttribute("data-day-and-time") == inputs[j].getAttribute("data-day-and-time")){
                    if(inputs[i] !== inputs[j] && inputs[i].checked){
                        inputs[j].parentElement.classList.add("disabled");
                        inputs[j].disabled = "true";
                    } else if(!inputs[i].checked) {
                        if(inputs[j].disabled){
                            inputs[j].parentElement.classList.remove("disabled");
                            inputs[j].removeAttribute("disabled");
                            }
                    }
                }
            }
        });
    }
}

//call disableConflicting()
disableConflicting()

//field event listeners for realtime feedback
document.getElementById('zip').addEventListener("keyup", function(event){
    validateZipCode();
});

document.getElementById('cvv').addEventListener("keyup", function(event){
    validateCVV();
});

document.getElementById('cc-num').addEventListener("keyup", function(event){
    validateCreditCard();
});

document.getElementById('email').addEventListener("keyup", function(event){
    emailValidate();
});

document.getElementById('name').addEventListener("keyup", function(event){
    nameVerify();
});