// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgFUx8jATLaiyMpygK989PtquEx3o7Pvc",
  authDomain: "filmi-gpt.firebaseapp.com",
  projectId: "filmi-gpt",
  storageBucket: "filmi-gpt.appspot.com",
  messagingSenderId: "217065177097",
  appId: "1:217065177097:web:3b66404dab1239b0a678d8",
  measurementId: "G-YB4N1Y1MK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();