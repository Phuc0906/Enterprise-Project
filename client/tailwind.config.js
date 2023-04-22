module.exports = {
    content: ["./src/**/*.{html,js}"],

    theme: {
        extend: {
            boxShadow: {
                primary: "0px 7px 29px 0px rgb(100 100 111 / 0.2)",
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
