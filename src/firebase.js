const firebase = require('firebase')

const config = {
  apiKey: "AIzaSyA0MC8b3hnHc4teR3Hxg6WPiOvWdVVVkpU",
  authDomain: "sage-courier-161212.firebaseapp.com",
  databaseURL: "https://sage-courier-161212.firebaseio.com",
  projectId: "sage-courier-161212",
  storageBucket: "sage-courier-161212.appspot.com",
  messagingSenderId: "326422737876"
};
firebase.initializeApp(config)

const provider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth()
const storage = firebase.storage()
const database = firebase.database()

module.exports = {
  firebase,
  provider,
  auth,
  storage,
  database,
}