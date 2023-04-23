import { signOut as FB_signOut } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { LeftIcon } from '../components/icons'
import { auth } from '../firebase'

export default function Settings() {
	const navigate = useNavigate()

	function signOut() {
		FB_signOut(auth).then(() => navigate('/'))
	}

	return (
		<div className="space-y-10 inset-top px-main">
			<div className="flex items-center gap-x-3">
				<Link to="/app/habits" className="w-7">
					<LeftIcon />
				</Link>
				<div className="title">Settings</div>
			</div>
			<button
				onClick={signOut}
				className="bg-red-50 border border-red-500 text-red-500 font-medium py-2 text-center rounded-xl w-full">
				Sign out
			</button>
		</div>
	)
}
