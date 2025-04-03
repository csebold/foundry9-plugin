"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const filemanifest_1 = require("./filemanifest");
const process_1 = require("process");
const fs_1 = require("fs");
const packageJSON = __importStar(require("../package.json"));
const fmJson = __importStar(require("../fileManifest.json"));
const child_process_1 = require("child_process");
const fs_2 = require("fs");
const shortVersion = packageJSON.version;
const longVersion = `${packageJSON.name} ${shortVersion}`;
const commit = (0, child_process_1.spawnSync)("git", ["rev-parse", "--short", "HEAD"]);
const longVersionWithCommit = `${longVersion} (${commit})`;
const manifest = new filemanifest_1.FileManifest(fmJson);
function deploy(manifest) {
    for (const dir of manifest.dirs) {
        const fullPath = `${manifest.targetBase}/${dir}`;
        console.log(`Creating directory: ${fullPath}`);
        if (manifest.dryRun) {
            console.log(`Dry run: copying ${dir} to ${fullPath}`);
        }
        else {
            (0, fs_1.cpSync)(dir, fullPath, {
                recursive: true,
                force: true
            });
        }
    }
    for (const manifestFile of manifest.files) {
        const fileGlob = (0, fs_2.globSync)(manifestFile);
        for (const file of fileGlob) {
            const fullPath = `${manifest.targetBase}/${file}`;
            console.log(`Copying file: ${fullPath}`);
            if (manifest.dryRun) {
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
while (process_1.argv.length > 1) {
    const arg = process_1.argv[1];
    if (arg === "--help" || arg === "-h") {
        console.log("Usage: deploy [options]");
        console.log("Options:");
        console.log("  --help, -h       Show this help message");
        console.log("  --path, -p       Path to deploy (default: current directory)");
        console.log("  --version, -vl   Show complete version information");
        console.log("  --semver, -v     Show semver-style version");
        console.log("  --dry-run, -d    Show what would happen in a dry run");
        process.exit(0);
    }
    else if (arg === "--path" || arg === "-p") {
        manifest.targetBase = process_1.argv[2];
        process_1.env.DEPLOY_PATH = process_1.argv[2];
        process_1.argv.splice(1, 2);
    }
    else if (arg === "--version" || arg === "-vl") {
        console.log(longVersionWithCommit);
        process.exit(0);
    }
    else if (arg === "--semver" || arg === "-v") {
        console.log(shortVersion);
        process.exit(0);
    }
    else if (arg === "--dry-run" || arg === "-d") {
        console.log("Dry run mode: No files will be copied.");
        manifest.dryRun = true;
        process_1.argv.splice(1, 2);
    }
}
if (process_1.env.DEPLOY_PATH) {
    manifest.targetBase = process_1.env.DEPLOY_PATH;
    console.log(`Deploying to ${process_1.env.DEPLOY_PATH}`);
    try {
        deploy(manifest);
    }
    catch (error) {
        console.error(`Error deploying: ${error.message}`);
        process.exit(1);
    }
}
else {
    console.error("No path specified. Use --path or -p to specify a path.");
    process.exit(1);
}
