import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "-",
  authDomain: "-",
  projectId: "-",
  storageBucket: "-",
  messagingSenderId: "-",
  appId: "-",
  measurementId: "-",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
