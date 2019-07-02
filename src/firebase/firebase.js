import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
    firebase,
    db
}