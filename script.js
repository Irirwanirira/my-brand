import { toggleNavBar, saveLocally,retrieveFromStore,  displayProjects} from "./modules/helperFunctions.js";

const navBar = document.getElementById("nav_list");
const menuBtn = document.getElementById("menu_btn");
const form = document.querySelector("#form");

const nameInputField = document.getElementById("name_input");
const emailInputField = document.getElementById("email_input");
const messageField = document.getElementById("message_text");

const workContainer = document.querySelector(".work_container");

menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar.addEventListener("click", () => toggleNavBar(navBar));

function populateBlogList() {
  const blogContainer = document.querySelector(".blog_container");
  const blogList = retrieveFromStore("blogs");

  function readBlog(id){
    const blog = blogList.find(blog => blog.id === id)
    localStorage.setItem("readBlog", JSON.stringify(blog))
    window.location.href = "./UI/blog/read_blog.html"
  }

  const selectedBlogs = blogList.slice(0, 3);
  if (selectedBlogs.length > 0) {
    selectedBlogs.forEach((blog) => {
      let description = blog.description.slice(0, 80);
      blogContainer.innerHTML += `
        <div class="blog_card" id="blog_card_desktop_view">
          <img class="blog_image" src="${blog.photo}" alt="">
          <div class="blog_description">
              <h2 title="Car rental" class="blog_name">${blog.title}</h2>
              <p class="blog_content">${description}...</p>
          </div>
          <button class="link_to_blog" id="${blog.id}">
            Read more
          </button>
        </div>
      `;
    });
    const readMoreBtn = document.querySelectorAll(".link_to_blog");
    readMoreBtn.forEach(btn => {
      btn.addEventListener("click", (event) => { 
          const blogId = event.target.id;
          readBlog(parseInt(blogId))
      })
    })
  } else {
    blogContainer.innerHTML = `<h3>There are no blogs available</h3>`;
  }
}

let messages = [];
let newMessage;
let existingStoredMsg = retrieveFromStore("messages");

function store() {
  let date = new Date();
  let time = new Date();
  if (nameInputField.value && emailInputField.value && messageField.value) {
    newMessage = {
      id: messages.length + 1,
      names: nameInputField.value,
      email: emailInputField.value,
      message: messageField.value,
      Date: date.toDateString(),
      Time: time.toTimeString(),
    };
    existingStoredMsg.unshift(newMessage);
    saveLocally(existingStoredMsg, "messages");
  } else {
    console.log("Please fill in all the fields.");
  }
}

function clearInput() {
  nameInputField.value = "";
  emailInputField.value = "";
  messageField.value = "";
}

form.addEventListener("submit", function validateContactForm(e) {
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
});

window.addEventListener("DOMContentLoaded", ()=> {
  populateBlogList()
  displayProjects(workContainer)
});
