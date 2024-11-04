/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            black: '#000000',
            teal: '#98F2E2',
            highlightBlue: '#41AAFF',
            slate: {
                100: '#f1f5f9',
                200: '#DADAE5',
                250: '#D2D2DB',
                300: '#8D8D99',
                400: '#40404d',
                500: '#3C3C47',
                550: '#2B2B33',
                600: '#24242B',
                700: '#232329',
                800: '#1C1C22',
                900:'#121215',
            },
            white: '#ffffff'
        },
        extend: {},
    },
    plugins: [],
}