import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYiG2QthPEigjI3RT5tfVjfRFXiEimcJI",
  authDomain: "owitter-fc7cf.firebaseapp.com",
  projectId: "owitter-fc7cf",
  storageBucket: "owitter-fc7cf.appspot.com",
  messagingSenderId: "682433783454",
  appId: "1:682433783454:web:c4f945c16ce1aef8a37d8f",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
