// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmZm_ZIP1bRm7I3xbyKbb18C9ArmHerZ0",
  authDomain: "charter-43c92.firebaseapp.com",
  projectId: "charter-43c92",
  storageBucket: "charter-43c92.appspot.com",
  messagingSenderId: "199832895608",
  appId: "1:199832895608:web:90eff225def3ed65b9ad8d",
  measurementId: "G-Z0GSCW4VD4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const analytics = getAnalytics(app); 

const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;


// const STORAGE_FOLDER_PATH = "charter-43c92.appspot.com";
export const storage = getStorage(app, firebaseConfig.storageBucket);

export default app;
