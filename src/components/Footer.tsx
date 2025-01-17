import { Link, useLocation } from 'react-router-dom'

export default function Footer() {
	return (
		<div className="flex fixed backdrop-blur-lg pt-3 bottom-0 justify-around items-center inset-bottom text-dark text-sm w-full z-50">
			<FooterLink name="Habits" icon="chart" />
			<FooterLink name="Todos" icon="check" />
			<FooterLink name="Workouts" icon="dumbbell" />
			<FooterLink name="Recipes" icon="book" />
		</div>
	)
}

interface Props {
	name: string
	icon: string
}

function FooterLink({ name, icon }: Props) {
	const location = useLocation()
	const isSelected = location.pathname.slice(5) === name.toLowerCase()

	return (
		<Link
			to={`/app/${name.toLowerCase()}`}
			className={`flex flex-col cursor-pointer items-center gap-1 ${
				isSelected && 'text-green'
			}`}>
			{icon === 'chart' ? (
				<ChartIcon isSelected={isSelected} />
			) : icon === 'dumbbell' ? (
				<DumbbellIcon isSelected={isSelected} />
			) : icon === 'book' ? (
				<BookIcon isSelected={isSelected} />
			) : (
				<CheckIcon isSelected={isSelected} />
			)}
			<div>{name}</div>
		</Link>
	)
}

function ChartIcon({ isSelected }: { isSelected: boolean }) {
	return (
		<svg
			className={`${isSelected && ' fill-green'} stroke-dark`}
			width="29"
			height="26"
			fill="none"
			viewBox="0 0 29 26"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M26.1219 6.76475L25.7683 7.11833L25.7739 7.12391L18.9846 13.9132C18.4823 14.4155 17.6661 14.4155 17.1638 13.9132L13.9607 10.7101L13.6073 10.3567L13.2538 10.7099L8.26496 15.6931L8.26476 15.6933C7.76248 16.1956 6.94625 16.1956 6.44396 15.6933C5.94168 15.191 5.94168 14.3748 6.44396 13.8725L12.694 7.62253C13.1962 7.12024 14.0125 7.12024 14.5148 7.62253L17.7179 10.8257L18.0716 11.1794L18.4252 10.8255L24.3011 4.94396C24.3012 4.94391 24.3012 4.94386 24.3013 4.94381C24.8035 4.44167 25.6197 4.44172 26.1219 4.94396C26.6242 5.44624 26.6242 6.26247 26.1219 6.76475ZM2.00001 1C2.71159 1 3.28572 1.57413 3.28572 2.28571V21.0357C3.28572 21.8029 3.91137 22.4286 4.67858 22.4286H27C27.7116 22.4286 28.2857 23.0027 28.2857 23.7143C28.2857 24.4259 27.7116 25 27 25H4.67858C2.4882 25 0.714294 23.2261 0.714294 21.0357V2.28571C0.714294 1.57413 1.28843 1 2.00001 1Z" />
		</svg>
	)
}

