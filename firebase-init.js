/**
 * =====================================================
 * SNK DESIGN AGENCY — Firebase setup (shared)
 * =====================================================
 * Every page that needs Firebase imports from this one file,
 * so you only paste your config in ONE place.
 *
 * HOW TO ACTIVATE:
 *   1. Firebase console → ⚙ Project settings → General →
 *      "Your apps" → Web app → copy the firebaseConfig object.
 *   2. Paste it below, replacing the YOUR_... placeholders.
 *   3. Save this file. Every page using it (browse.html,
 *      links-admin.html, client.html, admin.html,
 *      admin-login.html) will start using Firebase instead
 *      of this browser's local storage.
 *
 * Until you do that, pages fall back to local storage
 * automatically, so the demo keeps working either way.
 * =====================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ----- PASTE YOUR CONFIG HERE -----
const firebaseConfig = {
  apiKey: "AIzaSyD3XgCMw2fzRM0bfwmTyUH65aU_tdsoQ74",
  authDomain: "snkdesignsystem.firebaseapp.com",
  projectId: "snkdesignsystem",
  storageBucket: "snkdesignsystem.firebasestorage.app",
  messagingSenderId: "617416696026",
  appId: "1:617416696026:web:5ccb8a4aaf84afbf4a05e3"
};
// -----------------------------------

export const FIREBASE_READY = firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("YOUR_");

export const firebaseApp = FIREBASE_READY ? initializeApp(firebaseConfig) : null;
export const auth = FIREBASE_READY ? getAuth(firebaseApp) : null;
export const db = FIREBASE_READY ? getFirestore(firebaseApp) : null;
