import { toggleNavBar, User , saveLocally, retrieveFromStore} from "../../modules/helperFunction.js";

const navBar = document.getElementById('nav_list') as HTMLUListElement | null;
const menuBtn = document.getElementById('menu_btn') as HTMLImageElement | null; 

const loginForm = document.getElementById("login") as HTMLFormElement | null;
const registerForm = document.getElementById("register") as HTMLFormElement | null;

const nameInput = document.getElementById("registerName") as HTMLInputElement | null;
const emailInput = document.getElementById("registerEmail") as HTMLInputElement | null;
const passwordInput = document.getElementById("registerPassword") as HTMLInputElement | null;

function register(e:any){
    e.preventDefault()
    const name = nameInput?.value;
    const email = emailInput?.value;
    const password = passwordInput?.value;
    
   
    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    let newUser: User;
    const storedUsers: User[] = retrieveFromStore("users") || [];
    const userExist = storedUsers.some((u:User) => u.email === email)
    if(userExist){
        alert("User already exist. Please login")
        return
    }else{
        newUser = {
            username: name,
            email: email,
            password: password
        }
        storedUsers.push(newUser)
        saveLocally("users", storedUsers)
        alert("User created successfully. Please login")
    }
    window.location.href = "../auth/loginpage.html"
}

function login(e:any){

    e.preventDefault()
    const email = document.getElementById("email") as HTMLInputElement
    const password = document.getElementById("password") as HTMLInputElement

    const loginEmail = email?.value
    const loginPassword = password?.value

    const storedCredentials: User[] = retrieveFromStore('users') || [];
    const user = storedCredentials.find((u: User) => u.email === loginEmail && u.password === loginPassword);

    if(user){
        saveLocally("loggedInUser", user)
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
 