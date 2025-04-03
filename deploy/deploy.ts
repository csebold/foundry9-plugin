import { FileManifest, FileManifestLike } from './filemanifest';
import { argv, env } from "process";
import { cpSync } from "fs";
import * as packageJSON from "../package.json";
import * as fmJson from "../fileManifest.json";
import { spawnSync } from 'child_process';
import { globSync } from 'fs';

const shortVersion = packageJSON.version;
const longVersion = `${ packageJSON.name } ${ shortVersion }`;
const commit = spawnSync("git", [ "rev-parse", "--short", "HEAD" ]);
const longVersionWithCommit = `${ longVersion } (${ commit })`;
const manifest = new FileManifest(fmJson as FileManifestLike);

function deploy(manifest: FileManifestLike) {
    for (const dir of manifest.dirs) {
        const fullPath = `${ manifest.targetBase }/${ dir }`;
        console.log(`Creating directory: ${ fullPath }`);
        if (manifest.dryRun) {
            console.log(`Dry run: copying ${ dir } to ${ fullPath }`);
        } else {
            cpSync(dir, fullPath, {
                recursive: true,
                force: true
            });
        }
    }
    for (const manifestFile of manifest.files) {
        const fileGlob = globSync(manifestFile);
        for (const file of fileGlob) {
            const fullPath = `${ manifest.targetBase }/${ file }`;
            console.log(`Copying file: ${ fullPath }`);
            if (manifest.dryRun) {
                console.log(`Dry run: copying ${ file } to ${ fullPath }`);
            } else {
                cpSync(file, fullPath, {
                    force: true
                });
            }
        }
    }
}

while (argv.length > 1) {
    const arg = argv[ 1 ];
    if (arg === "--help" || arg === "-h") {
        console.log("Usage: deploy [options]");
        console.log("Options:");
        console.log("  --help, -h       Show this help message");
        console.log("  --path, -p       Path to deploy (default: current directory)");
        console.log("  --version, -vl   Show complete version information");
        console.log("  --semver, -v     Show semver-style version");
        console.log("  --dry-run, -d    Show what would happen in a dry run");
        process.exit(0);
    } else if (arg === "--path" || arg === "-p") {
        manifest.targetBase = argv[ 2 ];
        env.DEPLOY_PATH = argv[ 2 ];
        argv.splice(1, 2);
    } else if (arg === "--version" || arg === "-vl") {
        console.log(longVersionWithCommit);
        process.exit(0);
    } else if (arg === "--semver" || arg === "-v") {
        console.log(shortVersion);
        process.exit(0);
    } else if (arg === "--dry-run" || arg === "-d") {
        console.log("Dry run mode: No files will be copied.");
        manifest.dryRun = true;
        argv.splice(1, 2);
    }
}

if (env.DEPLOY_PATH) {
    manifest.targetBase = env.DEPLOY_PATH;
    console.log(`Deploying to ${ env.DEPLOY_PATH }`);
    try {
        deploy(manifest);
    } catch (error: unknown) {
        console.error(`Error deploying: ${ (error as Error).message }`);
        process.exit(1);
    }
} else {
    console.error("No path specified. Use --path or -p to specify a path.");
    process.exit(1);
}
