import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZIjQQInUDwGlBTuWYhgbLTzFwG20tU3A",

  authDomain: "swan-a3516.firebaseapp.com",

  projectId: "swan-a3516",

  storageBucket: "swan-a3516.firebasestorage.app",

  messagingSenderId: "640118984687",

  appId: "1:640118984687:web:0045b4ab0eb7b1672b701a",

  measurementId: "G-PPXQCJSWCS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
