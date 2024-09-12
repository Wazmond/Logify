import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEAXrJFNMZQSjyzJH7sj6g8PWup383tLk",
  authDomain: "logify-e5642.firebaseapp.com",
  databaseURL: "https://logify-e5642-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "logify-e5642",
  storageBucket: "logify-e5642.appspot.com",
  messagingSenderId: "443352615736",
  appId: "1:443352615736:web:6f982cde04a10664360fcd",
  measurementId: "G-M3Q48B4KB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);