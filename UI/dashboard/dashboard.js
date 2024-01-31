import {
  retrieveFromStore,
  toggleNavBar,
  saveLocally,
  logout,
} from "../../modules/helperFunctions.js";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "../auth/loginpage.html";
} else {
  const messagesContainer = document.getElementById("dashboard_message");
  const headerSection = document.getElementById("nav_bar");
  const sideNavBar = document.getElementById("side_nav_bar");
  const form = document.querySelector("#form");

  const blogContainer = document.getElementById("article_container");

  const title = document.querySelector("#title");
  const photo = document.querySelector("#photo");
  const description = document.querySelector("#description");

  const toggleBtn = document.querySelector(".nav_menu");
  toggleBtn.addEventListener("click", () => {
    toggleNavBar(sideNavBar);
  });

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
    <h3>Admin <span>${loggedInUser.username}</span></h3>
    </div>
    <button id="logoutBtn">
        <img src="../../image/Logout Rounded.png" alt="logout button">
    </button>
`;

  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", logout);

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

  const messages = retrieveFromStore("messages");

  function displayMsg() {
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
    `;
    });
  }

  let blogs = [];
  let blog;

  const clearInput = () => {
    title.value = "";
    photo.value = "";
    description.value = "";
  };

  function storeBlogs() {
    let date = new Date();
    if (title.value && photo.value && description.value) {
      blog = {
        id: blogs.length + 1,
        title: title.value,
        photo: photo.value,
        description: description.value,
        Date: date.toDateString(),
      };
      blogs.unshift(blog);
      saveLocally(blogs, "blogs");
    } else {
      console.log("Please fill in all the fields.");
    }
  }

  let localBlogs = retrieveFromStore("blogs");

  function displayArticles() {
    localBlogs.forEach((blog) => {
      blogContainer.innerHTML += `
              <tr>
                  <td>${blog.title}</td>
                  <td>Young Spartan</td>
                  <td>${blog.Date}</td>
                  <td class="action">
                        <button>
                        <img src="../../image/Eye.png" alt="delete icon">
                        </button>
                        <button>
                            <img src="../../image/Create.png" alt="delete icon">
                        </button>
                        <button>
                            <img src="../../image/Remove.png" alt="delete icon">
                        </button>
                  </td>
              </tr>
      `;
    });
  }
  const dashboardContainer = document.querySelector(".welcome_view");

  function displayWelcome() {
    dashboardContainer.innerHTML += `
        <section class="top_card">
            <h3>messages</h3>
            <p>${messages.length}</p>
        </section>
        <div class="middle_card"> 
            <section class="left_card">
                <h3>All Articles</h3>
                <p>${localBlogs.length}</p>
            </section>
            <section class="right_card">
                <h3>All Users</h3>
                <p>5</p>
            </section>
        </div>
        <section class="bottom_card">
            <h3>Comments</h3>
            <p>30</p>
        </section>`;
  }

  window.addEventListener("DOMContentLoaded", function () {
    if (messagesContainer) {
      displayMsg();
    }
    if (blogContainer) {
      displayArticles();
    }
    if (dashboardContainer) {
      displayWelcome();
    }
  });

  function validateBlogForm(e) {
    e.preventDefault();

    let titleField = description.value;
    let photoField = photo.value;
    let descriptionField = description.value;

    const titleErr = document.getElementById("titleError");
    const imageErr = document.getElementById("imageError");
    const descrErr = document.getElementById("descriptionError");

    const validMsg = document.getElementById("successMsg");

    if (titleField === "") {
      titleErr.textContent = "Title is required";
      titleErr.style.color = "red";
      title.focus();
      return false;
    } else {
      titleErr.textContent = "";
    }

    if (photoField === "") {
      imageErr.textContent = "Image is required";
      imageErr.style.color = "red";
      photo.focus();
      return false;
    } else {
      imageErr.textContent = "";
    }

    if (descriptionField === "") {
      descrErr.textContent = "Description is required";
      descrErr.style.color = "red";
      description.focus();
      return false;
    } else {
      descrErr.textContent = "";
    }

    validMsg.textContent = "Blog added successfully";
    validMsg.style.cssText = `
    display: block; 
    color: green;
    text-align: center;
    margin: 0 auto;
    padding: 10px;
    animation: fadeOut 5s ease-in-out forwards;
    box-shadow:  1px 1px 1px 1px; `;
    storeBlogs();
    clearInput();
  }
  form.addEventListener("submit", validateBlogForm);
}
