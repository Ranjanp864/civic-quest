/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
	  './src/app/**/*.{js,ts,jsx,tsx}',
	  './src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
	  extend: {
		fontFamily: {
		  orbitron: ['var(--font-orbitron)', 'sans-serif'],
		},
		boxShadow: {
		  cyan: '0 0 15px #00ffff66',
		  fuchsia: '0 0 15px #ff00ff66',
		  lime: '0 0 15px #aaff0066',
		  yellow: '0 0 15px #ffff0066',
		  sky: '0 0 15px #00ccff66',
		},
		animation: {
		  'fade-in': 'fadeIn 1s ease-in-out',
		},
		keyframes: {
		  fadeIn: {
			from: { opacity: 0, transform: 'translateY(20px)' },
			to: { opacity: 1, transform: 'translateY(0)' },
		  },
		},
	  },
	},
	plugins: [
	  require('tailwindcss-animate'),
	],
  }
  