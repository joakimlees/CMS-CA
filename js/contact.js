const form = document.querySelector("#contact-form");

const email = form.email;

const emailError = document.querySelector("#email-error-message-fieldInput");

const successMessage = document.querySelector("#success-message");

/*
Function for creating error messages to the input fields.
The first parameter div element which display the message.
the second select the input field and adds the error-class to it.
the third is the message/text.
*/
function createError(errorBox, inputField, errorText) {
  errorBox.innerHTML = errorText;
  errorBox.className = "error-message";
  inputField.className = "error-class";
}

function clearErrorMessage() {
  /*
  When the function run, it start with setting successMessage innerHTML to a emty string.
   */
  successMessage.innerHTML = "";
  /*
selecting all html elements. looping through them. If any of the elements have an id which include "fieldInput". Remove their class name and innerHTML
*/
  document.querySelectorAll("*").forEach((htmlElement) => {
    if (htmlElement.id.includes("fieldInput")) {
      htmlElement.className = "";
      htmlElement.innerHTML = "";
    }
  });
}

/*
Checking if the parameter(email) past in matches the pattern. If it do, it returns true.
*/
function emailValidator(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatches = pattern.test(email);
  return patternMatches;
}

/*
Validates the form/inputs. using the emailValidator functions. 
calling on the createErrorMessage function if "they are not".
If the input is "true"(using the "Check" variables). A Success Message is shown.
(In this case, it only validates one input field - email. But the function will work the same if more inputs are added as well)).
*/
function validateInput(event) {
  event.preventDefault();
  clearErrorMessage();

  let emailCheck = true;

  if (!emailValidator(email.value)) {
    emailCheck = false;
    createError(emailError, email, "Please enter a valid email-address");
  }

  if (emailCheck) {
    successMessage.innerHTML = "Thanks for your message! We will get back to you shortly";
    form.reset();
  }
}

form.addEventListener("submit", validateInput);
