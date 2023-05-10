export type RecipeCategory = 'meal' | 'breakfast' | 'snack'

export interface Habit {
	name: string
	completed: boolean
}

export interface Workout {
	name: string
	exercises: Exercise[]
}

export interface Exercise {
	name: string
	setsAndReps: string
	weight: string
}

export interface Recipe {
	name: string
	ingredients: string[]
	instructions: string[]
	category: RecipeCategory
	imageName: string
}

export interface User {
	recentHabits: Habit[]
	habits: { [key: string]: Habit[] }
	workouts: Workout[]
	recipes: Recipe[]
}
