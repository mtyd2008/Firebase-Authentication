import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./fireconfig.js"

const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const div = document.querySelector("#container")

form.addEventListener("submit" , (event)=>{
    event.preventDefault();

    signInWithEmailAndPassword(auth, email.value, password.value , div)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    window.location = "index.html"
    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    div.innerHTML = errorMessage
    
  });
})