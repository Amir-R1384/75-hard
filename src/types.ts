export type RecipeCategory = 'meal' | 'breakfast' | 'snack'

export interface Habit {
	name: string
	completed: boolean
}

export interface Todo {
	id: string
	name: string
	completed: boolean
	date: string
}

export interface Workout {
	id: string
	name: string
	exercises: Exercise[]
}

export interface Exercise {
	name: string
	setsAndReps: string
	weight: string
}

export interface Recipe {
	id: string
	name: string
	ingredients: string[]
	instructions: string[]
	category: RecipeCategory
	imageName: string
}

export interface User {
	recentHabits: Habit[]
	habits: { [key: string]: Habit[] }
	todos: Todo[]
	workouts: Workout[]
	recipes: Recipe[]
}
