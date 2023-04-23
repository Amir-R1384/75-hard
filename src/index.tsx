import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import { Main } from './components'
import './firebase'
import './index.css'
import { Habits, RecipeCategory, Recipes, Settings, Workouts } from './pages'

const router = createBrowserRouter([
	{
		path: '/app',
		element: <Main />,
		children: [
			{
				path: 'habits',
				element: <Habits />
			},
			{
				path: 'workouts',
				element: <Workouts />
			},
			{
				path: 'recipes',
				element: <RecipeCategory />
			},
			{
				path: 'recipe',
				element: <Recipes />
			}
		]
	},
	{
		path: '/settings',
		element: <Settings />
	},
	{
		path: '*',
		element: <App />
	}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<RecoilRoot>
		<RouterProvider router={router} />
	</RecoilRoot>
)
