import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDn23ndp7XyfPp2_dI_Ob3uUf7ZG6ZoBqs',
  authDomain: 'socialchatapp-b781f.firebaseapp.com',
  projectId: 'socialchatapp-b781f',
  storageBucket: 'socialchatapp-b781f.appspot.com',
  messagingSenderId: '668891353518',
  appId: '1:668891353518:web:7fefe98f936e23e58db83f',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const authInstance = getAuth();
const firestoreInstance = getFirestore();
const realTimeDb = getDatabase();

export { authInstance, firestoreInstance, realTimeDb };
