import { MouseEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms'
import { Workout as WorkoutType } from '../types'
import Button from './Button'
import Exercise from './Exercise'
import { CheckmarkIcon, PencilIcon, PlusIcon } from './icons'
import TrashIcon from './icons/Trash.Icon'

interface Props extends WorkoutType {
	isNew?: boolean
}

export default function Workout({ id, name, exercises, isNew }: Props) {
	const [expanded, setExpanded] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [inputs, setInputs] = useState({ name, exercises })
	const [user, setUser] = useRecoilState(userAtom)

	function deleteWorkout(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()

		setUser(prev => {
			const newArray = [...prev.workouts]
			const targetWorkoutIndex = prev.workouts.findIndex(workout => workout.id === id)
			newArray.splice(targetWorkoutIndex, 1)
			return { ...prev, workouts: newArray }
		})
	}

	function toggleEditMode(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()
		setEditMode(prev => {
			if (prev === true) {
				saveWorkout()
			}
			return !prev
		})
	}

	function saveWorkout() {
		setUser(prev => {
			const newArray = [...prev.workouts]
			const targetWorkout = prev.workouts.find(workout => workout.id === id)!
			newArray.splice(newArray.indexOf(targetWorkout), 1, { id, ...inputs })
			return { ...prev, workouts: newArray }
		})
	}

	function addExercise() {
		setInputs(prev => ({
			...prev,
			exercises: [...prev.exercises, { name: '', setsAndReps: '', weight: '' }]
		}))
	}

	useEffect(() => {
		if (isNew) {
			setExpanded(true)
			setEditMode(true)
		}
	}, [])

	useEffect(() => {
		const { name, exercises } = user.workouts.find(workout => workout.id === id)!
		setInputs({ name, exercises })
	}, [user])

	return (
		<div className={`${expanded ? 'bg-white' : 'bg-green-light'} expandable`}>
			<div
				onClick={() => setExpanded(prev => !prev)}
				className="flex w-full justify-between items-center p-3">
				<div className="flex items-center">
					<Button
						onClick={deleteWorkout}
						className={` ${
							editMode && '!w-5 !p-1 !mr-4 !border'
						} box-content stroke-red-400 duration-500 w-0 p-0 mr-0 border-0  transition-all translate border-red-400 rounded-lg`}>
						<TrashIcon />
					</Button>
					<input
						type="text"
						disabled={!editMode}
						placeholder="Workout name..."
						className={`${
							editMode && 'border border-gray-200 p-1'
						} text-lg font-medium placeholder-gray-400 transition-all duration-700 w-full rounded-lg`}
						value={inputs.name}
						onClick={e => e.stopPropagation()}
						onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
					/>
				</div>

				<Button
					onClick={toggleEditMode}
					className="p-1 rounded-md box-content stroke-dark min-w-[24px] ml-3">
					{editMode ? <CheckmarkIcon /> : <PencilIcon />}
				</Button>
			</div>

			<div
				style={{ maxHeight: expanded ? `${inputs.exercises.length * 40 + 100}px` : 0 }}
				className={`${
					expanded ? ' mt-3 opacity-100' : 'mt-0 opacity-0'
				} transition-all duration-500 overflow-hidden`}>
				<div className="workout text-sm">
					<div className="text-dark">Name</div>
					<div>Sets/Reps</div>
					<div>Weight</div>
				</div>

				{inputs.exercises.map((exercise, i) => (
					<Exercise key={i} {...exercise} editMode={editMode} setInputs={setInputs} />
				))}

				<Button
					onClick={addExercise}
					className={`${
						editMode ? 'max-h-[50px] border-t py-1' : ' max-h-0 border-0 py-0'
					}  border-gray-300 grid w-full rounded-b-xl place-content-center bg-gray-100 overflow-hidden transition-all duration-500`}>
					<div className="w-5">
						<PlusIcon />
					</div>
				</Button>
			</div>
		</div>
	)
}
