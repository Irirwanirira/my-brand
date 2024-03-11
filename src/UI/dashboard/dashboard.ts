import { fetchApi } from "../../modules/helperFunction.js";
import {
  retrieveFromStore,
  toggleNavBar,
  logout,
  createPopAction,
  ArticleArr,
  Comments,
  Message,
  User,
  baseUrl,
  successMsgPop,
  getQueryParams,
} from "../../modules/helperFunction.js";

const paramArticleId = getQueryParams("id");

const loggedInUser: any = retrieveFromStore("loggedInUser");
const accessToken: string | null = localStorage.getItem("accessToken");

if (accessToken) {
  const username = loggedInUser.name;
  const messagesContainer = document.getElementById(
    "dashboard_message"
  ) as HTMLDivElement;

  const dashboardContainer = document.querySelector(
    ".welcome_view"
  ) as HTMLElement | null;

  const blogContainer = document.getElementById(
    "article_container"
  ) as HTMLElement;
  const headerSection = document.getElementById("nav_bar") as HTMLElement;
  const sideNavBar = document.getElementById("side_nav_bar") as HTMLElement;

  const articleForm = document.querySelector("#form") as HTMLFormElement;
  articleForm?.addEventListener("submit", () => {
    createArticle(event);
    articleForm.reset();
  });

  const toggleBtn = document.querySelector(".nav_menu");
  if (toggleBtn === null) {
    console.log("No element with class 'nav_menu' found");
  } else {
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

  const logoutBtn = document.getElementById("logoutBtn") as HTMLElement | null;
  if (logoutBtn === null) {
    ("No element with id 'logoutBtn' found");
  } else {
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
     <li>
          <a class="list-group-item" href="../../index.html">Back to Portfolio</a>
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
    } else {
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
} else {
  window.location.href = "../auth/loginpage.html";
}

function displayArticles(container: HTMLElement) {
  fetchApi(`${baseUrl}/article`)
    .then((data) => {
      const article = data.data.articles;
      article.forEach((item: any) => {
        const value = item.isDeleted === true ? "retrieve" : "hide";
        container.innerHTML += `
            <tr>
                <td>${item.title}</td>
                <td>${item.author?.name}</td>
                <td>${
                  item.post_date.slice(0, 10) +
                  "  " +
                  item.post_date.slice(11, 19)
                }</td>
                <td>${item.isDeleted}
                <td class="action">
                      <button title="Edit" id="${item._id}" dataset-id="${
          item._id
        }" class="editBtn">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button title="Delete" id="${
                        item._id
                      }" class="softDelete" style="color:${
          value === "hide" ? "#6f0014" : "green"
        }">${value}</button>
                      <button title="Delete" id=${item._id}>
                        <i class="fa fa-trash" aria-hidden="true id="${
                          item._id
                        }"></i>
                      </button>
                </td>
            </tr>
          `;
      });

      const softDeleteBtn = document.querySelectorAll(
        ".softDelete"
      ) as NodeListOf<HTMLButtonElement>;
      softDeleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const articleId = btn.id;
          createPopAction(
            `Are you sure you want to ${btn.textContent} this article?`,
            () => {
              softDeleteArticle(articleId);
              btn.textContent =
                btn.textContent === "hide" ? "retrieve" : "hide";
              btn.style.color =
                btn.textContent === "hide" ? "#6f0014" : "green";
              btn.textContent === "hide"
                ? successMsgPop(`Article retrieved successfully`)
                : successMsgPop(`Article hided successfully`);
            },
            () => {
              return;
            }
          );
        });
      });

      const deleteBtn = document.querySelectorAll(".fa-trash");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const articleId = btn.parentElement?.id;
          const parentTr =
            (btn.parentElement?.parentElement
              ?.parentElement as HTMLDivElement) || null;
          createPopAction(
            "Are you sure you want to delete this article?",
            () => {
              hardDeleteArticle(articleId);
              parentTr?.remove();
            },
            () => {
              return;
            }
          );
        });
      });

      const editBtn = document.querySelectorAll(
        ".editBtn"
      ) as NodeListOf<HTMLButtonElement>;
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

