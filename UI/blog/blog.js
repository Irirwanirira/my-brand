import {
  retrieveFromStore,
  saveLocally,
} from "../../modules/helperFunctions.js";

const navBar = document.querySelector(".navigation_side");

navBar.innerHTML = `
    <div class="navbar_container">
        <div class="logo_container">
            <img class="logo" title="Logo" src="../../image/logo.png" alt="">
        </div>
        <nav class="nav_bar">
            <div class="login_blog_button">
                <h3>Login</h3>
                <a href="../auth/loginpage.html"><img class="login_btn" title="login" src="../../image/Login.png" alt="login arrow">
                </a>
            </div>
        </nav>
    </div>
`;

const backArrow = document.querySelector(".back_button");
const div = document.createElement("div");
div.classList.add("login_blog_button");
const button = document.createElement("button");
button.id = "backBtn";
button.title = "Back";
button.style.cssText =
  "background-color: transparent; border: none; cursor: pointer; outline: none; padding: 0; margin: 0;";
button.addEventListener("click", () => {
  window.history.back();
});
const img = document.createElement("img");
img.title = "Back";
img.src = "../../image/Go Back.png";
img.alt = "login arrow";
button.appendChild(img);
div.appendChild(button);
backArrow.appendChild(div);

export function populateBlogList() {
  const blogContainer = document.querySelector(".blog_container");
  const blogList = retrieveFromStore("blogs");

  function readBlog(id) {
    const blog = blogList.find((blog) => blog.id === id);
    localStorage.setItem("readBlog", JSON.stringify(blog));
    window.location.href = "./read_blog.html";
  }

  if (blogList.length > 0) {
    blogList.forEach((blog) => {
      let description = blog.description.slice(0, 40);
      blogContainer.innerHTML += `
           <div class="blog_card" id="blog_card_desktop_view">
            <img class="blog_image" src="${blog.photo}" alt=${blog.title}>
            <div class="blog_description">
                <h2 title=${blog.title} class="blog_name">${blog.title}</h2>
                <p class="blog_content">${description} ...
                </p>
                <div class="link_reaction">
                    <button class="link_to_blog" id="${blog.id}">
                        Read more
                    </button>
                    <section class="reaction">
                        <div class="buttons">
                            <button id="your_comments">
                                <i class="fa fa-comment" aria-hidden="true"></i>
                            </button>
                            <p>${blog.comment.length}</p>
                        </div>
                        <div class="buttons">
                            <button id="your_like">
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                            </button>
                            <p>20</p>
                        </div>
                    </section>
                </div>
            </div> 
            </div>
            `;
    });
    const readMoreBtn = document.querySelectorAll(".link_to_blog");
    readMoreBtn.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const blogId = event.target.id;
        readBlog(blogId);
      });
    });
  } else {
    blogContainer.innerHTML = "<h3>No blogs available</h3>";
  }
}

function readBlog() {
  const blogToReadContainer = document.querySelector("#all_blogs_view");
  const blogToRead = retrieveFromStore("readBlog");
  if (blogToRead) {
    const { title, photo, description, Date, likes, comment } = blogToRead;
    blogToReadContainer.innerHTML += `
            <article>
                <div class="read_blog_contents">
                    <h2 title="${title}" class="read_blog_name">${title}</h2>
                    <p class="date">Date:  <span>${Date}</span></p>
                    <img class="read_blog_image" src="${photo}" alt="${title}">
                    <p class="blog_content">${description}</p>
                </div>
            </article>
            <section class="reaction">
            <div class="buttons">
                <button id="your_comments">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                </button>
                <p>${comment.length}</p>
                </div>
                <div class="buttons">
                    <button id="your_like">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
                    <p>20</p>
                </div>
            </section>

            <div class="comment_section">
            <form class="form" id="comment-form" action="submit">
                <input type="text" name="commentor-name" id="commentor-name" placeholder="Name">
                <input type="text" name="commentor-comment" id="commentor-comment" placeholder="Comment">
                <button type="submit">Comment</button>
            </form>
            <h1>Comments</h1>
            <div class="commentators"></div>
            </div>
`;

    const commentatorContainer = document.querySelector(".commentators");
    if (comment && comment.length > 0) {
      comment.forEach((commentator) => {
        commentatorContainer.innerHTML += `
        <div class="comments">
            <div class="commentor_details">
                <h3>${commentator.commentorName}: </h3>
                <p>${commentator.commentorComment}</p>
            </div>
        </div>
    `;
      });
    }

    const commentForm = document.querySelector("#comment-form");
    commentForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const commentorName = commentForm["commentor-name"].value;
      const commentorComment = commentForm["commentor-comment"].value;

      const blogArray = retrieveFromStore("blogs");
      const blogIndex = blogArray.findIndex(
        (blog) => blog.id === blogToRead.id
      );

      if (blogArray[blogIndex].comment) {
        blogArray[blogIndex].comment.unshift({
          commentorName,
          commentorComment,
        });
      }
      saveLocally(blogArray, "blogs");
      commentForm.reset();
      

      commentatorContainer.innerHTML += `
        <div class="comments">
            <div class="commentor_details">
                <h3>${commentorName}: </h3>
                <p>${commentorComment}</p>
            </div>
        </div>
    `;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("blog_list")) {
    populateBlogList();
  } else if (window.location.href.includes("read_blog")) {
    readBlog();
  }
});
