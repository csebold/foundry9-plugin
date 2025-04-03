"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deployer = void 0;
const fs_1 = require("fs");
const filemanifest_1 = require("./filemanifest");
const process_1 = require("process");
const child_process_1 = require("child_process");
const execa_1 = require("execa");
class Deployer {
    manifest;
    shortVersion;
    longVersion;
    longVersionWithCommit;
    commit;
    packageJSON;
    constructor(manifestPath, debugInitial = false) {
        const manPath = (0, execa_1.execaSync)('echo', [manifestPath]).stdout;
        if (debugInitial) {
            console.log(`Initializing Deployer with manifest path: ${manPath}`);
        }
        const fmJson = (0, fs_1.readFileSync)(manPath, { encoding: "utf-8" });
        const fmData = JSON.parse(fmJson);
        const pjPath = (0, execa_1.execaSync)('echo', ["./package.json"]).stdout;
        if (debugInitial) {
            console.log(`File manifest data: ${JSON.stringify(fmData, null, 2)}`);
            console.log(` Package JSON path: ${pjPath}`);
        }
        const pjJson = (0, fs_1.readFileSync)(pjPath, { encoding: "utf-8" });
        this.packageJSON = JSON.parse(pjJson);
        delete this.packageJSON.devDependencies;
        delete this.packageJSON.scripts;
        delete this.packageJSON.dependencies;
        this.manifest = new filemanifest_1.FileManifest(fmData);
        this.shortVersion = this.packageJSON.version ?? "0.0.0";
        this.longVersion = `${this.packageJSON.name} ${this.shortVersion}`;
        this.commit = (0, child_process_1.spawnSync)("git", ["rev-parse", "--short", "HEAD"]).stdout.toString().trim();
        this.longVersionWithCommit = `${this.longVersion} (${this.commit})`;
    }
    debugMsg(str) {
        if (this.manifest.debug) {
            console.log(str);
        }
    }
    deploy() {
        this.debugMsg(`Deploying based on ${JSON.stringify(this, null, 2)}`);
        if (process_1.env.DEPLOY_PATH || this.manifest.targetBase) {
            this.manifest.targetBase = process_1.env.DEPLOY_PATH ?? this.manifest.targetBase;
            this.debugMsg(`Deploying to ${this.manifest.targetBase}`);
            try {
                for (const dir of this.manifest.dirs) {
                    const fullPath = `${this.manifest.targetBase}/${dir}`;
                    this.debugMsg(`Creating directory: ${fullPath}`);
                    if (this.manifest.dryRun) {
                        console.log(`Dry run: copying ${dir} to ${fullPath}`);
                    }
                    else {
                        (0, fs_1.cpSync)(dir, fullPath, {
                            recursive: true,
                            force: true
                        });
                    }
                }
                for (const manifestFile of this.manifest.files) {
                    const fileGlob = (0, fs_1.globSync)(manifestFile);
                    for (const file of fileGlob) {
                        const fullPath = `${this.manifest.targetBase}/${file}`;
                        this.debugMsg(`Copying file: ${fullPath}`);
                        if (this.manifest.dryRun) {
                            console.log(`Dry run: copying ${file} to ${fullPath}`);
                        }
                        else {
                            (0, fs_1.cpSync)(file, fullPath, {
                                force: true
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.error(`Error deploying: ${error.message}`);
                process.exit(1);
            }
        }
    }
    argumentHandler(argv) {
        this.manifest.command = argv.shift();
        while (argv.length > 0) {
            const arg = argv.shift();
            if (arg === "--help" || arg === "-h") {
                console.log("Usage: deploy [options]");
                console.log("Options:");
                console.log("  --help, -h       Show this help message");
                console.log("  --path, -p       Path to deploy (default: current directory)");
                console.log("  --version, -vl   Show complete version information");
                console.log("  --semver, -v     Show semver-style version");
                console.log("  --dry-run, -dr   Show what would happen in a dry run");
                process.exit(0);
            }
            else if (arg === "--path" || arg === "-p") {
                this.manifest.targetBase = argv.shift() ?? "output";
                process_1.env.DEPLOY_PATH = this.manifest.targetBase;
            }
            else if (arg === "--version" || arg === "-vl") {
                console.log(this.longVersionWithCommit);
                process.exit(0);
            }
            else if (arg === "--semver" || arg === "-v") {
                console.log(this.shortVersion);
                process.exit(0);
            }
            else if (arg === "--dry-run" || arg === "-dr") {
                console.log("Dry run mode: No files will be copied.");
                this.manifest.dryRun = true;
            }
            else if (arg === "--debug" || arg === "-d") {
                this.manifest.debug = true;
            }
        }
    }
}
exports.Deployer = Deployer;
