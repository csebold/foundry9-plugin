import { Notice, Plugin } from "obsidian";

export default class Foundry9Plugin extends Plugin {
    async onload() {
        console.log("Foundry9Plugin has loaded!");

        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new Notice("Hello from your plugin!");
            }
        });
    }

    onunload() {
        console.log("My Plugin has unloaded!");
    }
}
