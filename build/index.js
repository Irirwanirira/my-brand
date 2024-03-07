var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toggleNavBar, displayProjects, baseUrl, fetchApi, getQueryParams } from "./modules/helperFunction.js";
// import { fetchSingleArticle } from "./UI/blog/blog.js";
const articleId = getQueryParams("id");
console.log(articleId);
const navBar = document.getElementById("nav_list");
const menuBtn = document.getElementById("menu_btn");
const form = document.querySelector("#form");
const workContainer = document.querySelector(".work_container");
menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar.addEventListener("click", () => toggleNavBar(navBar));
const fetchArticle = () => {
    fetchApi(`${baseUrl}/article`)
        .then((data) => {
        const article = data.data.articles.reverse().slice(0, 3);
        displayArticle(article);
    })
        .catch(err => (console.log("unable to fetch data article")));
};
function displayArticle(article) {
    const blogContainer = document.querySelector(".blog_container") || null;
    if (!blogContainer) {
        alert("error:" + " " + "blog container not found");
        return;
    }
    article.forEach((item) => {
        blogContainer.innerHTML += `
      <div class="blog_card" id="blog_card_desktop_view">
      <img class="blog_image" src="${item.image}" alt="${item.title}">
      <div class="blog_description">
        <p class="blog_date">${item.post_date.slice(0, 10)}</p>
          <h2 title="${item.title}" class="blog_name">${item.title}</h2>
          <button class="link_to_blog" id="${item === null || item === void 0 ? void 0 : item._id}" data-id=${item._id}>
          Read
        </button>
      </div>
    </div>
    `;
    });
    const readMoreBtn = document.querySelectorAll(".link_to_blog");
    readMoreBtn.forEach(btn => btn.addEventListener("click", () => {
        console.log(btn);
        const blogId = btn === null || btn === void 0 ? void 0 : btn.getAttribute('data-id');
        window.location.href = `./read_blog.html?id=${blogId}`;
    }));
}
const sendMessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const nameInputField = document.getElementById("name_input") || null;
    const emailInputField = document.getElementById("email_input") || null;
    const messageField = document.getElementById("message_text");
    let name = nameInputField === null || nameInputField === void 0 ? void 0 : nameInputField.value;
    let email = emailInputField === null || emailInputField === void 0 ? void 0 : emailInputField.value;
    let message = messageField === null || messageField === void 0 ? void 0 : messageField.value;
    const validForm = document.getElementById("validForm") || null;
    try {
        event.preventDefault();
        const messageObj = { name, email, message };
        const response = yield fetch(`${baseUrl}/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messageObj),
        });
        const data = yield response.json();
        if (!response.ok) {
            validForm.innerText = data.message;
            validForm.style.color = "red";
            validForm.style.textAlign = "center";
            return;
        }
        validForm.style.color = "green";
        validForm.style.textAlign = "center";
        validForm.innerText = " Message sent successfully";
        form === null || form === void 0 ? void 0 : form.reset();
    }
    catch (error) {
        console.log("Unable to submit your message:", error);
    }
});
if (form) {
    form.addEventListener("submit", sendMessage);
}
window.addEventListener("DOMContentLoaded", () => {
    fetchArticle();
    displayProjects(workContainer);
});
