import { atom } from 'recoil'
import { Exercise, Habit, Recipe, User } from './types'

export const loadingAtom = atom({
	key: 'loadingAtom',
	default: true
})

export const todayHabitsAtom = atom<Habit[]>({
	key: 'todayHabitsAtom',
	default: []
})

export const habits = atom<{ [key: string]: Habit[] }>({
	key: 'habitsAtom',
	default: {
		'04-01-2023': [
			{ name: 'Drink Water', completed: true },
			{ name: 'Workout', completed: false }
		],
		'04-02-2023': [
			{ name: 'Drink Water', completed: false },
			{ name: 'Workout', completed: false }
		]
	}
})

export const calendarOpenAtom = atom({
	key: 'calendarOpenAtom',
	default: false
})

export const workoutsAtom = atom<{ name: string; exercises: Exercise[] }[]>({
	key: 'workoutsAtom',
	default: []
})

export const recipesAtom = atom<Recipe[]>({
	key: 'recipesAtom',
	default: []
})

export const userAtom = atom<User>({
	key: 'userAtom',
	default: {
		recentHabits: [],
		habits: {},
		workouts: [],
		recipes: []
	}
})

export const userStateReadyAtom = atom({
	key: 'userStateReadyAtom',
	default: false
})
