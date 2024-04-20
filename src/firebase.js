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
    apiKey: "AIzaSyB0cSG6NP-6LYzfxiOP0uI0gf-U0vkgsAg",
    authDomain: "effect-cc.firebaseapp.com",
    projectId: "effect-cc",
    storageBucket: "effect-cc.appspot.com",
    messagingSenderId: "394168253938",
    appId: "1:394168253938:web:b185fd189b9f0cfa00bf6b",
    measurementId: "G-LS27EMV23E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
