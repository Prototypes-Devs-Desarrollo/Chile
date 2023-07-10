// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDGY8HM1sevaBYIzhl0S4o5Co66CmruXWU',
  authDomain: 'happy-clean-8e79e.firebaseapp.com',
  projectId: 'happy-clean-8e79e',
  storageBucket: 'happy-clean-8e79e.appspot.com',
  messagingSenderId: '334861059328',
  appId: '1:334861059328:web:f820f31c3194ae680f9fe5',
  measurementId: 'G-S9910X0XEC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
