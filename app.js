import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./fireconfig.js"
import { collection, query, where, getDocs, addDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const form = document.querySelector("#form")
const todo = document.querySelector("#todo")
const ul = document.querySelector("#ul")
const logout = document.querySelector("#logout-btn")

//global array
const todoArr = []

// check user login
onAuthStateChanged(auth,  (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    getDataFromFirestore()
  } else {
    window.location = "login.html"
  }
});


// logout function
logout.addEventListener('click' , ()=>{
    signOut(auth).then(() => {
        console.log('logout sucessfully');
        window.location = 'login.html'

      }).catch((error) => {
        console.log(error);
        
      });
})


//Get data from firestore
async function getDataFromFirestore() {
  const q = query(collection(db, "todos"), where("uid", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
      todoArr.push({ ...doc.data(), Id: doc.id})
  });

  console.log(todoArr);

  todoArr.map(item => {
      ul.innerHTML += `<li>${item.Todo}</li>`
  })
}



//add data to firestore
form.addEventListener('submit' , async (event)=>{
  event.preventDefault()
  console.log(todo.value);

  try {
    const docRef = await addDoc(collection(db, "todos"), {
    Todo: todo.value,
    uid: auth.currentUser.uid
  });
  
    console.log("Document written with ID: ", docRef.id);
  }
  catch (e) {
    console.log("Error adding document: ", e);
  }
  todo.value = ''
})