import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth } from "./fireconfig.js"



onAuthStateChanged(auth,  (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

  } else {
    window.location = "login.html"
  }
});

const logout = document.querySelector("#logout-btn")

logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        console.log('logout sucessfully');
        window.location = 'login.html'

      }).catch((error) => {
        console.log(error);
        
      });
})


