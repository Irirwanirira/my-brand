export function toggleNavBar(prop) {
  prop.classList.toggle("active");
}

export function saveLocally(items, string) {
  const allMessages = JSON.stringify(items);
  localStorage.setItem(string, allMessages);
}

function getMsg(string) {
  return JSON.parse(localStorage.getItem(string));
}

export function retrieveFromStore(item) {
  let store = getMsg(item);
  if (store) {
    return store;
  } else {
    return [];
  }
}

export function logout(){
    localStorage.removeItem("loggedInUser")
    window.location.href = "../auth/loginpage.html"
}


const projects = [
  {
    id: 1,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
  {
    id: 2,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
  {
    id: 3,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
  {
    id: 4,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
  {
    id: 5,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
  {
    id: 6,
    name: "Car rental",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates?",
    image: "./image/car_rental.png",
    link: "https://car-rental-website.netlify.app/",
  },
];

export function displayProjects(container) {
  // const projectContainer = document.querySelector(".project_container");
  if (container) {
    projects.forEach((project) => {
      container.innerHTML += `
      <div class="work">
        <img src="./image/card_picture.png" alt="">
        <div class="work_description">
            <h2 title="Car rental" class="project_name">${project.name}</h2>
            <p class="project_description">${project.description}</p>
            <a class="link_to_project" href="${project.link}">
                <img src="./image/navigate_link.png" alt="">
            </a>
        </div>
      </div>
      `;
    });
  }
}

