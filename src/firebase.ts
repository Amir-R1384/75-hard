import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { collection, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FB_API_KEY,
	authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FB_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
	messagingSenderId: (import.meta.env.VITE_FB_MESSAGING_SENDER_ID = 235605353349),
	appId: import.meta.env.VITE_FB_APP_ID
}

const app = initializeApp(firebaseConfig)

// * Auth
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
	prompt: 'select_account'
})

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

export { auth, authenticate, storage, usersCollection }
