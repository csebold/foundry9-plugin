import { Notice, Plugin, MarkdownPostProcessorContext } from "obsidian";

export default class Foundry9Plugin extends Plugin {
    async onload() {
        console.log("Loading Foundry9Plugin...");

        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new Notice("Hello from your plugin!");
            }
        });
    }

    private readonly fontSizeRegex = /&(\^+)(.*?)\1&/g;

    foundry9MarkdownAdditions(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
        // This is where you can add your custom markdown processing logic
        // For example, you could parse the source string and modify the el element
        let match: RegExpExecArray | null;

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
