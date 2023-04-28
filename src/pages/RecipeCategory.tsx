import { Link } from 'react-router-dom'

export default function Recipes() {
	return (
		<div className="space-y-10">
			<div className="title">Receipes</div>
			<div className="space-y-4">
				<div className="grid grid-cols-1 gap-5">
					<Link
						to="/app/recipe"
						state={{ category: 'breakfast' }}
						className="py-10 bg-[#fce1e4] w-2/3 rounded-2xl active:brightness-90 font-medium grid place-content-center text-lg">
						Breakfasts
					</Link>
					<Link
						state={{ category: 'snack' }}
						to="/app/recipe"
						className="py-10 bg-[#ddedea] w-2/3 ml-[33%] rounded-2xl active:brightness-90 font-medium grid place-content-center text-lg">
						Snacks
					</Link>
					<Link
						state={{ category: 'meal' }}
						to="/app/recipe"
						className="py-10  bg-[#daeaf6] w-2/3 rounded-2xl active:brightness-90 font-medium grid place-content-center text-lg">
						Meals
					</Link>
				</div>
			</div>
		</div>
	)
}
