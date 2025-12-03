// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_qwoarqEx4OOXAIML1baRlCt8h2VyoJc",
  authDomain: "portfolio-8b2b8.firebaseapp.com",
  projectId: "portfolio-8b2b8",
  storageBucket: "portfolio-8b2b8.firebasestorage.app",
  messagingSenderId: "256436097194",
  appId: "1:256436097194:web:2e7db3c59a174e1efac0d3",
  measurementId: "G-28Z67HXCL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage };
export default app;