import {
  ArticleArr,
  toggleNavBar,
  displayProjects,
  baseUrl,
  fetchApi,
  getQueryParams
} from "./modules/helperFunction.js";
// import { fetchSingleArticle } from "./UI/blog/blog.js";
const articleId = getQueryParams("id")
console.log(articleId)

const navBar = document.getElementById("nav_list") as HTMLUListElement;
const menuBtn = document.getElementById("menu_btn") as HTMLImageElement;
const form = document.querySelector("#form") as HTMLFormElement | null;

const workContainer = document.querySelector<HTMLDivElement>(".work_container");

menuBtn.addEventListener("click", () => toggleNavBar(navBar));
navBar.addEventListener("click", () => toggleNavBar(navBar));

const fetchArticle = (): void=> {
  fetchApi(`${baseUrl}/article`)
  .then((data) => {
    const article = data.data.articles.reverse().slice(0,3);
    displayArticle(article)
  })
  .catch(err =>(
    console.log("unable to fetch data article")
  )) 
}

function displayArticle(article: ArticleArr[]) {
  const blogContainer =
    document.querySelector<HTMLDivElement>(".blog_container") || null;
  if (!blogContainer) {
    alert("error:" + " " + "blog container not found");
    return;
  }
 article.forEach((item: ArticleArr) => {
        blogContainer.innerHTML += `
      <div class="blog_card" id="blog_card_desktop_view">
      <img class="blog_image" src="${item.image}" alt="${item.title}">
      <div class="blog_description">
        <p class="blog_date">${item.post_date.slice(0, 10)}</p>
          <h2 title="${item.title}" class="blog_name">${item.title}</h2>
          <button class="link_to_blog" id="${item?._id}" data-id=${item._id}>
          Read
        </button>
      </div>
    </div>
    `;
      });
      const readMoreBtn = document.querySelectorAll(".link_to_blog")
      readMoreBtn.forEach(btn => btn.addEventListener("click", ()=> {
        console.log(btn)
        const blogId: any = btn?.getAttribute('data-id')
        window.location.href =`./read_blog.html?id=${blogId}`
        
      }))
}

const sendMessage = async (event: any) => {
  const nameInputField =
    (document.getElementById("name_input") as HTMLInputElement) || null;
  const emailInputField =
    (document.getElementById("email_input") as HTMLInputElement) || null;
  const messageField = document.getElementById(
    "message_text"
  ) as HTMLTextAreaElement;
  let name = nameInputField?.value;
  let email = emailInputField?.value;
  let message = messageField?.value;

  const validForm =
    (document.getElementById("validForm") as HTMLSpanElement) || null;
  try {
    event.preventDefault();
    const messageObj = { name, email, message };
    const response = await fetch(`${baseUrl}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    });
    const data = await response.json();

    if (!response.ok) {
      validForm.innerText = data.message;
      validForm.style.color = "red";
      validForm.style.textAlign = "center";
      return;
    }
    validForm.style.color = "green";
    validForm.style.textAlign = "center";
    validForm.innerText = " Message sent successfully";
    form?.reset();
  } catch (error) {
    console.log("Unable to submit your message:", error);
  }
};

if (form) {
  form.addEventListener("submit", sendMessage);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchArticle()
  displayProjects(workContainer);
});
