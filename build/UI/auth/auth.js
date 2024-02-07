import { saveLocally, retrieveFromStore } from "../../modules/helperFunction.js";
const navBar = document.getElementById('nav_list');
const menuBtn = document.getElementById('menu_btn');
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const nameInput = document.getElementById("registerName");
const emailInput = document.getElementById("registerEmail");
const passwordInput = document.getElementById("registerPassword");
function register(e) {
    e.preventDefault();
    const name = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value;
    const email = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value;
    const password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }
    let newUser;
    const storedUsers = retrieveFromStore("users") || [];
    const userExist = storedUsers.some((u) => u.email === email);
    if (userExist) {
        alert("User already exist. Please login");
        return;
    }
    else {
        newUser = {
            username: name,
            email: email,
            password: password
        };
        storedUsers.push(newUser);
        saveLocally("users", storedUsers);
        alert("User created successfully. Please login");
    }
    window.location.href = "../auth/loginpage.html";
}
function login(e) {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const loginEmail = email === null || email === void 0 ? void 0 : email.value;
    const loginPassword = password === null || password === void 0 ? void 0 : password.value;
    const storedCredentials = retrieveFromStore('users') || [];
    const user = storedCredentials.find((u) => u.email === loginEmail && u.password === loginPassword);
    if (user) {
        saveLocally("loggedInUser", user);
        window.location.href = "../dashboard/dashboard.html";
    }
    else {
        alert("Invalid credential. Please try again or Sign Up.");
    }
}
window.addEventListener("DOMContentLoaded", function () {
    if (registerForm) {
        registerForm.addEventListener("submit", register);
    }
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
