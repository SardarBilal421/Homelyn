// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  where,
  query,
  getDoc,
  distinct,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUrMZck3D12Xk3LXmn3suzXVdT_ydgAZY",
  authDomain: "homelyne-b55d7.firebaseapp.com",
  projectId: "homelyne-b55d7",
  storageBucket: "homelyne-b55d7.appspot.com",
  messagingSenderId: "794966247628",
  appId: "1:794966247628:web:ef41b2031dc1cf4f521a69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  distinct,
  auth,
  firebase,
  where,
  arrayUnion,
  arrayRemove,
  query,
  getDoc,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  orderBy,
  deleteDoc,
};
