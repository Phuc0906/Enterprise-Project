module.exports = {
    content: ["./src/**/*.{html,js}"],

    theme: {
        extend: {
            boxShadow: {
                primary: "0px 7px 29px 0px rgb(100 100 111 / 0.2)",
                secondary: "rgb(124 58 237 /0.56) 0px 22px 100px 4px;",
                third: "rgb(0 0 0 /0.1) 0px 4px 6px -1px, rgba(0 0 0 /0.06) 0px 2px 4px -1px",
            },
            keyframes: {
                fadeout: {
                    "0%": {
                        opacity: 1,
                    },
                    "100%": {
                        opacity: 0,
                    },
                },
            },
            animation: {
                fadeout: "fadeout 0.25s linear forwards",
            },
        },
    },
    plugins: [],
};
