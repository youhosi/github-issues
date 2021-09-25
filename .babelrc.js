const __DEV__ = process.env.NODE_ENV === "development";

module.exports = {
    presets: [
        [
            "next/babel",
            {
                "styled-jsx": {
                    sourceMaps: __DEV__,
                    optimizeForSpeed: true,
                    plugins: ["@styled-jsx/plugin-sass"],
                },
            },
        ],
    ],
    plugins: [
        [
            "relay",
            {
                artifactDirectory: "./__generated__/relay/",
            },
        ],
        "transform-flow-strip-types",
    ],
};
