/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: process.env.NODE_ENV ? 'jit' : undefined,
	purge: ["./src/**/*.html", "./src/**/*.js"],
	darkMode: false,
	content: [],
	theme: {
		extend: {
			borderWidth: {
				'REALLYBIGBORDER': '15px'

			},
			borderColor:{
				'CustomFallGuysBorderBackground': '#f906bf'
			},
			backgroundColor: {
				'CustomFallGuysPinkBackground': '#f906bf'
			},
			textColor:{
				'CustomFallGuysPinkText': '#f906bf',
				'CustomFallGuysBlueText': '#48c2f9'
			}
		},
	},
	plugins: [],
}

