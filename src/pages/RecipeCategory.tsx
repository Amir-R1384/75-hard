import { Link } from 'react-router-dom'

export default function Recipes() {
	return (
		<div className="space-y-10">
			<div className="title">Receipes</div>
			<div className="space-y-4">
				<div className="grid grid-cols-2 p-5 gap-5">
					<Link
						to="/app/recipe"
						state={{ category: 'breakfast' }}
						className="py-10 bg-green-light rounded-2xl active:brightness-90 font-medium border border-green  grid place-content-center text-lg">
						Breakfasts
					</Link>
					<Link
						state={{ category: 'snack' }}
						to="/app/recipe"
						className="py-10 bg-green-light rounded-2xl active:brightness-90 font-medium border border-green  grid place-content-center text-lg">
						Snacks
					</Link>
					<Link
						state={{ category: 'meal' }}
						to="/app/recipe"
						className="py-10 col-span-2 bg-green-light rounded-2xl active:brightness-90 font-medium border border-green  grid place-content-center text-lg">
						Meals
					</Link>
				</div>
			</div>
		</div>
	)
}
