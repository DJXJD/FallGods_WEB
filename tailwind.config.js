/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: process.env.NODE_ENV ? 'jit' : undefined,
	purge: ["./src/**/*.html", "./src/**/*.js"],
	darkMode: false,
	content: [],
	theme: {
		extend: {
			colors: {
       			'fall-blue': '#6FB4D6',
      		},
			zIndex: {
				BiggerZIndex: '11',
			},
			fontFamily: {
				TitanOneFont: ['TITANONE', 'sans'],
			},	
			borderWidth: {
				'REALLYBIGBORDER': '15px'
			},
			borderColor:{
				'CustomFallGuysBorderBackground': '#f906bf'
			},
			backgroundColor: {
				'CustomFallGuysPinkBackground': '#f906bf',
				'CustomFallGuysBlueBackground': '#ADD8E6'
				
			},
			textColor:{
				'CustomFallGuysPinkText': '#f906bf',
				'CustomFallGuysBlueText': '#48c2f9'
			}
		},
	},
	plugins: [],
}

