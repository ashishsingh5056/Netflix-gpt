// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4EAu1i4I9_0XtmafVqlNT3k-96KbIjHo",
    authDomain: "netflixgpt1-aac66.firebaseapp.com",
    projectId: "netflixgpt1-aac66",
    storageBucket: "netflixgpt1-aac66.appspot.com",
    messagingSenderId: "142759201428",
    appId: "1:142759201428:web:1124bf1bc5d8d2093c8281",
    measurementId: "G-063Z7L460Y"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  
export const auth = getAuth();