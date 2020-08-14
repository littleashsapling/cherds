import firebase from 'firebase';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyBoNW0wN8S-URFWoVooSoQ_6sqTA7ahBsA',
    authDomain: 'cherds-d2a04.firebaseapp.com',
    databaseURL: 'https://cherds-d2a04.firebaseio.com',
    projectId: "cherds-d2a04",
    storageBucket: "cherds-d2a04.appspot.com",
    messagingSenderId: "933353369083"
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export default firebase;