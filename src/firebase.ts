import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: 'hard-e8079.firebaseapp.com',
	projectId: 'hard-e8079',
	storageBucket: 'hard-e8079.appspot.com',
	messagingSenderId: '235605353349',
	appId: '1:235605353349:web:3537cdbb44bad7a5099aec'
}

const app = initializeApp(firebaseConfig)

// * Auth
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

async function authenticate() {
	try {
		const result = await signInWithPopup(auth, googleProvider)
		return result
	} catch (err) {
		console.log(err)
	}
}

// * Firestore
const db = getFirestore(app)
const usersCollection = collection(db, 'users')

// * Storage
const storage = getStorage(app)

export { auth, authenticate, usersCollection, storage }
