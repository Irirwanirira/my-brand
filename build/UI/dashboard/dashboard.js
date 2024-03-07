var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchApi } from "../../modules/helperFunction.js";
import { retrieveFromStore, toggleNavBar, logout, createPopAction, baseUrl, successMsgPop, getQueryParams, } from "../../modules/helperFunction.js";
const paramArticleId = getQueryParams("id");
const loggedInUser = retrieveFromStore("loggedInUser");
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
    const username = loggedInUser.name;
    const messagesContainer = document.getElementById("dashboard_message");
    const dashboardContainer = document.querySelector(".welcome_view");
    const blogContainer = document.getElementById("article_container");
    const headerSection = document.getElementById("nav_bar");
    const sideNavBar = document.getElementById("side_nav_bar");
    const articleForm = document.querySelector("#form");
    articleForm === null || articleForm === void 0 ? void 0 : articleForm.addEventListener("submit", () => {
        createArticle(event);
        articleForm.reset();
    });
    const toggleBtn = document.querySelector(".nav_menu");
    if (toggleBtn === null) {
        console.log("No element with class 'nav_menu' found");
    }
    else {
        toggleBtn.addEventListener("click", () => {
            toggleNavBar(sideNavBar);
        });
    }
    sideNavBar.addEventListener("click", () => {
        toggleNavBar(sideNavBar);
    });
    headerSection.innerHTML = `
    <div class="box" id="logo">
    <img src="../../image/logo.png" alt="logo">
    </div>
    <div class="nav_bar_profile">
    <div class="image_container">
        <img src="../../image/aboutPicture.png" alt="profile">
    </div>
    <h3>Admin <span>${username}</span></h3>
    </div>
    <button id="logoutBtn">
        <img src="../../image/Logout Rounded.png" alt="logout button">
    </button>
    `;
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn === null) {
        ("No element with id 'logoutBtn' found");
    }
    else {
        logoutBtn.addEventListener("click", logout);
    }
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
     `;
    function displayWelcome() {
        if (dashboardContainer) {
            dashboardContainer.innerHTML += `
          <section class="top_card">
              <h3>messages</h3>
              <p>messages</p>
          </section>
          <div class="middle_card"> 
              <section class="left_card">
                  <h3>All Articles</h3>
                  <p>article</p>
              </section>
              <section class="right_card">
                  <h3>Users</h3>
                  <p>"No user yet"}</p>
              </section>
          </div>
          <section class="bottom_card">
              <h3>Comments</h3>
              <p> "No comment yet"}</p>
          </section>`;
        }
        else {
            console.log("No element with welcome_view class found");
        }
    }
    window.addEventListener("DOMContentLoaded", function () {
        if (messagesContainer) {
            displayMsg(messagesContainer);
        }
        if (blogContainer) {
            displayArticles(blogContainer);
        }
        if (dashboardContainer) {
            displayWelcome();
        }
        if (paramArticleId) {
            fetchEditArticle(paramArticleId);
        }
    });
}
else {
    window.location.href = "../auth/loginpage.html";
}
function displayArticles(container) {
    fetchApi(`${baseUrl}/article`)
        .then((data) => {
        const article = data.data.articles;
        article.forEach((item) => {
            var _a;
            const value = item.isDeleted === true ? "retrieve" : "hide";
            container.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>${(_a = item.author) === null || _a === void 0 ? void 0 : _a.name}</td>
                <td>${item.post_date.slice(0, 10) +
                "  " +
                item.post_date.slice(11, 19)}</td>
                <td>${item.isDeleted}
                <td class="action">
                      <button title="Edit" id="${item._id}" dataset-id="${item._id}" class="editBtn">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button title="Delete" id="${item._id}" class="softDelete" style="color:${value === "hide" ? "#6f0014" : "green"}">${value}</button>
                      <button title="Delete" id=${item._id}>
                        <i class="fa fa-trash" aria-hidden="true id="${item._id}"></i>
                      </button>
                </td>
            </tr>
          `;
        });
        const softDeleteBtn = document.querySelectorAll(".softDelete");
        softDeleteBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const articleId = btn.id;
                createPopAction(`Are you sure you want to ${btn.textContent} this article?`, () => {
                    softDeleteArticle(articleId);
                    btn.textContent =
                        btn.textContent === "hide" ? "retrieve" : "hide";
                    btn.style.color =
                        btn.textContent === "hide" ? "#6f0014" : "green";
                    btn.textContent === "hide"
                        ? successMsgPop(`Article retrieved successfully`)
                        : successMsgPop(`Article hided successfully`);
                }, () => {
                    return;
                });
            });
        });
        const deleteBtn = document.querySelectorAll(".fa-trash");
        deleteBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                var _a, _b, _c;
                const articleId = (_a = btn.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                const parentTr = ((_c = (_b = btn.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) || null;
                createPopAction("Are you sure you want to delete this article?", () => {
                    hardDeleteArticle(articleId);
                    parentTr === null || parentTr === void 0 ? void 0 : parentTr.remove();
                }, () => {
                    return;
                });
            });
        });
        const editBtn = document.querySelectorAll(".editBtn");
        editBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                const articleId = btn.id;
                window.location.href = `./new_blog.html?id=${articleId}`;
            });
        });
    })
        .catch((error) => {
        console.error("Fetch Error:", error);
    });
}
function fetchEditArticle(articleId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}/article/${articleId}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = yield response.json();
            const oldArticle = data.data.article;
            const { title, image, description } = oldArticle;
            const button = document.querySelector(".articleBtn");
            const titleInput = document.querySelector("#title");
            const imageInput = document.querySelector("#photo");
            const descriptionInput = document.querySelector("#detail");
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not ok");
            }
            titleInput.value = title;
            imageInput.value = image;
            descriptionInput.value = description;
            button.innerText = "Edit Article";
        }
        catch (error) {
            console.error("Fetch Error:", error);
        }
    });
}
function softDeleteArticle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}/article/soft-delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                const errorMessage = yield response.text();
                console.log(errorMessage);
            }
            const responseData = yield response.json();
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
function hardDeleteArticle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}/article/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                const errorMessage = yield response.text();
                console.log(errorMessage);
                throw new Error(`Request failed with status ${response.status}: ${errorMessage}`);
            }
            const responseData = yield response.json();
            successMsgPop(responseData.message);
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
function displayMsg(container) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}/message`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                console.log(response);
                throw new Error("Network response was not ok");
            }
            const data = yield response.json();
            const messages = data.data.messages;
            messages.forEach((message) => {
                container.innerHTML += `
            <tr>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td>${message.date.slice(0, 10)}</td>
                <td>${message.time}</td>
                <td class="action">
                    <button class="delete_btn" id=${message === null || message === void 0 ? void 0 : message._id}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
                const deleteBtn = document.querySelectorAll(".delete_btn");
                deleteBtn.forEach((btn) => {
                    btn.addEventListener("click", () => {
                        const messageId = btn.id;
                        createPopAction("Are you sure you want to delete this message?", () => {
                            var _a, _b;
                            deleteMsg(messageId);
                            (_b = (_a = btn === null || btn === void 0 ? void 0 : btn.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
                        }, () => {
                            return;
                        });
                    });
                });
            });
        }
        catch (error) {
            console.error("Fetch Error:", error);
        }
    });
}
function deleteMsg(messageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${baseUrl}/message/${messageId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const data = yield response.json();
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            successMsgPop("Message was deleted successfully");
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
function createArticle(e) {
    return __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const titleInput = document.querySelector("#title");
        const imageInput = document.querySelector("#photo");
        const descriptionInput = document.querySelector("#detail");
        const successMsg = document.querySelector("#successMsg");
        const title = titleInput.value;
        const image = imageInput.value;
        const description = descriptionInput.value;
        try {
            const response = yield fetch(`${baseUrl}/article`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer "${accessToken}"`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, image, description }),
            });
            const data = yield response.json();
            if (!response.ok) {
                console.log(response);
                successMsg.innerText = data.message;
                successMsg.style.color = "red";
                successMsg.style.textAlign = "center";
                return;
            }
            successMsgPop("Article created successfully");
            window.location.href = "./blogs_page.html";
        }
        catch (err) {
            console.log(err);
        }
    });
}
