import {
  BlogArr,
  retrieveFromStore,
  toggleNavBar,
  displayProjects,
  saveLocally,
  Message,
} from "./modules/helperFunction.js";

const navBar = document.getElementById("nav_list") as HTMLUListElement;
const menuBtn = document.getElementById("menu_btn") as HTMLImageElement;
const form = document.querySelector("#form") as HTMLFormElement | null;

const nameInputField = document.getElementById(
  "name_input"
) as HTMLInputElement;
const emailInputField = document.getElementById(
  "email_input"
) as HTMLInputElement;
const messageField = document.getElementById(
  "message_text"
) as HTMLTextAreaElement;

const workContainer = document.querySelector<HTMLDivElement>(".work_container");

menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar.addEventListener("click", () => toggleNavBar(navBar));

function populateBlogList() {
  const blogContainer =
    document.querySelector<HTMLDivElement>(".blog_container") || null;
  if (!blogContainer) {
    alert("error:" + " " + "blog container not found");
    return;
  }
  const blogList = retrieveFromStore("blogs");

  function readBlog(id: string) {
    const blog = blogList.find((blog: BlogArr) => blog.id === id);
    localStorage.setItem("readBlog", JSON.stringify(blog));
    window.location.href = "./UI/blog/read_blog.html";
  }
  const selectedBlogs = blogList.slice(0, 3);
  if (selectedBlogs.length > 0) {
    selectedBlogs.forEach((blog: BlogArr) => {
      blogContainer.innerHTML += `
            <div class="blog_card" id="blog_card_desktop_view">
              <img class="blog_image" src="${blog.photo}" alt="">
              <div class="blog_description">
                <p class="blog_date">${blog.Date.slice(4)}</p>
                  <h2 title="${blog.title}" class="blog_name">${blog.title}</h2>
                <button class="link_to_blog" id="${blog.id}">
                  Read
                </button>
              </div>
            </div>
          `;
    });
    const readMoreBtn = document.querySelectorAll(".link_to_blog");
    readMoreBtn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const target = event.target as HTMLButtonElement;
        if (target) {
          const blogId = target.id;
          readBlog(blogId);
        } else {
          alert("error:" + " " + "button not found");
        }
      });
    });
  } else {
    blogContainer.innerHTML = `<h3>There are no blogs available</h3>`;
  }
}

let messages: Message[] = [];
let newMessage: Message;
const existingStoredMsg: Message[] | null = retrieveFromStore("messages");

function store() {
  let date = new Date();
  if (nameInputField.value && emailInputField.value && messageField.value) {
    newMessage = {
      id: messages.length + 1,
      name: nameInputField.value,
      email: emailInputField.value,
      message: messageField.value,
      Date: date.toDateString(),
      Time: date.toLocaleTimeString(),
    };
    if (existingStoredMsg) {
      existingStoredMsg.unshift(newMessage);
      saveLocally("messages", existingStoredMsg);
    } else {
      console.log("Message storage not found");
    }
  } else {
    console.log("Kindly fill all the fields");
  }
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = nameInputField.value;
    let email = emailInputField.value;
    let message = messageField.value;

    const nameError = document.querySelector(
      "#nameError"
    ) as HTMLSpanElement | null;
    const emailError = document.querySelector<HTMLSpanElement>("#emailError");
    const messageError =
      document.querySelector<HTMLSpanElement>("#messageError");

    const validForm = document.getElementById(
      "validForm"
    ) as HTMLSpanElement | null;

    if (nameError && emailError && messageError && validForm) {
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
      form.reset();
    } else {
      console.log(
        "error:" + " " + "nameError, emailError, validError are not found"
      );
    }

    // let name = form["name"].value;
    // let email = form["email"].value;
    // let message = form["textContent"].value ;
    // console.log(name, email, message)
  });
} else {
  console.log("form not found");
}

window.addEventListener("DOMContentLoaded", () => {
  populateBlogList();
  displayProjects(workContainer);
});
