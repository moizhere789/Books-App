import { initializeApp, getApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAqLeWuH668W_WQ8uM1vGRFDqZVf2e3p8s",
  authDomain: "books-app-a91cc.firebaseapp.com",
  projectId: "books-app-a91cc",
  storageBucket: "books-app-a91cc.appspot.com",
  messagingSenderId: "592924561605",
  appId: "1:592924561605:web:41e93f0cbfbf4bc12fe0ac"
};

let app;
let auth;
let firestore;
let storage;


if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
    firestore = getFirestore(app);
    storage = getStorage(app); // Initialize Firebase Storage
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
    storage = getStorage(app); // Ensure storage is initialized
  }
  
  export { auth, app, firestore, storage }; // Export storage