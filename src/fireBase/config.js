import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVMvx11lCIdUqicI_3xPS5teyPxdrKvdQ",
  authDomain: "de-todo-bd.firebaseapp.com",
  projectId: "de-todo-bd",
  storageBucket: "de-todo-bd.firebasestorage.app",
  messagingSenderId: "329271176102",
  appId: "1:329271176102:web:4781cb9ea074d36cfcfd67",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
