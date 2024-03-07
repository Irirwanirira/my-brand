var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toggleNavBar, baseUrl, successMsgPop, } from "../../modules/helperFunction.js";
const navBar = document.getElementById("nav_list");
const menuBtn = document.getElementById("menu_btn");
menuBtn === null || menuBtn === void 0 ? void 0 : menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar === null || navBar === void 0 ? void 0 : navBar.addEventListener("click", () => toggleNavBar(navBar));
const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const register = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const passwordInput = document.getElementById("registerPassword");
    const registerErr = document.getElementById("registerError");
    const name = nameInput === null || nameInput === void 0 ? void 0 : nameInput.value;
    const email = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value;
    const password = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value;
    try {
        e.preventDefault();
        const response = yield fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, password: password }),
        });
        const data = yield response.json();
        if (!response.ok) {
            successMsgPop(data.message);
            return;
        }
        successMsgPop("user created succesfully");
        window.location.href = './loginpage.html';
    }
    catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
});
const login = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const ErrorMsg = document.getElementById("errorMessage");
    const loginEmail = email === null || email === void 0 ? void 0 : email.value;
    const loginPassword = password === null || password === void 0 ? void 0 : password.value;
    try {
        const response = yield fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });
        const data = yield response.json();
        if (!response.ok) {
            ErrorMsg.innerText = data.message;
            ErrorMsg.style.color = "red";
            ErrorMsg.style.textAlign = "center";
            return;
        }
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("loggedInUser", JSON.stringify(data.data.user));
        if (data.data.user.role === "admin") {
            window.location.href = "../dashboard/dashboard.html";
        }
        if (data.data.user.role === "user") {
            // window.location.href = "../dashboard/dashboard.html";
            console.log(' user dashboard under development');
            return;
        }
    }
    catch (error) {
        console.error("Login Error:", error);
        ErrorMsg.innerText = error.message;
    }
});
window.addEventListener("DOMContentLoaded", function () {
    if (registerForm) {
        registerForm.addEventListener("submit", register);
    }
    if (loginForm) {
        loginForm.addEventListener("submit", login);
    }
});
