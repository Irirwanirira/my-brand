export function toggleNavBar(prop){
    prop.classList.toggle('active')
}

function getMsg(){
    return JSON.parse(localStorage.getItem("messages"))
}

export function retrieveMsg(){
    let messages = getMsg();
    if(messages){
        return messages
    }else {
        return []
    }
}