async function fetchEditArticle(articleId: any) {
  try {
    const response = await fetch(`${baseUrl}/article/${articleId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    
    const data = await response.json();
    const oldArticle = data.data.article;
    const {title, image , description} = oldArticle;

    const newHtml = document.querySelector(".form_section") as HTMLElement;
    newHtml.innerHTML = "";
    newHtml.innerHTML = `
    <div class="form_section">
    <form class="form_to_fill" id="form" class="form ">
      <span id="successMsg"></span>
        <label for="title">Edit title</label>
        <input type="text" id="title" name="title" required>
        <label for="photo">Edit photo</label>
        <input type="text" id="photo" name="photo" required>
        <label for="detail">Edit Description</label>
        <textarea  style="background-color: #d9d9d9; border: solid 1px #c7c7c7;" id="detail" name="detail"></textarea>
      
      <button type="submit" class="submit_bt articleBtn">Update</button>
    </form>
    </div>
    `;
    const articleForm = document.querySelector("#form") as HTMLFormElement;
    let newTitle = document.querySelector("#title") as HTMLInputElement;
    const newImage = document.querySelector("#photo") as HTMLInputElement;
    const newDescription = document.querySelector("#detail") as HTMLTextAreaElement;
    newTitle.value = title;
    newImage.value = image;
    newDescription.value = description;

    articleForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = { title: newTitle.value, image: newImage.value, description: newDescription.value };
      updateArticle(articleId, data);
      articleForm.reset();
    });
  }catch (error) {
    console.error("Fetch Error:", error);
  }
}
async function updateArticle(id: any, data: any) {
  try {
    const response = await fetch(`${baseUrl}/article/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    successMsgPop("Article updated successfully");
    window.location.href = "./blogs_page.html";
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function softDeleteArticle(id: any) {
  try {
    const response = await fetch(`${baseUrl}/article/soft-delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
    }
    const responseData = await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function hardDeleteArticle(id: any) {
  try {
    const response = await fetch(`${baseUrl}/article/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(errorMessage);
      throw new Error(
        `Request failed with status ${response.status}: ${errorMessage}`
      );
    }
    const responseData = await response.json();
    successMsgPop(responseData.message);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function displayMsg(container: HTMLElement) {
  try {
    const response = await fetch(`${baseUrl}/message`, {
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

    const data = await response.json();
    const messages = data.data.messages;
    messages.forEach((message: Message) => {
      container.innerHTML += `
            <tr>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td>${message.date.slice(0, 10)}</td>
                <td>${message.time}</td>
                <td class="action">
                    <button class="delete_btn" id=${message?._id}>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
      const deleteBtn = document.querySelectorAll(
        ".delete_btn"
      ) as NodeListOf<HTMLButtonElement>;
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          const messageId = btn.id;
          createPopAction(
            "Are you sure you want to delete this message?",
            () => {
              deleteMsg(messageId);
              btn?.parentElement?.parentElement?.remove();
            },
            () => {
              return;
            }
          );
        });
      });
    });
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

async function deleteMsg(messageId: any) {
  try {
    const response = await fetch(`${baseUrl}/message/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    successMsgPop("Message was deleted successfully");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function createArticle(e: any) {
  e.preventDefault();
  const titleInput = document.querySelector("#title") as HTMLInputElement;
  const imageInput = document.querySelector("#photo") as HTMLInputElement;
  const descriptionInput = document.querySelector(
    "#detail"
  ) as HTMLTextAreaElement;
  const successMsg = document.querySelector("#successMsg") as HTMLSpanElement;

  const title = titleInput.value;
  const image = imageInput.value;
  const description = descriptionInput.value;

  try {
    const response = await fetch(`${baseUrl}/article`, {
      method: "POST",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image, description }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.log(response);
      successMsg.innerText = data.message;
      successMsg.style.color = "red";
      successMsg.style.textAlign = "center";
      return;
    }
    successMsgPop("Article created successfully");
    window.location.href = "./blogs_page.html";
  } catch (err) {
    console.log(err);
  }
}

async function fetchUsers(){
  try {
    const response = await fetch(`${baseUrl}/auth/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const users = data.data.users;
    const userContainer = document.querySelector(".user_container") as HTMLElement || null;
    users.forEach((user: User) => {
      userContainer.innerHTML += `
      <tr>
        <td>${user?.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td class="action">
          <button title="Delete" id=${user._id} class="deleteUser">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
      `;
    });
    const deleteUserBtn = document.querySelectorAll(".deleteUser") as NodeListOf<HTMLButtonElement>;
    deleteUserBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        const userId = btn.id;
        createPopAction(
          "Are you sure you want to delete this user?",
          () => {
            deleteUser(userId);
            btn?.parentElement?.parentElement?.remove();
          },
          () => {
            return;
          }
        );
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

async function deleteUser(userId: any){
  try {
    const response = await fetch(`${baseUrl}/auth/delete/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    successMsgPop("User was deleted successfully");
  }
  catch (error) {
    console.error("An error occurred:", error);
  }
}

fetchUsers();
