import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1keH8cxc2-1M24s3ZFsXEbUXCYloVQs8",
  authDomain: "aizik-whatsapp-firebase-clone.firebaseapp.com",
  databaseURL: "https://aizik-whatsapp-firebase-clone-default-rtdb.firebaseio.com",
  projectId: "aizik-whatsapp-firebase-clone",
  storageBucket: "aizik-whatsapp-firebase-clone.appspot.com",
  messagingSenderId: "317131455470",
  appId: "1:317131455470:web:7ba26d5dc95c83d1b92cff",
  measurementId: "G-BRL4XZPF10"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;