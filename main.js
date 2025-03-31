"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class Foundry9Plugin extends obsidian_1.Plugin {
    constructor() {
        super(...arguments);
        this.fontSizeRegex = /&(\^+)(.*?)\1&/g;
    }
    async onload() {
        console.log("Loading Foundry9Plugin...");
        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new obsidian_1.Notice("Hello from your plugin!");
            }
        });
    }
    foundry9MarkdownAdditions(source, el, ctx) {
        // This is where you can add your custom markdown processing logic
        // For example, you could parse the source string and modify the el element
        let match;
        while ((match = this.fontSizeRegex.exec(source)) !== null) {
            const sizeMarkers = match[1];
            const span = document.createElement("span");
            span.classList.add("foundry9", `upsize${sizeMarkers.length}`);
            span.innerText = match[2];
            el.appendChild(span);
        }
    }
    onunload() {
        console.log("My Plugin has unloaded!");
    }
}
exports.default = Foundry9Plugin;
