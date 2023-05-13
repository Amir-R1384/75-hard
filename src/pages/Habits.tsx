import moment from 'moment'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAtom, userStateReadyAtom } from '../atoms'
import { Button, Calendar, Habit, Header, PlusButton, WeekCalendar } from '../components'
import { CheckmarkIcon } from '../components/icons'

export default function Habits() {
	const [user, setUser] = useRecoilState(userAtom)
	const userStateReady = useRecoilValue(userStateReadyAtom)
	const [habitInput, setHabitInput] = useState({ visible: false, value: '' })

	const todayDate = moment().format('MM-DD-YYYY')

	useEffect(() => {
		if (!userStateReady) return

		if (!user.habits[todayDate]) {
			setUser(prev => ({
				...prev,
				habits: { ...prev.habits, [todayDate]: user.recentHabits }
			}))
		}
	}, [user, userStateReady])

	function addHabit() {
		setUser(prev => {
			const newHabits = {
				...prev.habits,
				[todayDate]: [
					...prev.habits[todayDate],
					{ name: habitInput.value, completed: false }
				]
			}

			return {
				...prev,
				habits: newHabits,
				recentHabits: newHabits[todayDate].map(habit => ({
					name: habit.name,
					completed: false
				}))
			}
		})

		toggleHabitInput()
	}

	function toggleHabitInput() {
		setHabitInput(prev => ({ value: '', visible: !prev.visible }))
	}

	return (
		<div className="space-y-10">
			<Header />
			<div>
				<WeekCalendar />
				<Calendar />
			</div>

			<div className="gap-y-3 flex flex-col transition-all">
				<div className="flex justify-between stroke-dark items-center w-full mb-1">
					<div className="title">Habits</div>
					<PlusButton inverse={habitInput.visible} onClick={toggleHabitInput} />
				</div>

				{user.habits[todayDate] &&
					user.habits[todayDate].map((habit, i) => <Habit key={i} {...habit} />)}

				<div
					style={{ transformOrigin: 'top' }}
					className={`${
						habitInput.visible ? 'scale-y-100' : 'scale-y-0'
					} habit transition-all w-full flex duration-500 pl-3 justify-between items-center bg-gray-50`}>
					<input
						type="text"
						className="placeholder-gray-400 text-dark max-w-[50%] bg-transparent"
						placeholder="New habit..."
						value={habitInput.value}
						onChange={e => setHabitInput(prev => ({ ...prev, value: e.target.value }))}
					/>
					<Button onClick={addHabit} className="w-6 stroke-dark p-3 box-content">
						<CheckmarkIcon />
					</Button>
				</div>
			</div>
		</div>
	)
}
