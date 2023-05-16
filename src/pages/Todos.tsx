import moment from 'moment'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'
import { userAtom } from '../atoms'
import { Button, PlusButton, Todo } from '../components'
import { CheckmarkIcon } from '../components/icons'
import { Todo as TodoType } from '../types'
import { formatDate } from '../util'

const today = formatDate(moment())

export default function Todos() {
	const [user, setUser] = useRecoilState(userAtom)
	const [view, setView] = useState<'list' | 'calendar'>('list') // ! For future update
	const [todoInput, setTodoInput] = useState({
		visible: false,
		date: today,
		name: ''
	})

	const missedTodos: TodoType[] = []
	const normalTodos: { [key: string]: TodoType[] } = {}
	const finishedTodos: TodoType[] = []

	if (user.todos?.length) {
		const sorted = sortTodos([...user.todos])

		for (let i = 0; i < sorted.length; i++) {
			const todo = sorted[i]

			if (moment(todo.date, 'YYYY-MM-DD').isBefore(moment().startOf('day'))) {
				if (!todo.completed) {
					missedTodos.push(todo)
				}
				sorted.splice(i, 1)
				i--
				continue
			}

			if (todo.completed) {
				finishedTodos.push(todo)
				sorted.splice(i, 1)
				i--
				continue
			}

			if (normalTodos[todo.date]) {
				normalTodos[todo.date].push(todo)
			} else {
				normalTodos[todo.date] = [todo]
			}
		}
	}

	function addTodo() {
		if (!todoInput.date || !todoInput.name) {
			return alert('Data incomplete!!')
		}

		setUser(prev => ({
			...prev,
			todos: [
				...prev.todos,
				{
					id: uuid(),
					name: todoInput.name,
					date: todoInput.date,
					completed: false
				}
			]
		}))

		setTodoInput({
			visible: false,
			name: '',
			date: today
		})
	}

	function sortTodos(array: TodoType[]) {
		return array.sort((a, b) => {
			const momentA = moment(a.date, 'YYYY-MM-DD')
			const momentB = moment(b.date, 'YYYY-MM-DD')

			if (momentA.isBefore(momentB)) return -1
			else if (momentA.isAfter(momentB)) return 1
			else return 0
		})
	}
	return (
		<div className="flex flex-col gap-y-10">
			<div className="flex w-full justify-between items-center">
				<div className="title">Todos</div>
				<div className="flex gap-x-5 items-center">
					{/* ! For future update */}

					{/* <div className=" border border-dark rounded-lg overflow-hidden flex self-start text-sm">
						<button
							onClick={() => setView('list')}
							className={`py-1 px-3 ${
								view === 'list' && 'bg-green-light'
							} transition-colors duration-300 border-r border-dark`}>
							List
						</button>
						<button
							onClick={() => setView('calendar')}
							className={`py-1 px-3 ${
								view === 'calendar' && 'bg-green-light'
							} transition-colors duration-300`}>
							Calendar
						</button>
					</div> */}
					<PlusButton
						inverse={todoInput.visible}
						onClick={() => setTodoInput(prev => ({ ...prev, visible: !prev.visible }))}
					/>
				</div>
			</div>

			<div
				style={{ transformOrigin: 'top' }}
				className={`${
					!todoInput.visible && 'scale-y-0 opacity-0 -mb-32'
				} habit transition-all w-full flex duration-500 p-3 gap-x-3 justify-between items-center bg-gray-50`}>
				<div className="flex flex-col gap-y-2">
					<input
						className="bg-gray-100 border rounded-md border-gray-300"
						type="date"
						placeholder="2023-05-05"
						value={todoInput.date}
						onChange={e => setTodoInput(prev => ({ ...prev, date: e.target.value }))}
						min={today}
					/>
					<input
						className="bg-gray-100 py-1 px-3 w-full border rounded-md border-gray-300"
						type="text"
						placeholder="Todo name..."
						value={todoInput.name}
						onChange={e => setTodoInput(prev => ({ ...prev, name: e.target.value }))}
					/>
				</div>
				<Button onClick={addTodo} className="w-7 stroke-dark box-content">
					<CheckmarkIcon />
				</Button>
			</div>

			{missedTodos.length ? (
				<div className="space-y-2">
					<div className="text-xl text-red-500">Missing todos</div>
					<div className="space-y-2 pl-2">
						{missedTodos.map((todo, i) => (
							<Todo key={`missed-${i}`} {...todo} disabled />
						))}
					</div>
				</div>
			) : (
				<></>
			)}

			{Object.values(normalTodos).length ? (
				Object.values(normalTodos).map((todos, i) => (
					<div key={i} className="space-y-2">
						<div className="text-xl">{`${moment(todos[0].date, 'YYYY-MM-DD').format(
							'ddd'
						)} -  ${moment(todos[0].date, 'YYYY-MM-DD').format('MMM')} ${moment(
							todos[0].date,
							'YYYY-MM-DD'
						).format('Do')}`}</div>
						<div className="space-y-2 pl-2">
							{todos.map((todo, j) => (
								<Todo key={`normal-${j}`} {...todo} />
							))}
						</div>
					</div>
				))
			) : (
				<></>
			)}

			{finishedTodos.length ? (
				<div className="space-y-2">
					<div className="text-xl">Done</div>
					<div className="space-y-2 pl-2">
						{finishedTodos.map((todo, i) => (
							<Todo key={`done-${i}`} {...todo} />
						))}
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}
