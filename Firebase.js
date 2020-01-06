import * as firebase from 'firebase';
import firestore  from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyA9S8yA3r96IH7XkxP_BdmsOSMbu-oEmT8",
    authDomain: "react-firebase-da6bf.firebaseapp.com",
    databaseURL: "https://react-firebase-da6bf.firebaseio.com",
    projectId: "react-firebase-da6bf",
    storageBucket: "react-firebase-da6bf.appspot.com",
    messagingSenderId: "1019153736637", 
};

firebase.initializeApp(config);

 
firebase.firestore();

export default firebase;