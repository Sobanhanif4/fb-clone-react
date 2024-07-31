import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDli8dZoKVVtVpejgTLkBjxQjtb50Mftro",
  authDomain: "facebook-clone-40200.firebaseapp.com",
  projectId: "facebook-clone-40200",
  storageBucket: "facebook-clone-40200.appspot.com",
  messagingSenderId: "13708981353",
  appId: "1:13708981353:web:2235e9ca6a8a6bc1861ef8",
  measurementId: "G-TLW5V1QJE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
