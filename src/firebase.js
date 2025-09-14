// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD10Mdb3B8yQ__3xLsNmSHJsrRDxYgn-rw",
  authDomain: "crowdfund-d9292.firebaseapp.com",
  projectId: "crowdfund-d9292",
  storageBucket: "crowdfund-d9292.firebasestorage.app",
  messagingSenderId: "95012184739",
  appId: "1:95012184739:web:cbac3c6b86234fbf959516",
  measurementId: "G-JEFYJLSSLX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
