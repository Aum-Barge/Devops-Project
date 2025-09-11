// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiq_0ZkNMiBtrrURND7ciDwDU4_IMIYTE",
  authDomain: "crowdfunding-6f985.firebaseapp.com",
  projectId: "crowdfunding-6f985",
  storageBucket: "crowdfunding-6f985.appspot.com",
  messagingSenderId: "799311147437",
  appId: "1:799311147437:web:3efeb029318ce6ee747124",
  measurementId: "G-Q7WXFT775C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
