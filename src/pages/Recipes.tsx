import { Link, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { v4 as uuid } from 'uuid'
import { userAtom } from '../atoms'
import { Button, Recipe } from '../components'
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
					id: uuid(),
					name: '',
					imageName: 'placeholder.png',
					category,
					ingredients: [],
					instructions: [],
					isNew: true
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
				<Button onClick={addRecipe} className="icon-button w-7 rounded-[10px]">
					<PlusIcon />
				</Button>
			</div>
			{user.recipes
				.filter(recipe => recipe.category === category)
				.map((recipe, i) => (
					<Recipe key={i} {...recipe} />
				))}
		</div>
	)
}
