import firebase from "firebase";
import config from '../config/config';

firebase.initializeApp(config);
const db = firebase.database();

export default db;



