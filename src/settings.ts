import { App, PluginSettingTab, Setting } from "obsidian";
import Foundry9Plugin from "./main";

export interface Foundry9PluginSettings {
    // Define any settings you want to store for your plugin
    // For example:
    // mySetting: string;
    blockNames: {
        name: string;
        style: string;
        active: boolean;
    }[];
    upsizeMultiple: number;
    relSizePower: number;
}

export const DEFAULT_SETTINGS: Partial<Foundry9PluginSettings> = {
    // Set default values for your settings
    // mySetting: "default value",
    blockNames: [
        {
            name: "boldred",
            style: "color: red; font-weight: bold;",
            active: true
        },
        {
            name: "callout",
            style: `margin-left: 10%;
 margin-right: 10%;
 margin-top: 1rem;
 margin-bottom: 1rem;
 padding: 1rem;
 border-radius: 0.5rem;
 background-color: #4e2727;
 border: 1px solid #00000000;
 box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 font-size: 0.9rem;
 color: #ffffff;
 font-family: Futura, Arial, sans-serif;
 position: relative;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 text-align: center;`,
            active: true
        },
        {
            name: "qacbs",
            style: `margin-left: 10%;
margin-right: 10%;
padding-left: 10%;
padding-right: 10%;
padding-top: 1rem;
padding-bottom: 1rem;
background-color: #444;
font-family: Futura, Arial, sans-serif;`,
            active: true
        }
    ],
    upsizeMultiple: 12,
    relSizePower: 2
};

export class Foundry9PluginSettingsTab extends PluginSettingTab {
    plugin: Foundry9Plugin;
    constructor(app: App, plugin: Foundry9Plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Foundry9 Plugin Settings" });
        containerEl.createEl("p", { text: "Configure your plugin settings here." });
        // Add your settings UI here
        const settingsDisplay = new Setting(containerEl)
            .setName("Foundry9 Settings")
            .setDesc("Customizations for Foundry9 Plugin")
            .addButton(button => button
                .setButtonText("Add New Block")
                .onClick(async () => {
                    this.plugin.settings.blockNames.push({
                        name: "newBlock",
                        style: "",
                        active: false
                    });
                    await this.plugin.saveSettings();
                })
            );
        for (let i = 0; i < this.plugin.settings.blockNames.length; i++) {
            settingsDisplay
                .addText(text =>
                    text
                        .setPlaceholder("Block Name")
                        .setValue(this.plugin.settings.blockNames[ i ].name)
                        .onChange(async (value) => {
                            this.plugin.settings.blockNames[ i ].name = value;
                            await this.plugin.saveSettings();
                        })
                )
                .addTextArea(text =>
                    text
                        .setPlaceholder("Style")
                        .setValue(this.plugin.settings.blockNames[ i ].style)
                        .onChange(async (value) => {
                            this.plugin.settings.blockNames[ 0 ].style = value;
                            await this.plugin.saveSettings();
                        })
                )
                .addToggle((toggle) =>
                    toggle
                        .setValue(this.plugin.settings.blockNames[ i ].active)
                        .onChange(async (value: boolean) => {
                            this.plugin.settings.blockNames[ 0 ].active = value;
                            await this.plugin.saveSettings();
                        })
                )
                .addButton(button => button
                    .setButtonText(`Remove Block ${ i + 1 }: ${ this.plugin.settings.blockNames[ i ].name }`)
                    .onClick(async () => {
                        this.plugin.settings.blockNames.splice(i, 1);
                        await this.plugin.saveSettings();
                    }
                    ));
        }
    }
}