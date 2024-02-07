import {
  BlogArr,
  Comments,
  retrieveFromStore,
  saveLocally,
} from "../../modules/helperFunction.js";

const navBar = document.querySelector(
  ".navigation_side"
) as HTMLDivElement | null;
if (navBar) {
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
} else {
  console.log("No navbar found");
}

const backArrow = document.querySelector(".back_button") as HTMLElement | null;
if (backArrow) {
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
} else {
  console.log("No back button found");
}

export function populateBlogList() {
  const blogContainer = document.querySelector(
    ".blog_container"
  ) as HTMLDivElement | null;
  const blogList: BlogArr[] | any = retrieveFromStore("blogs");
  function readBlog(id:string) {
    const blog = blogList.find((blog:BlogArr) => blog.id === id);
    localStorage.setItem("readBlog", JSON.stringify(blog));
    window.location.href = "./read_blog.html";
  }
  if (blogContainer && blogList.length > 0) {
    blogList.forEach((blog: BlogArr) => {
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
                            <p>${blog?.comments?.length}</p>
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
      btn.addEventListener("click", (event: any) => {
        const blogId = event.target.id;
        readBlog(blogId);
      });
    });
  } else {
    blogContainer ?
    blogContainer.innerHTML = "<h3>No blogs available</h3>" : console.log("No blog container found");
  }
}

function readBlog() {
  const blogToReadContainer = document.querySelector("#all_blogs_view") as  HTMLDivElement | null;
  
  const blogToRead: any = retrieveFromStore("readBlog");
  if( blogToReadContainer && blogToRead ){

      const { title, photo, description, Date, likes, comments } = blogToRead;
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
          <p>${comments.length}</p>
          </div>
          <div class="buttons">
              <button id="your_like">
                  <i class="fa fa-heart-o" aria-hidden="true"></i>
              </button>
              <p>${likes}</p>
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
      const commentForm = document.querySelector("#comment-form") as HTMLFormElement | null;
      if (commentForm && commentatorContainer) {
        commentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = commentForm["commentor-name"].value;
        const commentText = commentForm["commentor-comment"].value;
        const comments: Comments = { name, comment: commentText };
  
        const blogArray = retrieveFromStore("blogs");
        const blogIndex = blogArray.findIndex(
          (blog: BlogArr) => blog.id === blogToRead.id
        );
        const blogToComment: BlogArr = blogArray[blogIndex];
        const commentArr: any = blogToComment.comments
  
        if (commentArr) {
          commentArr.unshift(comments);
        }
        saveLocally("blogs", blogArray);
        commentForm.reset();
        commentatorContainer.innerHTML += `
        <div class="comments">
            <div class="commentor_details">
                <h3>${name}: </h3>
                <p>${commentText}</p>
            </div>
        </div>
    `;
        
        }
      );
    }else{
      console.log("No comment form or commentator container found")
    }

      if ( commentatorContainer && comments && comments.length > 0) {
        comments.forEach((item: Comments) => {
          commentatorContainer.innerHTML += `
          <div class="comments">
              <div class="commentor_details">
                  <h3>${item.name}: </h3>
                  <p>${item.comment}</p>
              </div>
          </div>
       `;
        });
      }else {
        commentatorContainer && comments ? commentatorContainer.innerHTML = "<h3>No comments available</h3>" : console.log("No commentator container found");
      };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("blog_list")) {
    populateBlogList();
  } else if (window.location.href.includes("read_blog")) {
    readBlog();
  }
});
