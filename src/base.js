import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAcp7ylUvyzwcc6ppxL5JbQWcun3u5Mhlk",
  authDomain: "catchoftheday-84db3.firebaseapp.com",
  databaseURL: "https://catchoftheday-84db3.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
export { firebaseApp };