function DumbbellIcon({ isSelected }: { isSelected: boolean }) {
	return (
		<svg
			className={`${isSelected && ' fill-green'} stroke-dark`}
			width="43"
			height="26"
			fill="none"
			viewBox="0 0 43 26"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M8.5 21.3333V20.8333H8H4.88462C4.01342 20.8333 3.3077 20.1277 3.3077 19.25V15.0833V14.5833H2.8077C1.93649 14.5833 1.23077 13.8777 1.23077 13C1.23077 12.1223 1.93649 11.4167 2.8077 11.4167H3.3077V10.9167V6.75C3.3077 5.87234 4.01342 5.16667 4.88462 5.16667H8H8.5V4.66667V2.58333C8.5 1.70568 9.20572 1 10.0769 1H11.1154C11.9866 1 12.6923 1.70568 12.6923 2.58333V10.9167V15.0833V23.4167C12.6923 24.2943 11.9866 25 11.1154 25H10.0769C9.20572 25 8.5 24.2943 8.5 23.4167V21.3333ZM34.5 4.66667V5.16667H35H38.1154C38.9866 5.16667 39.6923 5.87234 39.6923 6.75V10.9167V11.4167H40.1923C41.0635 11.4167 41.7692 12.1223 41.7692 13C41.7692 13.8777 41.0635 14.5833 40.1923 14.5833H39.6923V15.0833V19.25C39.6923 20.1277 38.9866 20.8333 38.1154 20.8333H35H34.5V21.3333V23.4167C34.5 24.2943 33.7943 25 32.9231 25H31.8846C31.0134 25 30.3077 24.2943 30.3077 23.4167V15.0833V10.9167V2.58333C30.3077 1.70568 31.0134 1 31.8846 1H32.9231C33.7943 1 34.5 1.70568 34.5 2.58333V4.66667ZM27.2308 14.5833H15.7692V11.4167H27.2308V14.5833Z" />
		</svg>
	)
}

function BookIcon({ isSelected }: { isSelected: boolean }) {
	return (
		<svg
			className={`${isSelected && ' fill-green'} stroke-dark`}
			width="28"
			height="26"
			viewBox="0 0 28 26"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path d="M24.6758 22.375V22.875H25.1758C26.0159 22.875 26.5385 23.4281 26.5385 23.9375C26.5385 24.4469 26.0159 25 25.1758 25H23.3132H6.54945C3.6547 25 1.46154 23.0455 1.46154 20.8125V5.1875C1.46154 2.95445 3.6547 1 6.54945 1H23.3132H25.1758C26.0159 1 26.5385 1.55309 26.5385 2.0625V17.6875C26.5385 18.1969 26.0159 18.75 25.1758 18.75H24.6758V19.25V22.375ZM21.9506 19.25V18.75H21.4506H6.54945C5.32894 18.75 4.18681 19.5934 4.18681 20.8125C4.18681 22.0316 5.32894 22.875 6.54945 22.875H21.4506H21.9506V22.375V19.25ZM9.34341 6.25C8.64094 6.25 7.91209 6.74672 7.91209 7.53125C7.91209 8.31578 8.64094 8.8125 9.34341 8.8125H20.5192C21.2217 8.8125 21.9506 8.31578 21.9506 7.53125C21.9506 6.74672 21.2217 6.25 20.5192 6.25H9.34341ZM20.5192 9.375H9.34341C8.64094 9.375 7.91209 9.87172 7.91209 10.6562C7.91209 11.4408 8.64094 11.9375 9.34341 11.9375H20.5192C21.2217 11.9375 21.9506 11.4408 21.9506 10.6562C21.9506 9.87172 21.2217 9.375 20.5192 9.375Z" />
		</svg>
	)
}

function CheckIcon({ isSelected }: { isSelected: boolean }) {
	return (
		<svg
			className={`${isSelected && ' fill-green'} stroke-dark`}
			width="42"
			height="26"
			viewBox="0 0 42 41"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.8 1.5C3.6561 1.5 1.1 3.94959 1.1 6.9625V34.275C1.1 37.2879 3.6561 39.7375 6.8 39.7375H35.3C38.4439 39.7375 41 37.2879 41 34.275V6.9625C41 3.94959 38.4439 1.5 35.3 1.5H6.8ZM31.1141 16.6072L19.7141 27.5322C18.8769 28.3345 17.5231 28.3345 16.6948 27.5322L10.9948 22.0697C10.1577 21.2674 10.1577 19.9701 10.9948 19.1763C11.832 18.3825 13.1858 18.374 14.0141 19.1763L18.2 23.1878L28.0859 13.7053C28.9231 12.903 30.2769 12.903 31.1052 13.7053C31.9334 14.5076 31.9423 15.8049 31.1052 16.5987L31.1141 16.6072Z"
				strokeWidth="2"
			/>
		</svg>
	)
}
