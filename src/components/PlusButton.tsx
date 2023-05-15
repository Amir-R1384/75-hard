import Button from './Button'
import { MinusIcon, PlusIcon } from './icons'

interface Props {
	inverse?: boolean
	onClick: (e: React.MouseEvent) => void
}

export default function PlusButton({ onClick, inverse = false }: Props) {
	return (
		<Button
			onClick={onClick}
			className="border p-0.5 w-7 stroke-dark bg-gray-100 border-dark rounded-[10px]">
			{inverse ? <MinusIcon /> : <PlusIcon />}
		</Button>
	)
}
