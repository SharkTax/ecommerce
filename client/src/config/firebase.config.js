import {initializeApp, getApp, getApps} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACTAPPFIREBASEAPIKEY,
  authDomain: import.meta.env.VITE_REACTAPPFIREBASEAUTHDOMAIN,
  projectId: import.meta.env.VITE_REACTAPPFIREBASEPROJECTID,
  storageBucket: import.meta.env.VITE_REACTAPPFIREBASESTORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACTAPPFIREBASEMESSAGINGSENDERID,
  appId: import.meta.env.VITE_REACTAPPFIREBASEAPPID
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export{auth, db, storage}