import moment from 'moment'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { calendarOpenAtom, userAtom } from '../atoms'
import Button from './Button'
import CalendarCell from './CalendarCell'
import { CloseIcon, LeftIcon, RightIcon } from './icons'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Calendar() {
	const { habits } = useRecoilValue(userAtom)
	const [calendarOpen, setCalendarOpen] = useRecoilState(calendarOpenAtom)
	const [currentMonthYear, setCurrentMonthYear] = useState({
		year: moment().year(),
		month: moment().month()
	})

	function getCurrentMoment() {
		return moment(`${currentMonthYear.month + 1}-${currentMonthYear.year}`, 'MM-YYYY')
	}

	function changeMonth(direction: 'previous' | 'next') {
		setCurrentMonthYear(prev => {
			const date = moment().year(prev.year).month(prev.month)

			if (direction === 'previous') {
				date.subtract(1, 'month')
			} else {
				date.add(1, 'month')
			}

			return {
				month: date.month(),
				year: date.year()
			}
		})
	}

	function createCalendar(): (number | null)[] {
		const firstDayOfMonthIndex = getCurrentMoment().date(1).isoWeekday() - 1 // 1 = monday, 7 = sunday
		const array = []
		let date = 1

		const numberOfCells = getCurrentMoment().daysInMonth() + firstDayOfMonthIndex

		for (let i = 0; i < numberOfCells; i++) {
			if (i < firstDayOfMonthIndex) {
				array.push(null)
			} else {
				array.push(date)
				date++
			}
		}

		return array
	}

	const percentages = createCalendar().map(el => {
		if (el === null) return 0

		const date = getCurrentMoment().date(el).format('MM-DD-YYYY')
		const habitsAtDate = habits[date]

		if (typeof habitsAtDate !== 'object') return 0

		const completedHabitsNum = habitsAtDate.filter(habit => habit.completed).length
		const totalHabitsNum = habitsAtDate.length

		return Math.round((completedHabitsNum / totalHabitsNum) * 100)
	})

	return (
		<div
			className={` ${
				calendarOpen
					? 'max-h-[500px] p-3 border mt-10'
					: 'max-h-0 py-0 px-3 border-0 opacity-0 mt-0'
			}  flex relative overflow-hidden transition-all duration-700 flex-col gap-y-3 text-dark border-dark rounded-2xl`}>
			<div className="flex justify-center items-center gap-x-2">
				<Button
					onClick={() => changeMonth('previous')}
					className="border box-content bg-gray-100  p-0.5 w-5 rounded-lg border-dark">
					<LeftIcon />
				</Button>
				<div className="w-40 text-center">
					{getCurrentMoment().format('MMMM')} {currentMonthYear.year}
				</div>
				<Button
					onClick={() => changeMonth('next')}
					className="border box-content bg-gray-100  p-0.5 w-5 rounded-lg border-dark">
					<RightIcon />
				</Button>
			</div>

			<div className="grid grid-cols-7 place-items-center gap-3 text-center">
				{days.map((day, i) => (
					<div key={i}>{day}</div>
				))}

				{createCalendar().map((el, i) =>
					el === null ? (
						<div key={i}></div>
					) : (
						<CalendarCell
							key={i}
							dayOrDate={el.toString()}
							percentage={percentages[i]}
							selected={false}
						/>
					)
				)}
			</div>
			<Button
				onClick={() => setCalendarOpen(false)}
				className="absolute right-3 top-3 w-6 h-6 border rounded-lg border-dark p-px bg-gray-100">
				<CloseIcon />
			</Button>
		</div>
	)
}
