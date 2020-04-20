import firebase from "firebase/app";
import "firebase/firebase-firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDf-MTRBvo0og52WWoUUQahc84rE42JSvM",
  authDomain: "reactfire-crud.firebaseapp.com",
  projectId: "reactfire-crud"
});

let db = firebase.firestore()

export default db;