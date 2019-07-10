import Rebase from "re-base";
import firebase from "firebase";

// Initialize Firebase
// Setup firebase account here apiKey etc.

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
