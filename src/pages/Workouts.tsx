import { useRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'
import { userAtom } from '../atoms'
import { Workout } from '../components'
import { PlusIcon } from '../components/icons'

export default function Workouts() {
	const [user, setUser] = useRecoilState(userAtom)

	function addWorkout() {
		setUser(prev => ({
			...prev,
			workouts: [...prev.workouts, { id: uuid(), name: '', exercises: [], isNew: true }]
		}))
	}

	return (
		<div className="flex flex-col gap-y-5">
			<div className="flex w-full justify-between items-center mb-5">
				<div className="title">Workouts</div>
				<button onClick={addWorkout} className="icon-button w-7 rounded-[10px]">
					<PlusIcon />
				</button>
			</div>
			{user.workouts.map((workout, i) => (
				<Workout key={i} {...workout} />
			))}
		</div>
	)
}
