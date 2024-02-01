import { retrieveFromStore } from "../../modules/helperFunctions.js";

const navBar = document.querySelector(".navigation_side");
const backArrow = document.querySelector(".back_button")

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
`

backArrow.innerHTML = `
    <div class="login_blog_button">
    <a href="./blog_list.html"><img title="Back" src="../../image/Go Back.png" alt="login arrow">
    </a>
    <p>Back</p>
    </div>
`
export function populateBlogList() {
    const blogContainer = document.querySelector(".blog_container");
    const blogList = retrieveFromStore("blogs");

    function readBlog(id){
        const blog = blogList.find(blog => blog.id === id)
        localStorage.setItem("readBlog", JSON.stringify(blog))
        window.location.href = "./read_blog.html"
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
                            <p>2</p>
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
        readMoreBtn.forEach(btn => {
            btn.addEventListener("click", (event) => { 
                const blogId = event.target.id;
                readBlog(parseInt(blogId))
            })
        })
    } else {
        blogContainer.innerHTML = "<h3>No blogs available</h3>";
    }
}

function readBlog(){
    const blogToReadContainer = document.querySelector("#all_blogs_view");
    const blogToRead =  retrieveFromStore("readBlog");
    console.log(blogToRead)

    if(blogToRead){
        const {title, photo, description, Date, likes, comments} = blogToRead
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
                <p>2</p>
                </div>
                <div class="buttons">
                    <button id="your_like">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                    </button>
                    <p>20</p>
                </div>
            </section>

            <div class="comment_section">
            <form class="form" action="">
                <input type="text" name="" id="" placeholder="Comment">
            </form>
            <div class="commentators">
                <div class="comments">
                    <div class="commentor_image">
                        <img src="" alt="">
                    </div>
                    <div class="commentor_details">
                        <h3>Rhys Calendar</h3>
                        <p>Awesome details, Thanks for sharing</p>
                    </div>
                </div>
                <div class="comments">
                    <div class="commentor_image">
                        <img src="" alt="">
                    </div>
                    <div class="commentor_details">
                        <h3>Chremanche</h3>
                        <p>Awesome details, Thanks for sharing</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(window.location.href.includes("blog_list")){
        populateBlogList()}
    else if(window.location.href.includes("read_blog")){
        readBlog()
    }
});