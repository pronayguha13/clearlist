// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_API_KEY;
const databaseURL = import.meta.env.VITE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;


const firebaseConfig = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// Initialize Firebase
const config = initializeApp(firebaseConfig);

export default config;