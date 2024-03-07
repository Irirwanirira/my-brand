import {
  toggleNavBar,
  User,
  saveLocally,
  retrieveFromStore,
  baseUrl,
  successMsgPop,
} from "../../modules/helperFunction.js";

const navBar = document.getElementById("nav_list") as HTMLUListElement | null;
const menuBtn = document.getElementById("menu_btn") as HTMLImageElement | null;
menuBtn?.addEventListener("click", () => toggleNavBar(navBar));
navBar?.addEventListener("click", () => toggleNavBar(navBar));
const loginForm = document.getElementById("login") as HTMLFormElement | null;
const registerForm = document.getElementById(
  "register"
) as HTMLFormElement | null;


const register = async (e: any) => {
    const nameInput = document.getElementById(
        "registerName"
      ) as HTMLInputElement | null;
      const emailInput = document.getElementById(
        "registerEmail"
      ) as HTMLInputElement | null;
      const passwordInput = document.getElementById(
        "registerPassword"
      ) as HTMLInputElement | null;
    const registerErr = document.getElementById("registerError") as HTMLParagraphElement
    const name = nameInput?.value;
    const email = emailInput?.value;
    const password = passwordInput?.value;

    try {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name:name, email: email, password: password}),
        });
        const data = await response.json()
      if (!response.ok) {
        successMsgPop(data.message)
        return
      }
      successMsgPop("user created succesfully")
      window.location.href = './loginpage.html'
    } catch (error) {
      console.error('Registration Error:', error);
      throw error;
    }
};

const login = async (e: any) => {
  e.preventDefault();
  const email = document.getElementById("email") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const ErrorMsg = document.getElementById(
    "errorMessage"
  ) as HTMLParagraphElement;

  const loginEmail = email?.value;
  const loginPassword = password?.value;

  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await response.json();

    if (!response.ok) {
      ErrorMsg.innerText = data.message;
      ErrorMsg.style.color = "red";
      ErrorMsg.style.textAlign = "center";
      return;
    }

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("loggedInUser", JSON.stringify(data.data.user));
    if(data.data.user.role === "admin"){
        window.location.href = "../dashboard/dashboard.html";
    }
    if(data.data.user.role ==="user"){
        // window.location.href = "../dashboard/dashboard.html";
        console.log(' user dashboard under development')
        return
    }
    
  } catch (error: any) {
    console.error("Login Error:", error);
    ErrorMsg.innerText = error.message;
  }
};

window.addEventListener("DOMContentLoaded", function () {
  if (registerForm) {
    registerForm.addEventListener("submit", register);
  }
  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }
});
