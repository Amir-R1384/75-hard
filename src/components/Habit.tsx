import moment from 'moment'
import { MouseEvent, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../atoms'
import { Habit as HabitType } from '../types'
import Button from './Button'
import { CheckmarkIcon, MinusIcon } from './icons'
import TrashIcon from './icons/Trash.Icon'

const todayDate = moment().format('MM-DD-YYYY')

export default function Habit({ name, completed = false }: HabitType) {
	const setUser = useSetRecoilState(userAtom)
	const [deleteButtonVisible, setDeleteButtonVisible] = useState(false)

	function toggleHabit(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()

		setUser(prev => {
			const newArray = [...prev.habits[todayDate]]

			const targetHabit = newArray.find(habit => habit.name === name)!
			const index = newArray.indexOf(targetHabit)

			newArray.splice(index, 1, { name, completed: !completed })

			return { ...prev, habits: { ...prev.habits, [todayDate]: newArray } }
		})
	}

	function deleteHabit() {
		setDeleteButtonVisible(prev => !prev) // Fixes a temporary bug

		setUser(prev => {
			const newArray = [...prev.habits[todayDate]]

			const targetHabitIndex = newArray.findIndex(habit => habit.name === name)
			newArray.splice(targetHabitIndex, 1)

			return {
				...prev,
				habits: { ...prev.habits, [todayDate]: newArray },
				recentHabits: newArray.map(habit => ({
					name: habit.name,
					completed: false
				}))
			}
		})
	}

	return (
		<div className="w-full flex items-center">
			<Button
				onClick={deleteHabit}
				className={` ${
					deleteButtonVisible && '!w-6 !p-1 !mr-2 !border'
				} box-content stroke-red-400 duration-300 w-0 p-0 mr-0 border-0  transition-all translate border-red-400 rounded-lg`}>
				<TrashIcon />
			</Button>

			<div
				onClick={() => setDeleteButtonVisible(prev => !prev)}
				className={`${completed && ' !text-white'} relative habit`}>
				<div
					className={`${
						completed ? 'text-white' : 'text-dark'
					} transition-all duration-1000`}>
					{name}
				</div>
				<Button
					activeclass="bg-green-light"
					onClick={toggleHabit}
					className={` ${
						completed ? 'stroke-white' : 'stroke-dark'
					} w-6 box-content p-3 `}>
					{completed ? <MinusIcon /> : <CheckmarkIcon />}
				</Button>
				<div
					className={`absolute rounded-r-full left-0 h-full top-0 transition-all duration-1000 bg-green -z-10 ${
						completed ? 'w-[103%]' : 'w-0'
					} `}></div>
			</div>
		</div>
	)
}
