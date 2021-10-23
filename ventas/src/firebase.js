import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBvDqtvs1h0aiEvcUWPqyk_E4XOKZ2tl7Q",
    authDomain: "grupo20-2ce6b.firebaseapp.com",
    projectId: "grupo20-2ce6b",
    storageBucket: "grupo20-2ce6b.appspot.com",
    messagingSenderId: "394708234386",
    appId: "1:394708234386:web:f1398cb48c4923a948364b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}