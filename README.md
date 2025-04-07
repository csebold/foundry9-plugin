# Foundry9 Plugin

## Overview

**Foundry9 Plugin** is an Obsidian plugin that enhances your note-taking experience by dynamically applying styles and processing custom markdown syntax. It features:

- **Dynamic Stylesheets:** Generate styles based on user settings.
- **Advanced Markdown Processing:** Asynchronously render markdown content with custom transformations.
- **Extendable Settings:** Configure block names, sizing factors, and more.

## Installation

1. **Download the Plugin:**
   - Get the latest release from the [GitHub releases page](https://github.com/csebold/foundry9-plugin9/releases).

2. **Install the Plugin:**
   - Open your Obsidian vault.
   - Go to `Settings > Community Plugins` and ensure safe mode is off.
   - Click on `Open Plugin Folder` and copy the downloaded plugin's folder (e.g., `foundry-9`) into this directory.
   - Reload Obsidian or enable the plugin in settings.

## Usage

- **Activate Commands:**
  - Use the command palette (Cmd/Ctrl+P) to run the `Show Alert` command.
- **Markdown Post Processing:**
  - The plugin automatically post processes markdown to apply custom styles.
  
## Development

### Prerequisites

- Node.js (v14 or later)
- npm

### Build and Deploy

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Build the Plugin:**

   ```bash
   npm run build
   ```

3. **Deploy:**

   ```bash
   npm run deploy -- --path ~/path/to/Obsidian/Vault/.obsidian/plugins/foundry-9
   ```

### File Structure

- `src/main.ts`: Main entry point of the plugin
- `deploy`: Deployment scripts and configuration
- `package.json`: Project configuration and scripts

## Configuration

Customize the plugin by modifying settings in the code or via a settings tab within the plugin:

- **Block Names:** Define custom block names and associated styles.
- **Upsize Multiple:** Set the multiplier for font size adjustments.
- **Rel Size Power:** Configure relative size transformations.

## License

Licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0) (the "License"); you may not use this plugin except in compliance with the License.

You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Acknowledgments

Thank you to the Obsidian community for inspiration and feedback.