import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { loadingAtom, userAtom } from './atoms'
import { auth, authenticate, usersCollection } from './firebase'

export default function App() {
	const navigate = useNavigate()
	const setUser = useSetRecoilState(userAtom)
	const [loading, setLoading] = useRecoilState(loadingAtom)

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user !== null) {
				navigate('/app/habits')
			}
			setLoading(false)
		})
	}, [])

	async function doesUserExist(uid: string) {
		const userSnapshot = await getDoc(doc(usersCollection, uid))
		return userSnapshot.exists()
	}

	function signIn() {
		authenticate().then(async result => {
			const { uid } = result!.user

			if ((await doesUserExist(uid)) === false) {
				const blankUser = {
					habits: {},
					recentHabits: [],
					workouts: [],
					recipes: []
				}

				await setDoc(doc(usersCollection, uid), blankUser)
				setUser(blankUser)
			}

			navigate('/app/habits')
		})
	}

	return (
		<div
			className="max-w-screen-md px-5 mx-auto transition-opacity"
			style={{ opacity: loading ? 0 : 1 }}>
			<div className="space-y-8 mt-20 text-center">
				<h1 className="text-green font-bold text-4xl drop-shadow-md">75 Hard</h1>
				<div className="text-dark text-xl drop-shadow-md">
					A journey to regain your mental health
				</div>
				<button
					onClick={signIn}
					className="rounded-xl font-medium hover:brightness-95 transition-all active:brightness-90 duration-200 bg-green border-2 border-dark text-white px-5 py-2">
					Sign up with Google
				</button>
			</div>
		</div>
	)
}
