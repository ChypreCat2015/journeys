 import firebase from 'firebase';
//  import firestore from 'firebase/firestore';
 
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA3GMynu-bcE6UMD_Stz730xMUAqscHo4g",
    authDomain: "my-journeys-be363.firebaseapp.com",
    databaseURL: "https://my-journeys-be363.firebaseio.com",
    projectId: "my-journeys-be363",
    storageBucket: "my-journeys-be363.appspot.com",
    messagingSenderId: "454236921968",
    appId: "1:454236921968:web:4abafaa6e5135f1f5194b5"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();