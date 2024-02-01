import { toggleNavBar } from "../../modules/helperFunctions.js"

const navBar = document.getElementById('nav_list')
const menuBtn = document.getElementById('menu_btn')


menuBtn.addEventListener('click',()=> toggleNavBar(navBar))
navBar.addEventListener('click', ()=>toggleNavBar(navBar))

const loginForm = document.getElementById("login")
const registerForm = document.getElementById("register")

function register(e){
    e.preventDefault()
    const name = document.getElementById("registerName").value
    const email = document.getElementById("registerEmail").value
    const password = document.getElementById("registerPassword").value

    if(name === "" || email === "" || password === ""){
        alert("Please fill in all fields")
        return
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExist = storedUsers.some(u => u.email === email)
    if(userExist){
        alert("User already exist. Please login")
        return
    }else{
        const newUser = {
            username: name,
            email: email,
            password: password
        }
        storedUsers.push(newUser)
        localStorage.setItem("users", JSON.stringify(storedUsers))
        alert("User created successfully. Please login")
    }
    window.location.href = "../auth/loginpage.html"
}

function login(e){
    e.preventDefault()

    const loginEmail = document.getElementById("email").value
    const loginPassword = document.getElementById("password").value

    const storedCredentials = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedCredentials.find(u => u.email === loginEmail && u.password === loginPassword);
    console.log("loginPassword", loginPassword)

    if(user){
        localStorage.setItem("loggedInUser", JSON.stringify(user))
        window.location.href = "../dashboard/dashboard.html"
    }else{
        alert("Invalid credential. Please try again or Sign Up.")
    }
}

window.addEventListener("DOMContentLoaded", function() {
   if(registerForm){
        registerForm.addEventListener("submit", register)
   }
   if(loginForm){
       loginForm.addEventListener("submit", login)
   }
});







