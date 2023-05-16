import { useSetRecoilState } from 'recoil'
import { userAtom } from '../atoms'
import { Todo as TodoType } from '../types'
import Button from './Button'
import { MinusIcon } from './icons'

interface Props extends TodoType {
	disabled?: boolean
}

export default function Todo({ id, name, completed, date, disabled = false }: Props) {
	const setUser = useSetRecoilState(userAtom)

	function toggleTodo() {
		setUser(prev => {
			const newTodos = [...prev.todos]

			const targetTodoIndex = newTodos.findIndex(todo => todo.id === id)
			newTodos.splice(targetTodoIndex, 1, { id, name, completed: !completed, date })
			return { ...prev, todos: newTodos }
		})
	}

	function deleteTodo() {
		setUser(prev => {
			const newTodos = [...prev.todos]

			const targetTodoIndex = newTodos.findIndex(todo => todo.id === id)
			newTodos.splice(targetTodoIndex, 1)
			return { ...prev, todos: newTodos }
		})
	}

	return (
		<div className="w-full flex items-center justify-between">
			<div className="flex gap-x-3 items-center">
				{!disabled && (
					<Button
						onClick={toggleTodo}
						className={`${
							completed && 'bg-green'
						} w-5 h-5 cursor-pointer border border-dark rounded-md`}></Button>
				)}

				<div>{name}</div>
			</div>
			<Button onClick={deleteTodo} className="w-5 stroke-red-500">
				<MinusIcon />
			</Button>
		</div>
	)
}
