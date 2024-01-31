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

// function navigateTo(sectionId){
//     //Hide all sections
//     const sections = document.querySelectorAll('section')
//     sections.forEach(section => {
//         section.classList.remove('active')
//     })

//     //show the selected section
//     const selectedSection = document.getElementById(sectionId)
//     if(selectedSection){
//         selectedSection.classList.add("active")
//     }
// }

