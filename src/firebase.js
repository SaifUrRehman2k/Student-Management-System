// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGjqdJZuumJ1QzxtoZEUUy5VkOpVx-dyo",
  authDomain: "student-management-52dcf.firebaseapp.com",
  projectId: "student-management-52dcf",
  storageBucket: "student-management-52dcf.firebasestorage.app",
  messagingSenderId: "459789141581",
  appId: "1:459789141581:web:da5db1dd233da505c4be04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// console.log(app);

export const db = getFirestore(app)

// console.log(db);

const addUser = async () => {
  try {
    const user = {
      name: 'soap',
      age: '18',
      id: 5050
    }
    const addUserDoc = await addDoc(collection(db, 'users'), user)
    console.log(addUserDoc);
    
  } catch (error) {
    console.log(error);
  }

}
