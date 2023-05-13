import { ChangeEvent } from 'react'
import { Exercise as ExerciseType } from '../types'
import Button from './Button'
import { MinusIcon } from './icons'

interface Props extends ExerciseType {
	editMode: boolean
	setInputs: React.Dispatch<
		React.SetStateAction<{
			name: string
			exercises: ExerciseType[]
		}>
	>
}

export default function Exercise({ name, setsAndReps, weight, editMode, setInputs }: Props) {
	function deleteExercise() {
		setInputs(prev => {
			const newArray = [...prev.exercises]

			const targetIndex = prev.exercises.findIndex(el => el.name === name)
			newArray.splice(targetIndex, 1)

			return { ...prev, exercises: newArray }
		})
	}

	function onInputChange(e: ChangeEvent<HTMLInputElement>) {
		const { name: inputName, value } = e.target

		setInputs(prev => {
			const newArray = [...prev.exercises]

			const target = prev.exercises.find(el => el.name === name)!
			newArray.splice(newArray.indexOf(target), 1, { ...target, [inputName]: value })
			return { ...prev, exercises: newArray }
		})
	}

	const workoutInputClassName = `w-full ${editMode && 'bg-gray-50 border border-gray-100'}`

	return (
		<div className="!flex items-center workout">
			<Button
				onClick={deleteExercise}
				className={` ${
					editMode && '!w-4'
				} box-content stroke-red-400 stroke-2 scale-y-150 duration-300 w-0  transition-all translate border-red-400 rounded-lg`}>
				<MinusIcon />
			</Button>
			<div className="workout !border-0 !p-0">
				<input
					className={workoutInputClassName}
					disabled={!editMode}
					type="text"
					name="name"
					value={name}
					onChange={onInputChange}
				/>
				<input
					disabled={!editMode}
					className={workoutInputClassName}
					type="text"
					name="setsAndReps"
					value={setsAndReps}
					onChange={onInputChange}
				/>
				<input
					disabled={!editMode}
					className={workoutInputClassName}
					type="text"
					name="weight"
					value={weight}
					onChange={onInputChange}
				/>
			</div>
		</div>
	)
}
