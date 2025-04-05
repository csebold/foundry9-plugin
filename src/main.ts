import { App, Notice, Plugin, PluginManifest } from "obsidian";
import { stylesheet, f9MarkdownAdditions, f9BaseClass } from "./constants";
import { DEFAULT_SETTINGS, Foundry9PluginSettings } from "./settings";

export default class Foundry9Plugin extends Plugin {

    private f9StyleSheet: HTMLStyleElement;
    public settings: Foundry9PluginSettings = {
        blockNames: [],
        upsizeMultiple: 12,
        relSizePower: 2
    };

    async loadSettings() {
        try {
            this.settings = Object.assign({}, this.settings, DEFAULT_SETTINGS);
            console.log("Settings loaded successfully.");
            return;
        } catch (error) {
            console.error("Error loading settings:", error);
            throw new Error("Failed to load settings.");
        }
    }

    async saveSettings() {
        try {
            const out = await this.saveData(this.settings);
            console.log("Settings saved successfully.");
            return out;
        } catch (error) {
            console.error("Error saving settings:", error);
            throw new Error("Failed to save settings.");
        }
    }

    async onload() {

        try {
            // load settings
            await this.loadSettings();

            // Register a simple command that shows a notification
            this.addCommand({
                id: "show-alert",
                name: "Show Alert",
                callback: () => {
                    new Notice("Foundry9 reports test succeeded");
                }
            });

            // load dynamic stylesheet
            const generatedSheet = this.generateStyles();
            this.f9StyleSheet = document.createElement("style");
            this.f9StyleSheet.setText(generatedSheet);

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
        for (const [ className, regex ] of f9MarkdownAdditions.blocks) {
            if (regex.test(source)) {
                const output = source.replace(regex,
                    (_match: string, text: string, thisClass: string) => {
                        console.log("Found regex match", _match, text, thisClass);
                        const div = document.createElement("div");
                        el.classList.add("foundry9", className, thisClass);
                        div.innerText = text;
                        return div.outerHTML;
                    }
                );
                el.innerHTML = output;
            }
        }
    }

    private f9InsertStyle = (el: HTMLElement) => {
        const stylesheet = this.f9StyleSheet;
        return this.f9InsertStyleWithSheet(el, stylesheet);
    };

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

    private generateStyles(): string {
        const styleElements: string[] = [];
        styleElements.push(stylesheet);
        for (const i of ([ 1, 2, 3, 4, 5 ] as number[])) {
            styleElements.push(`.${ f9BaseClass }.upsize${ i } { font-size: ${ i * 12 }px; }`);
            styleElements.push(`.${ f9BaseClass }.relsize${ i } { font-size: ${ Math.pow(2, i) }rem; }`);
        }
        for (const block of this.settings.blockNames) {
            if (block.active) {
                styleElements.push(`.${ f9BaseClass }.${ block.name } { ${ block.style } }`);
            }
        }
        return styleElements.join("\n");
    }

    onunload() {
        console.log("Foundry9Plugin has unloaded.");
    }

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
        this.f9StyleSheet = document.createElement("style");
        this.f9StyleSheet.setText(stylesheet);
    }
}
