import { MinusIcon, PlusIcon } from './icons'

interface Props {
	inverse?: boolean
	onClick: (e: React.MouseEvent) => void
}

export default function PlusButton({ onClick, inverse = false }: Props) {
	return (
		<button
			onClick={onClick}
			className="border p-0.5 w-7 bg-gray-100 border-dark rounded-[10px] transition-scale">
			{inverse ? <MinusIcon /> : <PlusIcon />}
		</button>
	)
}
