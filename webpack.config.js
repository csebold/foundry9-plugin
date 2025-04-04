"use strict";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");
module.exports = {
    mode: "production", // Use "development" for debugging
    entry: "./src/main.ts", // Entry point of your plugin
    output: {
        path: path.resolve(__dirname, "dist"), // Output directory
        filename: "main.js", // Output file name
        libraryTarget: "commonjs", // Target CommonJS for Obsidian plugins
    },
    resolve: {
        extensions: [".ts", ".js"], // Resolve TypeScript and JavaScript files
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Process TypeScript files
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    externals: {
        obsidian: "commonjs obsidian", // Exclude Obsidian from the bundle
    },
};
