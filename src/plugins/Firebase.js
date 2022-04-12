// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkjCtM1jN31JwtA07KGgZpAiUNlDxz7Rg",
  authDomain: "baikly-shift-and-presence.firebaseapp.com",
  projectId: "baikly-shift-and-presence",
  storageBucket: "baikly-shift-and-presence.appspot.com",
  messagingSenderId: "475423598036",
  appId: "1:475423598036:web:c6a76ebf953b5620876241",
  measurementId: "G-SCFNS9V68R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default { app, auth, analytics };