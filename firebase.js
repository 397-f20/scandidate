import * as firebase from 'firebase';

import "firebase/database";

var firebaseConfig = {
    apiKey: "AIzaSyDQ5JufAMRLcml6p2pSzrQWH3Hvsc0MW9Q",
    authDomain: "scandidate.firebaseapp.com",
    databaseURL: "https://scandidate.firebaseio.com",
    projectId: "scandidate",
    storageBucket: "scandidate.appspot.com",
    messagingSenderId: "865891642550",
    appId: "1:865891642550:web:861bde61dfeb0343e20a17"
  };

firebase.initializeApp(firebaseConfig);

export { firebase };