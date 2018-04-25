import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCYc-icr8_xe1Fo7hjGZlM5m7nYG3hib2c",
  authDomain: "cake-recipes-c1a65.firebaseapp.com",
  databaseURL: "https://cake-recipes-c1a65.firebaseio.com",
  projectId: "cake-recipes-c1a65",
  storageBucket: "cake-recipes-c1a65.appspot.com",
  messagingSenderId: "963367556339"
};

var fire = firebase.initializeApp(config);

export default fire;
