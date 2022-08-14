const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                ...defaultTheme.transitionProperty,
                hover: 'hover',
                focus: 'focus'
            },
            minHeight: {
                '1/2': '50%',
                '3/4': '75%',
                '7/8': '87.5%'
            },
            maxHeight: {
                '1/2': '50%',
                '3/4': '75%',
                '7/8': '87.5%'
            }
        }
    },
    plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/forms')]
};
