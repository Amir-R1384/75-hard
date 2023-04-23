import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../atoms'
import { storage } from '../firebase'
import { Recipe as RecipeType } from '../types'
import { CheckmarkIcon, MinusIcon, PencilIcon, PlusIcon } from './icons'
import TrashIcon from './icons/Trash.Icon'

export default function Recipe({
	name,
	ingredients,
	instructions,
	category,
	imageName
}: RecipeType) {
	const setUser = useSetRecoilState(userAtom)
	const [expanded, setExpanded] = useState(false)
	const [editMode, setEditMode] = useState(false)
	const [inputs, setInputs] = useState({ name, ingredients, instructions, imageName })
	const [imageUrl, setImageUrl] = useState('')

	async function onImageInputChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files![0]
		if (file) {
			const oldImageRef = ref(storage, `/${imageName}`)
			if (imageName !== 'placeholder.png') deleteObject(oldImageRef)

			const newImageRef = ref(storage, `/${file.name}`)
			await uploadBytes(newImageRef, file)
			getDownloadURL(newImageRef).then(url => setImageUrl(url))

			setInputs(prev => ({ ...prev, imageName: file.name }))
		}
	}

	useEffect(() => {
		const storageRef = ref(storage, `/${imageName}`)
		getDownloadURL(storageRef).then(url => setImageUrl(url))
	}, [])

	function toggleEditMode(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()
		setEditMode(prev => {
			if (prev === true) {
				saveRecipe()
			}
			return !prev
		})
	}

	function saveRecipe() {
		setUser(prev => {
			const newArray = [...prev.recipes]
			const targetRecipe = prev.recipes.find(recipe => recipe.name === name)!
			newArray.splice(newArray.indexOf(targetRecipe), 1, { ...inputs, category })
			return { ...prev, recipes: newArray }
		})
	}

	function deleteRecipe(e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()

		setUser(prev => {
			const newArray = [...prev.recipes]
			const targetRecipeIndex = prev.recipes.findIndex(recipe => recipe.name === name)
			newArray.splice(targetRecipeIndex, 1)
			return { ...prev, recipes: newArray }
		})
	}

	function onInputChange(value: string, type: 'ingredients' | 'instructions', index: number) {
		setInputs(prev => {
			const newArray = [...prev[type]]
			newArray.splice(index, 1, value)
			return { ...prev, [type]: newArray }
		})
	}

	function deleteInput(type: 'ingredients' | 'instructions', index: number) {
		setInputs(prev => {
			const newArray = [...prev[type]]

			newArray.splice(index, 1)
			return { ...prev, [type]: newArray }
		})
	}

	function addInput(type: 'ingredients' | 'instructions') {
		setInputs(prev => {
			return { ...prev, [type]: [...prev[type], ''] }
		})
	}

	const inputsClass = `${
		editMode && 'border-gray-200 border  py-1 px-2'
	} transition-all duration-500 rounded-lg my-0.5 w-full`

	return (
		<div className={`${expanded ? 'bg-white' : 'bg-green-light'} expandable`}>
			<input
				onChange={onImageInputChange}
				disabled={!editMode}
				className="hidden"
				id="imageInput"
				type="file"></input>
			<label
				htmlFor="imageInput"
				style={{ backgroundImage: `url(${imageUrl})` }}
				className={`${expanded ? 'h-32 border-b' : 'h-0 border-0'} ${
					editMode && 'brightness-75 blur-[1px]'
				} transition-all bg-white duration-700 w-full bg-no-repeat bg-center bg-cover border-dark`}></label>
			<div
				onClick={() => setExpanded(prev => !prev)}
				className="flex w-full justify-between items-center p-3">
				<button
					onClick={deleteRecipe}
					className={` ${
						editMode && '!w-5 !p-1 !mr-4 !border'
					} box-content stroke-red-400 duration-500 w-0 p-0 mr-0 border-0  transition-all translate border-red-400 rounded-lg`}>
					<TrashIcon />
				</button>
				<input
					type="text"
					disabled={!editMode}
					className={`${
						editMode && 'border border-gray-200 p-1'
					} text-lg font-medium transition-all duration-700 w-full rounded-lg`}
					value={inputs.name}
					onClick={e => e.stopPropagation()}
					onChange={e => setInputs(prev => ({ ...prev, name: e.target.value }))}
				/>
				<button onClick={toggleEditMode} className="transition-scale stroke-dark w-6 ml-3">
					{editMode ? <CheckmarkIcon /> : <PencilIcon />}
				</button>
			</div>

			<div
				style={{
					maxHeight: `${
						expanded
							? 110 + 40 * (inputs.ingredients.length + inputs.instructions.length)
							: 0
					}px`
				}}
				className="transition-all duration-700 overflow-hidden">
				<div className="border-t border-dark p-3 ">
					<div className="w-full justify-between items-center flex">
						<div className="mb-2">Ingredients</div>
						<button
							onClick={() => addInput('ingredients')}
							className="icon-button w-5 rounded-md bg-transparent">
							<PlusIcon />
						</button>
					</div>
					<ul className="text-sm ">
						{inputs.ingredients.map((ingredient, i) => (
							<div
								key={i}
								className="flex w-full justify-between items-center gap-x-3">
								<div className="flex items-center gap-x-2 w-full">
									<div className="w-1.5 h-1.5 rounded-full bg-dark"></div>
									<input
										className={inputsClass}
										key={i}
										type="text"
										value={ingredient}
										onChange={e =>
											onInputChange(e.target.value, 'ingredients', i)
										}
									/>
								</div>
								<button
									onClick={() => deleteInput('ingredients', i)}
									className={` ${
										editMode && '!w-4'
									} box-content stroke-red-400 stroke-2 scale-y-150 duration-300 w-0  transition-all translate border-red-400 rounded-lg`}>
									<MinusIcon />
								</button>
							</div>
						))}
					</ul>
				</div>
				<div className="border-t border-dark p-3">
					<div className="w-full justify-between items-center flex">
						<div className="mb-2">Instructions</div>
						<button
							onClick={() => addInput('instructions')}
							className="icon-button w-5 rounded-md bg-transparent">
							<PlusIcon />
						</button>
					</div>
					<ol className=" text-sm">
						{inputs.instructions.map((instruction, i) => (
							<div
								key={i}
								className="flex w-full justify-between items-center gap-x-3">
								<div className="flex items-center gap-x-2 w-full">
									<div className="font-medium">{i + 1}.</div>
									<input
										className={inputsClass}
										key={i}
										type="text"
										value={instruction}
										onChange={e =>
											onInputChange(e.target.value, 'instructions', i)
										}
									/>
								</div>
								<button
									onClick={() => deleteInput('instructions', i)}
									className={` ${
										editMode && '!w-4'
									} box-content stroke-red-400 stroke-2 scale-y-150 duration-300 w-0  transition-all translate border-red-400 rounded-lg`}>
									<MinusIcon />
								</button>
							</div>
						))}
					</ol>
				</div>
			</div>
		</div>
	)
}
