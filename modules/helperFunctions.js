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

export function displayProjects(container) {
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

export const createPopAction = (message, onConfirm, onCancel) => {
  const popup = document.createElement('div');
  popup.id = 'confirmationPopup';
  popup.className = 'popup';

  const popupContent = document.createElement('div');
  popupContent.className = 'popup-content';

  const popupText = document.createElement('p');
  popupText.id = 'popupText';
  popupText.textContent = message;

  const confirmButton = document.createElement('button');
  confirmButton.id = 'confirmButton';
  confirmButton.textContent = 'Confirm';
  confirmButton.style.cssText = 'background-color: green; color: white; border: none;  padding: 0.3rem; font-bold; margin: 0.5rem; border-radius: 2px; cursor: pointer;';

  const cancelButton = document.createElement('button');
  cancelButton.id = 'cancelButton';
  cancelButton.textContent = 'Cancel';
  cancelButton.style.cssText = 'background-color: #6f0014; color: white; border: none;  padding: 0.3rem; font-bold; margin: 0.5rem; border-radius: 2px; cursor: pointer;';

  popupContent.appendChild(popupText);
  popupContent.appendChild(confirmButton);
  popupContent.appendChild(cancelButton);

  popup.appendChild(popupContent);
  document.body.appendChild(popup);

  confirmButton.addEventListener('click', function () {
    popup.style.display = 'none';
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
  });

  cancelButton.addEventListener('click', function () {
    popup.style.display = 'none';
    if (typeof onCancel === 'function') {
      onCancel();
    }
  });

  popup.style.display = 'block';
}

