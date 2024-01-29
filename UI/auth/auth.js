import { toggleNavBar } from "../../modules/helperFunctions.js"

const navBar = document.getElementById('nav_list')
const menuBtn = document.getElementById('menu_btn')

menuBtn.addEventListener('click',()=> toggleNavBar(navBar))
navBar.addEventListener('click', ()=>toggleNavBar(navBar))