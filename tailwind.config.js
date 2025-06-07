module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        'button-primary',
        'button-secondary',
        'button-danger',
        'button-outline',
        'button-ghost',
        'button-lg',
        'button-md',
        'button-sm',
        'button-base',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
