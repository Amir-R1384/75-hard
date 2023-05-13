import { ButtonHTMLAttributes, useEffect, useState } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	activeclass?: string
}

export default function Button(props: Props) {
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (active === false) return
		setTimeout(() => {
			setActive(false)
		}, 400)
	}, [active])

	return (
		<button
			onMouseDown={() => setActive(true)}
			{...props}
			className={`${props.className} ${
				active && (props.activeclass ? props.activeclass : 'active')
			}`}></button>
	)
}
