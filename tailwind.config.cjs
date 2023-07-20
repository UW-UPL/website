/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		fontFamily: {
			'sans': ['montserrat', 'sans-serif'],
			'lato': ['lato', 'sans-serif'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
