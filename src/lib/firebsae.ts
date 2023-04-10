import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBdM6RC3vXHmL1TSG71IHkOGn_6M1KehEk",
  authDomain: "fir-react-typescript-203d4.firebaseapp.com",
  projectId: "fir-react-typescript-203d4",
  storageBucket: "fir-react-typescript-203d4.appspot.com",
  messagingSenderId: "769393149328",
  appId: "1:769393149328:web:ff471e227dcf00cc361f15",
  measurementId: "G-R3D4J90NXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth=getAuth(app)
const storageRef=getStorage()
const db=getFirestore()
export  {firebaseAuth,db,storageRef}