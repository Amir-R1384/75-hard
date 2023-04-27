import { useEffect, useState } from 'react'

interface Props {
	dayOrDate: string
	percentage: number
	selected: boolean
}

export default function CalendarCell({ dayOrDate, percentage, selected }: Props) {
	const max = -10
	const min = 98

	const [value, setValue] = useState(min)

	useEffect(() => {
		setValue(Math.round(min + (percentage / 100) * (max - min)))
	}, [percentage])

	return (
		<div
			className={`
			 w-9 h-9 grid relative overflow-hidden transition-all transition-scale border place-content-center text-gray-800 rounded-full  border-dark ${
					selected && 'border-2 shadow-md'
				}`}>
			<div
				className="absolute flex flex-col -z-1 transition-all duration-1000"
				style={{ top: `${value}%` }}>
				<svg
					className="w-full scale-105"
					viewBox="0 0 466 605"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0 604C0 539.344 0 8.43757 0 8.43757C19.7432 14.6627 39.4863 24.6304 59.2295 34.5981C91.2641 50.7714 123.299 66.9447 155.333 67.1306C187.368 66.9447 219.403 50.7714 251.437 34.5981C271.18 24.6304 290.923 14.6627 310.667 8.43757C362.444 -7.28735 414.222 2.72852 440.111 8.43757L466 13.746C466 13.746 466 542.417 466 605C344.677 605 276.656 604 155.333 604C94.6719 604 60.6614 604 0 604Z"
						fill="#98B39D"
					/>
				</svg>
			</div>
			<span
				className={`z-10 transition-colors duration-1000 ${
					percentage === 100 ? 'text-white' : 'text-dark'
				}`}>
				{dayOrDate}
			</span>
		</div>
	)
}
