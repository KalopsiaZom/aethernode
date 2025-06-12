import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnmDxSinAauz_TMXWWkkpFVJP4caRQQts",
  authDomain: "aethernode-c78a9.firebaseapp.com",
  projectId: "aethernode-c78a9",
  storageBucket: "aethernode-c78a9.appspot.com",
  messagingSenderId: "234751882540",
  appId: "1:234751882540:web:64a40ddce10e69f70e6889",
  measurementId: "G-T5HCNXNLLF"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});

// Optional: only run analytics in the browser
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
