"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f9MarkdownAdditions = exports.f9fontSizeRelClass = exports.f9fontSizeAbsClass = exports.f9fontSizeRelRegex = exports.f9fontSizeAbsRegex = void 0;
const obsidian_1 = require("obsidian");
exports.f9fontSizeAbsRegex = /&amp;(\^+)(.*?)\1&amp;/g;
exports.f9fontSizeRelRegex = /&amp;~(\^+)(.*?)\1~&amp;/g;
exports.f9fontSizeAbsClass = 'upsize';
exports.f9fontSizeRelClass = 'relsize';
exports.f9MarkdownAdditions = {
    size: [
        [exports.f9fontSizeAbsClass, exports.f9fontSizeAbsRegex],
        [exports.f9fontSizeRelClass, exports.f9fontSizeRelRegex]
    ]
};
class Foundry9Plugin extends obsidian_1.Plugin {
    async onload() {
        console.log("Loading Foundry9Plugin...");
        // Register a simple command that shows a notification
        this.addCommand({
            id: "show-alert",
            name: "Show Alert",
            callback: () => {
                new obsidian_1.Notice("Foundry9 reports test succeeded");
            }
        });
        // Register a markdown post processor
        this.registerMarkdownPostProcessor(this.foundry9MarkdownAdditions);
    }
    foundry9MarkdownAdditions(el) {
        const source = el.innerHTML;
        for (const [className, regex] of exports.f9MarkdownAdditions.size) {
            if (regex.test(source)) {
                const output = source.replace(regex, (_match, sizeMarkers, text) => {
                    const span = document.createElement("span");
                    span.classList.add("foundry9", `${className}${sizeMarkers.length}`);
                    span.innerText = text;
                    return span.outerHTML;
                });
                el.innerHTML = output;
            }
        }
        ;
    }
    onunload() {
        console.log("Foundry9Plugin has unloaded!");
    }
}
exports.default = Foundry9Plugin;
