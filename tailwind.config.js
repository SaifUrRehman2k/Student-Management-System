module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                slide: {
                    '0%, 100%': { transform: 'translateX(0px)' },
                    '50%': { transform: 'translateX(-50px)' },
                },
            },
            animation: {
                slide: 'slide 5s linear 1',
            },
        },
    },
    plugins: [],
};
