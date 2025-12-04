
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase project configuration
// You can find this in your Firebase project settings -> Project settings -> General -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyCm2kW4K9Hl1VzaiW3ZYwNdLlSZxdduUro",
  authDomain: "id-search-f9ddc.firebaseapp.com",
  projectId: "id-search-f9ddc",
  storageBucket: "id-search-f9ddc.firebasestorage.app",
  messagingSenderId: "543117017622",
  appId: "1:543117017622:web:98650a0fe943ab00ebeb37",
  measurementId: "G-GK0SB6LSXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// IMPORTANT: Replace the placeholder values above with your actual Firebase project configuration.
// You can find these values in the Firebase Console under Project settings -> General -> Your apps.
