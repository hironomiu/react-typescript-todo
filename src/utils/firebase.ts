import firebase from "firebase/app"
import "firebase/app"
import "firebase/firestore"
import "firebase/auth"

// const {
//   REACT_APP_FIREBASE_API_KEY,
//   REACT_APP_FIREBASE_AUTH_DOMAIN,
//   REACT_APP_FIREBASE_DATABASE_URL,
//   REACT_APP_FIREBASE_PROJECT_ID,
//   REACT_APP_FIREBASE_STORAGE_BUCKET,
//   REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   REACT_APP_FIREBASE_APP_ID,
// } = process.env

const REACT_APP_FIREBASE_API_KEY = "AIzaSyD6IKgkbn6kXJTQoy7KkgY3a3Df46sLtvM"
const REACT_APP_FIREBASE_AUTH_DOMAIN = "todo-81c92.firebaseapp.com"
const REACT_APP_FIREBASE_DATABASE_URL = "https://todo-81c92.firebaseapp.com"
const REACT_APP_FIREBASE_PROJECT_ID = "todo-81c92"
const REACT_APP_FIREBASE_STORAGE_BUCKET = "todo-81c92.appspot.com"
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "46821653871"
const REACT_APP_FIREBASE_APP_ID = "1:46821653871:web:f1a8f3f26ad44e82e1bc9a"

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth = firebase.auth()
export const FirebaseTimestamp = firebase.firestore.Timestamp
