"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obsidian_1 = require("obsidian");
class Foundry9Plugin extends obsidian_1.Plugin {
    async onload() {
        console.log("Foundry9Plugin has loaded!");
        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new obsidian_1.Notice("Hello from your plugin!");
            }
        });
    }
    onunload() {
        console.log("My Plugin has unloaded!");
    }
}
exports.default = Foundry9Plugin;
