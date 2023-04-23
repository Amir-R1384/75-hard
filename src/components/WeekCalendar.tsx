import moment from 'moment'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { calendarOpenAtom, userAtom } from '../atoms'
import CalendarCell from './CalendarCell'

const days = ['m', 't', 'w', 't', 'f', 's', 's']

export default function WeekCalendar() {
	const setCalendarOpen = useSetRecoilState(calendarOpenAtom)
	const { habits } = useRecoilValue(userAtom)
	const week: string[] = []

	for (let i = 0; i < 7; i++) {
		const firstDayOfWeek = moment().startOf('isoWeeks')
		const date = firstDayOfWeek.add(i, 'days')
		week.push(date.format('MM-DD-YYYY'))
	}

	const percentages = week.map(date => {
		const habitsAtDate = habits[date]

		if (typeof habitsAtDate !== 'object') return 0

		const completedHabitsNum = habitsAtDate.filter(habit => habit.completed).length
		const totalHabitsNum = habitsAtDate.length

		return Math.round((completedHabitsNum / totalHabitsNum) * 100)
	})

	return (
		<div
			onClick={() => setCalendarOpen(true)}
			className="w-full flex justify-between items-center">
			{days.map((el, i) => (
				<CalendarCell
					key={i}
					dayOrDate={el}
					percentage={percentages[i]}
					selected={i === moment().isoWeekday() - 1}
				/>
			))}
		</div>
	)
}
