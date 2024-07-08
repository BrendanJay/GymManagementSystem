import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwChXXSuVilpWLDDXSl79zAMa5pBl5Eh0",
  authDomain: "gym-management-official.firebaseapp.com",
  databaseURL: "https://gym-management-official-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gym-management-official",
  storageBucket: "gym-management-official.appspot.com",
  messagingSenderId: "42154569721",
  appId: "1:42154569721:web:a46a1444387768d0d65728",
  measurementId: "G-3Y0ZE3RLDV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const auth=getAuth();
export const db = getFirestore(app);
export { database };
export default app;