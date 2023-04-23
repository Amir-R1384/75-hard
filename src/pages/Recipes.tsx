import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms'
import { Recipe } from '../components'
import { LeftIcon, PlusIcon } from '../components/icons'
import { RecipeCategory } from '../types'

const titles: { [key: string]: string } = {
	meal: 'Meals',
	breakfast: 'Breakfasts',
	snack: 'Snacks'
}

export default function Recipes() {
	const [user, setUser] = useRecoilState(userAtom)
	const { state } = useLocation()
	const { category }: { category: RecipeCategory } = state

	function addRecipe() {
		setUser(prev => ({
			...prev,
			recipes: [
				...prev.recipes,
				{
					name: '',
					imageName: 'placeholder.png',
					category,
					ingredients: [],
					instructions: []
				}
			]
		}))
	}

	return (
		<div className="space-y-10">
			<div className="flex w-full justify-between items-center">
				<div className="flex items-center gap-x-3">
					<Link to="/app/recipes" className="w-6">
						<LeftIcon />
					</Link>
					<div className="title">{titles[category]}</div>
				</div>
				<button onClick={addRecipe} className="icon-button w-7 rounded-[10px]">
					<PlusIcon />
				</button>
			</div>
			{user.recipes
				.filter(recipe => recipe.category === category)
				.map((recipe, i) => (
					<Recipe key={i} {...recipe} />
				))}
		</div>
	)
}