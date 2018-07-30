import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
// const firebase = require('firebase')
// const auth = require('firebase/auth');
// const storage = require('firebase/storage');
// const database = require('firebase/database');

const config = {
  apiKey: "AIzaSyA0MC8b3hnHc4teR3Hxg6WPiOvWdVVVkpU",
  authDomain: "sage-courier-161212.firebaseapp.com",
  databaseURL: "https://sage-courier-161212.firebaseio.com",
  projectId: "sage-courier-161212",
  storageBucket: "sage-courier-161212.appspot.com",
  messagingSenderId: "326422737876"
};
console.log('firebase: ', firebase)
if(!firebase.app.length) {
  firebase.initializeApp(config)
}



// const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const storage = firebase.storage()
const db = firebase.database()
console.log('db: ', db)
module.exports = {
  auth,
  storage,
  db,
}