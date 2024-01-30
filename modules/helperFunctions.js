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
