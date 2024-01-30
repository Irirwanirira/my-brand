import { toggleNavBar, saveLocally } from "./modules/helperFunctions.js";

// const navContainer = document.querySelector('.nav_bar')
const navBar = document.getElementById("nav_list");
const menuBtn = document.getElementById("menu_btn");
const form = document.querySelector("#form");

const nameInputField = document.getElementById("name_input");
const emailInputField = document.getElementById("email_input");
const messageField = document.getElementById("message_text");

menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar.addEventListener("click", () => toggleNavBar(navBar));

let messages = [];
let message;

function store() {
  let date = new Date();
  let time = new Date();
  if (nameInputField.value && emailInputField.value && messageField.value) {
    message = {
      id: messages.length + 1,
      names: nameInputField.value,
      email: emailInputField.value,
      message: messageField.value,
      Date: date.toDateString(),
      Time: time.toTimeString(),
    };
    messages.unshift(message);
    saveLocally(messages, "messages");
  } else {
    console.log("Please fill in all the fields.");
  }
}

function clearInput() {
  nameInputField.value = "";
  emailInputField.value = "";
  messageField.value = "";
}

function validateContactForm(e) {
  e.preventDefault();

  let name = nameInputField.value;
  let email = emailInputField.value;
  let message = messageField.value;

  const nameError = document.querySelector("#nameError");
  const emailError = document.querySelector("#emailError");
  const messageError = document.querySelector("#messageError");

  const validForm = document.getElementById("validForm");

  if (name.length < 2) {
    nameError.style.color = "red";
    nameError.innerText = "Please enter your name";
    return false;
  } else {
    nameError.style.display = "none";
  }

  if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.style.display = "none";
  } else {
    emailError.style.color = "red";
    emailError.innerText = "Please enter a valid email";
    return false;
  }

  if (!message.length) {
    messageError.style.color = "red";
    messageError.innerText = "Please enter your message";
    return false;
  } else {
    messageError.style.display = "none";
  }
  validForm.innerText = "Your message has been sent";
  validForm.style.cssText = `
        display: block; 
        color: green;
        text-align: center;
        margin: 0 auto;
        padding: 10px;
        animation: fadeOut 5s ease-in-out forwards;
        box-shadow:  1px 1px 1px 1px; `;
  store();
  clearInput();
}
form.addEventListener("submit", validateContactForm);
