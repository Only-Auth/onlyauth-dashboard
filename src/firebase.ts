import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// }

const firebaseConfig = {
  apiKey: 'AIzaSyBURwz1NsS_jAtyhrC5Ni-6uN7MPMo-jOQ',
  authDomain: 'onlyauth-514a8.firebaseapp.com',
  projectId: 'onlyauth-514a8',
  storageBucket: 'onlyauth-514a8.appspot.com',
  messagingSenderId: '41073599842',
  appId: '1:41073599842:web:9cbfe7aa1e3ddba4c7f83b',
}

const app = initializeApp(firebaseConfig)

const storage = getStorage(app)

export { storage }
