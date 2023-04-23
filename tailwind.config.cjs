/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				dark: colors.gray['600'],
				light: colors.gray['400'],
				green: '#6C9373',
				'green-light': '#B3CCB7'
			},
			spacing: {
				main: '20px'
			}
		}
	},
	plugins: []
}
