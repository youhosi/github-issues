const __DEV__ = process.env.NODE_ENV === "development";

module.exports = (phase, { defaultConfig }) => {
    // Application config file.

    return {
        ...defaultConfig,
        publicRuntimeConfig: {
            __API__: process.env.GRAPHQL_URL,
            __TOKEN__: process.env.AUTH_TOKEN,
            __RELAY_TTL__: 60 * 1000,
        },
        images: {
            domains: ["avatars.githubusercontent.com"],
        },
        productionBrowserSourceMaps: __DEV__,
        compress: !__DEV__,
        devIndicators: { buildActivity: false },
        distDir: "./build",
        pageExtensions: ["jsx", "js"],
        poweredByHeader: false,
        trailingSlash: false,
        reactStrictMode: true,
    };
};
