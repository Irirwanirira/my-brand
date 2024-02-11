// import Quill from "quill";
import {
  retrieveFromStore,
  toggleNavBar,
  logout,
  createPopAction,
  saveLocally,
  BlogArr,
  Comments,
  Message,
  User,
} from "../../modules/helperFunction.js";

const loggedInUser: User[]| any = retrieveFromStore("loggedInUser");

if (loggedInUser) {
  let username  = loggedInUser.username;
  const messagesContainer = document.getElementById(
    "dashboard_message"
  ) as HTMLDivElement;
  const headerSection = document.getElementById("nav_bar") as HTMLElement;
  const sideNavBar = document.getElementById("side_nav_bar") as HTMLElement;
  const form = document.querySelector("#form") as HTMLFormElement;

  const blogContainer = document.getElementById(
    "article_container"
  ) as HTMLElement;

  const title = document.querySelector("#title") as HTMLInputElement;
  const photo = document.querySelector("#photo") as HTMLInputElement;
  const description = document.querySelector(
    "#description"
  )! as HTMLDivElement;

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
    </ul>
    `;

  let messages: Message[] = retrieveFromStore("messages");

  function displayMsg() {
    messages.forEach((message: Message) => {
      messagesContainer.innerHTML += `
            <tr>
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.message}</td>
                <td>${message.Date}</td>
                <td>${message.Time}</td>
                <td class="action">
                    <button class="delete_btn">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
        `;
    });
  }

  if (messagesContainer) {
    messagesContainer.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("fa-trash")) {
        if (target.parentElement && target.parentElement.parentElement) {
          const messageC = target.parentElement.parentElement
            .parentElement as HTMLElement | null;
          if (messageC) {
            const messageContent = messageC.children[2].textContent;
            const messageIndex = messages.findIndex(
              (item: Message) => item.message === messageContent
            );
            createPopAction(
              "Are you sure you want to delete this message?",
              () => {
                messages.splice(messageIndex, 1);
                saveLocally("messages", messages);
                messageC.remove();
              },
              () => {
                return;
              }
            );
          }
        } else {
          console.log("Message text not found");
        }
      } else {
        console.log("Target not found");
      }
    });
  }

  let newBlog: BlogArr;

  function storeBlogs() {
    const existingStoredBlogs: BlogArr[] = retrieveFromStore("blogs");
    let date = new Date();
    const currentMilliseconds = date.getTime();
    const id = `ID_${currentMilliseconds}`;
    if (title.value && photo.value && description.innerHTML) {
      newBlog = {
        id: id,
        title: title.value,
        photo: photo.value,
        description: description.innerHTML,
        comments: [],
        likes: 0,
        Date: date.toDateString(),
      };
      existingStoredBlogs.unshift(newBlog);
      saveLocally("blogs", existingStoredBlogs);
    } else {
      console.log("Please fill in all the fields.");
    }
  }
  let localBlogs: BlogArr[] = retrieveFromStore("blogs");

  function displayArticles() {
    localBlogs.forEach((blog: BlogArr) => {
      blogContainer.innerHTML += `
            <tr>
                <td>${blog.title}</td>
                <td>Young Spartan</td>
                <td>${blog.Date}</td>
                <td class="action">
                      <button title="Edit">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                      </button>
                      <button title="Delete">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                </td>
            </tr>
          `;
    });
  }

  if (blogContainer) {
    blogContainer.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("fa-trash")) {
        if (
          target.parentElement &&
          target.parentElement.parentElement &&
          target.parentElement.parentElement.parentElement
        ) {
          const blogRaw = target.parentElement.parentElement.parentElement;
          const blogTitle = blogRaw.children[0].textContent;
          const blogIndex = localBlogs.findIndex(
            (blog: BlogArr) => blog.title === blogTitle
          );
          createPopAction(
            "Are you sure you want to delete this blog?",
            () => {
              localBlogs.splice(blogIndex, 1);
              saveLocally("blogs", localBlogs);
              blogRaw.remove();
            },
            () => {
              return;
            }
          );
        } else {
          console.log("Parent element not found");
        }
      }
    });
  }

  // creating an edit feature, and it is still pending.
  // function editBlog(event:any) {
  //   const blogRaw = event.target.parentElement.parentElement.parentElement;
  //   const blogTitle = blogRaw.children[0].textContent;
  //   const blogIndex = localBlogs.findIndex(
  //     (blog: BlogArr) => blog.title === blogTitle
  //   );
  //   console.log("index b:", blogIndex);
  //   const title = document.querySelector("#title")! as HTMLInputElement;
  //   const photo = document.querySelector("#photo") as HTMLInputElement;
  //   const description = document.querySelector("#description") as HTMLDivElement;
  //   console.log(title);
  //   console.log(localBlogs[blogIndex])
  //   title.value = localBlogs[blogIndex].title;
  //   photo.value = localBlogs[blogIndex].photo;
  //   description.innerHTML = localBlogs[blogIndex].description;
  //   window.location.href = "./new_blog.html"; 
  
  // }

  // // if (blogContainer) {
  //   blogContainer.addEventListener("click", (e:any) => {
  //     if (e.target.classList.contains("fa-pencil-square-o")) {
  //       const blogRaw = e.target.parentElement.parentElement.parentElement;
  //       const blogTitle = blogRaw.children[0].textContent;
  //       const blogIndex = localBlogs.findIndex(
  //         (blog) => blog.title === blogTitle
  //       );

  //       createPopAction(
  //         "Are you sure you want to delete this blog?",
  //         () => {
  //           if(typeof(editBlog) === "function"){ 
  //             editBlog(e);
  //           }
  //           // saveLocally(localBlogs, "blogs");
  //         },
  //         () => {
  //           return;
  //         }
  //       );
  //     }
  //   });
  // // }

  const storedUser: User[] = retrieveFromStore("users");
  const storedComment: Comments[] = retrieveFromStore("comments");
  const dashboardContainer = document.querySelector(
    ".welcome_view"
  ) as HTMLElement | null;

  function displayWelcome() {
    if (dashboardContainer) {
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
                <h3>Users</h3>
                <p>${storedUser ? storedUser.length : "No user yet"}</p>
            </section>
        </div>
        <section class="bottom_card">
            <h3>Comments</h3>
            <p>${storedComment ? storedComment.length : "No comment yet"}</p>
        </section>`;
    } else {
      console.log("No element with welcome_view class found");
    }
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

  var quill = new Quill('#description', {
    placeholder: 'Enter Detail',
    theme: 'snow',
    modules: {
      toolbar: true,
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
   
    var delta = quill.getContents();
  
    var html = quill.clipboard.convert(delta);
    let titleField = title.value;
    let photoField = photo.value;

    const titleErr = document.getElementById(
      "titleError"
    ) as HTMLSpanElement | null;
    const imageErr = document.getElementById(
      "imageError"
    ) as HTMLSpanElement | null;
    const descrErr = document.getElementById(
      "descriptionError"
    ) as HTMLSpanElement | null;

    const validMsg = document.getElementById(
      "successMsg"
    ) as HTMLSpanElement | null;

    if (titleErr && imageErr && descrErr && validMsg) {
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

      if (!html) {
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
      form.reset();
      window.location.href = "./blogs_page.html";
    } else {
      console.log("Error: titleErr, imageErr, descrErr, validMsg not found");
    }
  });
}else {
  window.location.href = "../auth/loginpage.html";
} 
