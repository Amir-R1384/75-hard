import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase'

export default function Header() {
	const [userFirstLetter, setUserFirstLetter] = useState('')

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			setUserFirstLetter(user!.displayName![0])
		})
	}, [])

	return (
		<div className="w-full flex justify-between items-center">
			<div className="title">Welcome back</div>
			<Link
				className="w-9 h-9 text-xl shadow-lg bg-green border border-dark text-white font-medium grid place-content-center rounded-full"
				to="/settings">
				{userFirstLetter}
			</Link>
		</div>
	)
}
