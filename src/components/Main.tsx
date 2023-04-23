import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useLayoutEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom, userStateReadyAtom } from '../atoms'
import { auth, usersCollection } from '../firebase'
import { User } from '../types'
import Footer from './Footer'

export default function Main() {
	const [user, setUser] = useRecoilState(userAtom)
	const [userStateReady, setUserStateReady] = useRecoilState(userStateReadyAtom)

	useLayoutEffect(() => {
		onAuthStateChanged(auth, async user => {
			const userSnapshot = await getDoc(doc(usersCollection, user!.uid))
			const data = userSnapshot.data() as User
			setUser(data)
			setUserStateReady(true)
		})
	}, [])

	useEffect(() => {
		if (userStateReady) {
			const userRef = doc(usersCollection, auth.currentUser!.uid)
			setDoc(userRef, user)
		}
	}, [user])

	return (
		<div>
			<div className="px-main inset-top pb-32">
				<Outlet />
			</div>

			<Footer />
		</div>
	)
}
