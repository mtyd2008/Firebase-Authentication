import { signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
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


const provider = new GoogleAuthProvider();
const google = document.querySelector("#google-btn")


google.addEventListener('click' , ()=>{
  // console.log('google');
  
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(token);
    console.log(user);
    
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
})