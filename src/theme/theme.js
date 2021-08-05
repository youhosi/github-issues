const colorPrimitives = {
    grey: {
        100: "#1b1f23",
        200: "#717171",
        300: "#e4e4e4",
    },
    red: {},
    blue: {
        100: "#3656f5",
        200: "",
        300: "",
    },
    green: {},
};

export const colors = {
    ...colorPrimitives,
    primary: colorPrimitives.blue["100"],
    secondary: colorPrimitives.grey["100"],
    backgroundColor: "#f0f3f7",
    white: "#ffffff",
    black: "#000000",
};

const theme = { colors };

export default theme;
