import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAtfCtvlQ0xAMgH5nXrhDGqWNUUWEM_YE",
    authDomain: "nutritionalcalculator-22989.firebaseapp.com",
    projectId: "nutritionalcalculator-22989",
    storageBucket: "nutritionalcalculator-22989.appspot.com",
    messagingSenderId: "759742272265",
    appId: "1:759742272265:web:6e1643e5982ffb12d539d8"
};

firebase.initializeApp(firebaseConfig);

const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timeStamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timeStamp };