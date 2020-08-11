import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBoNW0wN8S-URFWoVooSoQ_6sqTA7ahBsA",
    authDomain: "cherds-d2a04.firebaseapp.com",
    databaseURL: "https://cherds-d2a04.firebaseio.com"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database;
