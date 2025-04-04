import { App, Notice, Plugin, PluginManifest } from "obsidian";
import { stylesheet, f9MarkdownAdditions, f9BaseClass } from "./constants";

export default class Foundry9Plugin extends Plugin {

    private f9StyleSheet: HTMLStyleElement;

    async onload() {

        try {
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
        } catch (error) {
            console.error("Error loading Foundry9Plugin:", error);
            new Notice("Foundry9Plugin failed to load.");
        } finally {
            console.log("Foundry9Plugin loader is complete.");
        }
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

    private f9InsertStyle = (el: HTMLElement) => {
        const stylesheet = this.f9StyleSheet;
        return this.f9InsertStyleWithSheet(el, stylesheet);
    }

    private f9InsertStyleWithSheet(el: HTMLElement, stylesheet: HTMLStyleElement) {
        const top = el.closest('html');
        if (!top) {
            return;
        }
        const existingStyles = top.querySelectorAll(`style`);
        for (const sheet of existingStyles) {
            if (sheet.textContent?.toLowerCase().contains('foundry9')) {
                return;
            }
        }
        top.appendChild(stylesheet);
    }

    onunload() {
        console.log("Foundry9Plugin has unloaded.");
    }

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        const styleElements: string[] = [];
        styleElements.push(stylesheet);
        for (const i of ([ 1, 2, 3, 4, 5 ] as number[])) {
            styleElements.push(`.${ f9BaseClass }.upsize${ i } { font-size: ${ i * 12 }px; }`);
        }
        this.f9StyleSheet = document.createElement("style");
        this.f9StyleSheet.setText(styleElements.join("\n"));
    }
}
