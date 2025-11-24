// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGjqdJZuumJ1QzxtoZEUUy5VkOpVx-dyo",
  authDomain: "student-management-52dcf.firebaseapp.com",
  projectId: "student-management-52dcf",
  storageBucket: "student-management-52dcf.firebasestorage.app",
  messagingSenderId: "459789141581",
  appId: "1:459789141581:web:da5db1dd233da505c4be04",
  measurementId: "G-HG5DJQVQ9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("User is still signed in:", user);
    } else {
      // User is signed out
      console.log("User is signed out");
    }
  });
