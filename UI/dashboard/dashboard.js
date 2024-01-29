import { retrieveMsg } from "../../modules/helperFunctions.js";
const messagesContainer = document.getElementById("dashboard_message");
const headerSection = document.getElementById('nav_bar')
const sideNavBar = document.getElementById('side_nav_bar')


headerSection.innerHTML = `
    <div class="box" id="logo">
    <img src="../../image/logo.png" alt="logo">
    </div>
    <div class="nav_bar_profile">
    <div class="image_container">
        <img src="../../image/aboutPicture.png" alt="profile">
    </div>
    <h3>Admin <span>Joseph</span></h3>
    </div>
    <button>
    <a href="../auth/loginpage.html">
        <img src="../../image/Logout Rounded.png" alt="logout button">
    </a>
    </button>
`


sideNavBar.innerHTML = `
    <ul class="side_nav_bar_ul">
    <li>
        <a class="list-group-item" href="./dashboard.html"><i class="fa fa-home" aria-hidden="true"></i></i>&nbsp; Dashboard</a>
    </li>
    <li>
        <a class="list-group-item" href="./new_blog.html"><i class="fa fa-pencil" aria-hidden="true"></i></i>&nbsp; New article</a>
    </li>
    <li>
        <a class="list-group-item" href="./blogs_page.html"><i class="fa fa-book" aria-hidden="true"></i></i>&nbsp; All articles</a>
    </li>

    <li>
        <a class="list-group-item" href="./messages_page.html"><i class="fa fa-envelope-o" aria-hidden="true"></i></i>&nbsp; Messages</a>
    </li>
    <li>
        <a class="list-group-item" href="./users_page.html"><i class="fa fa-users" aria-hidden="true"></i></i>&nbsp; Users</a>
    </li>
    </ul>
`

const messages = retrieveMsg()

function displayMsg(){
    messages.forEach((message) => {
        messagesContainer.innerHTML += `
            <tr>
                <td>${message.names}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td>${message.Date}</td>
                <td>${message.Time}</td>
                <td class="action">
                    <button class="delete_btn">
                    <img src="../../image/Remove.png" alt="delete icon">
                    </button>
                </td>
            </tr>
    `});
}

window.addEventListener('DOMContentLoaded', displayMsg)






















  // messages.forEach((message) => {
    //     messagesContainer.innerHTML += `
    //         <tr>
    //             <td>1</td>
    //             <td>${message.names}</td>
    //             <td>${message.email}</td>
    //             <td>${message.message}</td>
    //             <td>
    //                 <button>Delete</button>
    //             </td>
    //         </tr>
    // `});


// const message = {
//     id: messages.length + 1,
//     names: nameInputField.value,
//     email: emailInputField.value,
//     message: messageField.value,
//     time: new Date().toTimeString(),
//     date: new Date().toDateString()
// };
