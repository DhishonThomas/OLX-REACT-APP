// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuOrD12Mi20grqwNnUOhfQE4rRvWwuvAw",
  authDomain: "olx-app-21fdb.firebaseapp.com",
  projectId: "olx-app-21fdb",
  storageBucket: "olx-app-21fdb.appspot.com",
  messagingSenderId: "774777836546",
  appId: "1:774777836546:web:09ae0a9b4568273d91431b",
  measurementId: "G-8JE9G8JBVN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth()


const db=getFirestore()
const storage=getStorage()

export {auth,storage, db}