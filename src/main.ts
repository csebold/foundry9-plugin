import { Notice, Plugin } from "obsidian";
import { stylesheet, f9MarkdownAdditions } from "./constants";

export default class Foundry9Plugin extends Plugin {
    private readonly f9BaseStyle = stylesheet;

    async onload() {
        console.log("Loading Foundry9Plugin...");

        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new Notice("Foundry9 reports test succeeded");
            }
        });

        // Register a markdown post processor
        this.registerMarkdownPostProcessor(this.f9InsertStyle);
        this.registerMarkdownPostProcessor(this.f9MarkdownAdditions);
    }

    private f9MarkdownAdditions(el: HTMLElement) {
        const source = el.innerHTML;
        for (const [ className, regex ] of f9MarkdownAdditions.size) {
            if (regex.test(source)) {
                const output = source.replace(regex,
                    (_match: string, sizeMarkers: string, text: string) => {
                        const span = document.createElement("span");
                        span.classList.add("foundry9", `${ className }${ sizeMarkers.length }`);
                        span.innerText = text;
                        return span.outerHTML;
                    }
                );
                el.innerHTML = output;
            }
        };
    }

    private f9InsertStyle(el: HTMLElement) {
        const style = document.createElement("style");
        style.innerText = this.f9BaseStyle;
        el.prepend(style);
    }

    onunload() {
        console.log("Foundry9Plugin has unloaded!");
    }
}
