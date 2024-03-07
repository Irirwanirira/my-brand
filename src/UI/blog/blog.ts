import {
  ArticleArr,
  Comments,
  fetchApi,
  baseUrl,
  getQueryParams,
  retrieveFromStore,
  successMsgPop,
} from "../../modules/helperFunction.js";
const articleId = getQueryParams("id");
const accessToken: string | null = localStorage.getItem("accessToken");

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

const displaySingleArticle = (article: ArticleArr) => {
  const blogToReadContainer =
    (document.querySelector("#all_blogs_view") as HTMLDivElement) || null;
  blogToReadContainer.innerHTML = "";
  const { _id, title, image, description, post_date, likes, comments } =
    article;

  const author: any = article.author;
  const name: string = (author as { name: string }).name;

  blogToReadContainer.innerHTML += `
    <article>
        <div class="read_blog_contents">
            <h2 title="${title}" class="read_blog_name">${title}</h2>
            <p class="date">Date:  <span>${post_date.slice(0, 10)}</span></p>
            <p class="date">Author: <span>${name}</span></p>
            <img class="read_blog_image" src="${image}" alt="${title}">
            <p class="blog_content">${description}</p>
        </div>
    </article>
    <section class="reaction">
    <div class="buttons">
        <button title="comment" id="${_id}">
            <i class="fa fa-comment" aria-hidden="true"></i>
        </button>
        <p>${comments.length}</p>
        </div>
        <div class="buttons">
        <button title="like" id="${_id}">
        <i class="fa fa-heart-o" aria-hidden="true"></i>
            </button>
            <p>${likes?.length}</p>
        </div>
    </section>
    <div class="comment_section">
    <form class="form" id="comment-form " action="submit">
        <input type="text" name="comment" id="commentor-comment" placeholder="Comment">
        <button type="submit">Comment</button>
    </form>
    <h1>Comments</h1>
    <div class="commentators"></div>
    </div>
    `;
  const commentBtn =
    (document.querySelectorAll(
      ".fa-comment"
    ) as NodeListOf<HTMLButtonElement>) || null;

  const commentForm =
    (document.querySelector(".form") as HTMLFormElement) || null;
  commentForm.addEventListener("submit", () => {
    const content =
      (document.querySelector('input[name="comment"]') as HTMLInputElement) ||
      null;
    const contentValue = content?.value;
    addComment(event, articleId, contentValue);
  });

  async function addComment(e: any, articleId: any, contentValue: any) {
    e.preventDefault();
    const user: any = retrieveFromStore("loggedInUser");
    const body = { content: contentValue, author: user?.id, post: articleId };
    try {
      const response = await fetch(`${baseUrl}/comment/${articleId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer "${accessToken}"`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        successMsgPop(data.message);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error("Comment Error:", error);
      throw error;
    }
  }

  const likeBtn = document.querySelectorAll(
    ".fa-heart-o"
  ) as NodeListOf<HTMLButtonElement>;
  likeBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const articleId: any = btn?.parentElement?.id;
      likeArticle(articleId);
    })
  );
  const comment =
    (document.querySelector(".commentators") as HTMLDivElement) || null;
  comments?.length > 0
    ? (comment.innerHTML = "")
    : (comment.innerHTML = "<h3>No comments available</h3>");
  comments.forEach((item: any) => {
    comment.innerHTML += `
      <div class="comments">
          <div class="commentor_details">
              <h3>${item.author.name}: </h3>
              <p>${item.content}</p>
              <button id=${item._id} style="background-color: transparent; border: none; cursor: pointer; outline: none; padding: 0; margin-left: 4rem">
                <i class="fa fa-trash" aria-hidden="true" style="color: #6f0014"></i>
              </button>
          </div>
      </div>`;
      const deleteBtn = document.querySelectorAll(".fa-trash");
      deleteBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
          const commentId: any = btn?.parentElement?.id;
          deleteComment(commentId);
          
        })
      );
  });
};

async function deleteComment(commentId: any) {
  fetch(`${baseUrl}/comment/${commentId}`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer "${accessToken}"`,
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
 .then(response => response.text())
 .then(text => {
    try { 
      successMsgPop('Comment deleted successfully');
    window.location.reload();
      return JSON.parse(text);
     
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw error; 
    }
 })
 .then(data => {
    if(data.status === 200){
      successMsgPop(data.message);
      window.location.reload();
    }else{
      successMsgPop(data.message);
    }
 })
 .catch(error => {
    console.error('An error occurred:', error);
   
 });
}


export const fetchSingleArticle = (blogId: any) => {
  fetchApi(`${baseUrl}/article/${blogId}`)
    .then((data) => {
      const article = data.data.article;
      displaySingleArticle(article);
    })
    .catch((error) => console.log("unable to fetch targeted Article:", error));
};

export function populateBlogList() {
  const blogContainer =
    (document.querySelector(".blog_container") as HTMLDivElement) || null;
  fetchApi(`${baseUrl}/article`)
    .then((data) => {
      const article = data.data.articles;
      const activeArticle = article.filter(
        (item: ArticleArr) => item.isDeleted === false
      );
      activeArticle.reverse().forEach((item: ArticleArr) => {
        blogContainer.innerHTML += `<div class="blog_card" id="blog_card_desktop_view">
             <img class="blog_image" src="${item?.image}" alt=${item?.title}>
             <div class="blog_description">
                 <p class="blog_date">${item?.post_date.slice(0, 10)}</p>
                 <h2 title=${item?.title} class="blog_name">${item?.title}</h2>
                 <div class="link_reaction">
                     <button class="link_to_blog" id="${item?._id}" data-id=${
          item._id
        }>
                         Read
                     </button>
                     <section class="reaction">
                         <div class="buttons">
                             <button title="comment"  id="your_comments">
                                 <i class="fa fa-comment" aria-hidden="true"></i>
                             </button>
                             <p>${item?.comments?.length}</p>
                         </div>
                         <div class="buttons">
                             <button title="like" id="${item._id}">
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                             </button>
                             <p>${item?.likes?.length}</p>
                         </div>
                     </section>
                 </div>
             </div> 
             </div>
             `;
        const likeBtn = document.querySelectorAll(
          ".fa-heart-o"
        ) as NodeListOf<HTMLButtonElement>;
        likeBtn.forEach((btn) =>
          btn.addEventListener("click", (e) => {
            const articleId: any = btn?.parentElement?.id;
            likeArticle(articleId);
          })
        );
      });

      const readMoreBtn = document.querySelectorAll(".link_to_blog");
      readMoreBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
          const blogId: any = btn?.getAttribute("data-id");
          window.location.href = `./read_blog.html?id=${blogId}`;
        })
      );
    })
    .catch((error) => console.log("Unable to get articles,", error));
}


async function likeArticle(articleId: any) {
  try {
    const user: any = retrieveFromStore("loggedInUser");
    const body = { user: user?.id, article: articleId };
    const response = await fetch(`${baseUrl}/like/${articleId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer "${accessToken}"`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();

    if (!response.ok) {
      successMsgPop(data.message);
      return;
    }
    successMsgPop(data.message);
    window.location.reload();
  } catch (error) {
    console.error("Like Error:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.href.includes("blog_list")) {
    populateBlogList();
  } else if (window.location.href.includes("read_blog")) {
    fetchSingleArticle(articleId);
  }
});
