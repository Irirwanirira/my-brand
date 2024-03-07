export type ArticleArr = {
  _id: string;
  title: string;
  author: string
  description: string;
  image: string;
  post_date: string;
  comments: string[];
  likes: string[];
  isDeleted: boolean
  deleted: any
};

export function successMsgPop(message: string) {
  const successMsg = document.createElement("div");
  successMsg.style.cssText = `text-align: center; padding: 10px; background-color: #4CAF50; color: white; z-index: 100; position: fixed; top: 20%; right:20%; transform: translateX(-50%); border-radius: 5px; box-shadow: 0 0 5px 0 #4CAF50;`;
  successMsg.classList.add("success_msg");
  successMsg.innerHTML = `
    <p>${message}</p>
  `;
  document.body.appendChild(successMsg);
  setTimeout(() => {
    successMsg.remove();
  }, 2000);
}

export function getQueryParams(param:string){
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export const baseUrl = "https://my-brand-rvzj.onrender.com/brand/api/v1"
export const fetchApi = async( url: string)=> {
  try {
    const response = await fetch(url)
    if(!response){
      console.log('Network response was not OK')
    }
    const data = await response.json()
    return data
    
  } catch (error) {
    throw error
  }
}

export type Comments = {
  name: string;
  comment: string;
};

export type Message = {
  _id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
}

export function toggleNavBar(prop: any) {
  prop.classList.toggle("active");
}

export function saveLocally(string: string, items: any) {
  const allMessages = JSON.stringify(items);
  localStorage.setItem(string, allMessages);
}

function getMsg(string: string) {
  const data: any = localStorage.getItem(string);
  return JSON.parse(data);
}

export function retrieveFromStore(item: string): [] {
  let store: [] = getMsg(item);
  if (store) {
    return store;
  } else {
    return [];
  }
}

export function logout() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("accessToken");
  window.location.href = "../auth/loginpage.html";
}

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: "Expense Tracker",
    description:
      "Expense Tracker is a user-friendly app that helps you track your expenses and income.",
    image: "./image/car_rental.png",
    link: "https://expense-tracker-ochre-ten.vercel.app/",
  },
  {
    id: 2,
    name: "Space Traveler",
    description:
      "This is a react project that renders rocket data as well as mission data from an API onto the UI.",
    image: "./image/car_rental.png",
    link: "https://space-x-project1.netlify.app/",
  },
  {
    id: 3,
    name: "Netflix Clone",
    description:
      "This app shows movies from TMD, but requires users to register and log in.",
    image: "./image/car_rental.png",
    link: "https://i-joseph-dev.netlify.app/",
  },
  {
    id: 4,
    name: "Math magician",
    description:
      "This is a straightforward application that provides basic mathematical operations, functioning as a calculator where you can easily perform various computations.",
    image: "./image/car_rental.png",
    link: "https://magical-torte-c172f0.netlify.app/",
  },
  {
    id: 5,
    name: "Library",
    description:
      "This is a library app that helps to control the library activities, it helps users to add books of their own and reserve books",
    image: "./image/car_rental.png",
    link: "https://frontend-libba.onrender.com/signin",
  },
  {
    id: 6,
    name: "My portfolio",
    description:
      "My personal portfolio that shows my skills and projects that I have worked on.",
    image: "./image/car_rental.png",
    link: "https://irirwanirira.github.io/my-brand/index.html",
  },
];

export function displayProjects(container: any) {
  if (container) {
    projects.forEach((project) => {
      container.innerHTML += `
        <div class="work">
          <img src="./image/card_picture.png" alt="">
          <div class="work_description">
              <h2 title="Car rental" class="project_name">${project.name}</h2>
              <p class="project_description">${project.description}</p>
              <a class="link_to_project" href="${project.link}" target="_blank">
                  <img src="./image/navigate_link.png" alt="">
              </a>
          </div>
        </div>
        `;
    });
  }
}

export const createPopAction = (
  message: string,
  onConfirm: any,
  onCancel: any
) => {
  const popup = document.createElement("div");
  popup.id = "confirmationPopup";
  popup.className = "popup";

  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";

  const popupText = document.createElement("p");
  popupText.id = "popupText";
  popupText.textContent = message;

  const confirmButton = document.createElement("button");
  confirmButton.id = "confirmButton";
  confirmButton.textContent = "Confirm";
  confirmButton.style.cssText =
    "background-color: green; color: white; border: none;  padding: 0.3rem; font-bold; margin: 0.5rem; border-radius: 2px; cursor: pointer;";

  const cancelButton = document.createElement("button");
  cancelButton.id = "cancelButton";
  cancelButton.textContent = "Cancel";
  cancelButton.style.cssText =
    "background-color: #6f0014; color: white; border: none;  padding: 0.3rem; font-bold; margin: 0.5rem; border-radius: 2px; cursor: pointer;";

  popupContent.appendChild(popupText);
  popupContent.appendChild(confirmButton);
  popupContent.appendChild(cancelButton);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  confirmButton.addEventListener("click", function () {
    popup.style.display = "none";
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  });

  cancelButton.addEventListener("click", function () {
    popup.style.display = "none";
    if (typeof onCancel === "function") {
      onCancel();
    }
  });

  popup.style.display = "block";
};
