import { atom } from 'recoil'
import { Habit, Recipe, User, Workout } from './types'

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

export const workoutsAtom = atom<{ name: string; workouts: Workout[] }[]>({
	key: 'workoutsAtom',

	default: [
		{
			name: 'Push Day',
			workouts: [
				{ name: 'Bench Press', setsAndReps: '3 - 5', weight: '100 lbs' },
				{ name: 'Incline bench', setsAndReps: '3 - 5', weight: '80 lbs' }
			]
		}
	]
})

export const recipesAtom = atom<Recipe[]>({
	key: 'recipesAtom',
	default: [
		{
			name: 'Protein Shake',
			category: 'snack',
			ingredients: ['500ml of milk', '1 banana', '1 scoop of protein powder'],
			instructions: ['Mix everything in a blender', 'Blend', 'Enjoy :)']
		}
	]
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
