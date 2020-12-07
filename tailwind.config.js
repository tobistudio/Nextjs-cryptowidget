const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"segoe ui"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                'blue': '#1fb6ff',
                'pink': '#ff49db',
                'orange': '#ff7849',
                'green': '#13ce66',
                'yellow': '#ffc82c',
            }
        },
    },
    plugins: [],
}