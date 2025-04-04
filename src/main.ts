import { Notice, Plugin } from "obsidian";

export const f9fontSizeAbsRegex = /&amp;(\^+)(.*?)\1&amp;/g;
export const f9fontSizeRelRegex = /&amp;~(\^+)(.*?)\1~&amp;/g;

export const f9fontSizeAbsClass = 'upsize';
export const f9fontSizeRelClass = 'relsize';

export const f9MarkdownAdditions: {
    size: [ string, RegExp ][];
} = {
    size: [
        [ f9fontSizeAbsClass, f9fontSizeAbsRegex ],
        [ f9fontSizeRelClass, f9fontSizeRelRegex ]
    ]
};

export default class Foundry9Plugin extends Plugin {
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
        this.registerMarkdownPostProcessor(this.foundry9MarkdownAdditions);
    }

    private foundry9MarkdownAdditions(el: HTMLElement) {
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

    onunload() {
        console.log("Foundry9Plugin has unloaded!");
    }
}
