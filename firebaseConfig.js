// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'
// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: "AIzaSyCPM-4vmQv61tDZ9yFqZUq6iwY_Wp9ikcY",
  authDomain: "fir-sprinte.firebaseapp.com",
  projectId: "fir-sprinte",
  storageBucket: "fir-sprinte.firebasestorage.app",
  messagingSenderId: "771148337332",
  appId: "1:771148337332:web:c9cf7b4165865e4d15c7e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
export const roomRef = collection(db, 'users')