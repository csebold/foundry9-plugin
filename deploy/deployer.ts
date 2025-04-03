import { cpSync, globSync, readFileSync } from 'fs';
import { FileManifest, FileManifestLike } from './filemanifest';
import { PackageJson } from './packageJson';
import { env } from 'process';
import { spawnSync } from 'child_process';
import { execaSync } from 'execa';

export class Deployer {
    manifest: FileManifest;

    private readonly shortVersion: string;
    private readonly longVersion: string;
    private readonly longVersionWithCommit: string;
    private readonly commit: string;
    private readonly packageJSON: PackageJson;

    constructor(manifestPath: string, debugInitial = false) {
        const manPath = execaSync('echo', [ manifestPath ]).stdout;
        if (debugInitial) {
            console.log(`Initializing Deployer with manifest path: ${ manPath }`);
        }
        const fmJson = readFileSync(manPath, { encoding: "utf-8" });
        const fmData: FileManifestLike = JSON.parse(fmJson);
        const pjPath = execaSync('echo', [ "./package.json" ]).stdout;
        if (debugInitial) {
            console.log(`File manifest data: ${ JSON.stringify(fmData, null, 2) }`);
            console.log(` Package JSON path: ${ pjPath }`);
        }
        const pjJson = readFileSync(pjPath, { encoding: "utf-8" });
        this.packageJSON = JSON.parse(pjJson);
        delete this.packageJSON.devDependencies;
        delete this.packageJSON.scripts;
        delete this.packageJSON.dependencies;
        this.manifest = new FileManifest(fmData);
        this.shortVersion = this.packageJSON.version ?? "0.0.0";
        this.longVersion = `${ this.packageJSON.name } ${ this.shortVersion }`;
        this.commit = spawnSync("git", [ "rev-parse", "--short", "HEAD" ]).stdout.toString().trim();
        this.longVersionWithCommit = `${ this.longVersion } (${ this.commit })`;
    }

    public debugMsg(str: string) {
        if (this.manifest.debug) {
            console.log(str);
        }
    }

    public deploy() {
        this.debugMsg(`Deploying based on ${ JSON.stringify(this, null, 2) }`);
        if (env.DEPLOY_PATH || this.manifest.targetBase) {
            this.manifest.targetBase = env.DEPLOY_PATH ?? this.manifest.targetBase;
            this.debugMsg(`Deploying to ${ this.manifest.targetBase }`);
            try {
                for (const dir of this.manifest.dirs) {
                    const fullPath = `${ this.manifest.targetBase }/${ dir }`;
                    this.debugMsg(`Creating directory: ${ fullPath }`);
                    if (this.manifest.dryRun) {
                        console.log(`Dry run: copying ${ dir } to ${ fullPath }`);
                    } else {
                        cpSync(dir, fullPath, {
                            recursive: true,
                            force: true
                        });
                    }
                }
                for (const manifestFile of this.manifest.files) {
                    const fileGlob = globSync(manifestFile);
                    for (const file of fileGlob) {
                        const fullPath = `${ this.manifest.targetBase }/${ file }`;
                        this.debugMsg(`Copying file: ${ fullPath }`);
                        if (this.manifest.dryRun) {
                            console.log(`Dry run: copying ${ file } to ${ fullPath }`);
                        } else {
                            cpSync(file, fullPath, {
                                force: true
                            });
                        }
                    }
                }
            } catch (error: unknown) {
                console.error(`Error deploying: ${ (error as Error).message }`);
                process.exit(1);
            }
        }
    }

    public argumentHandler(argv: string[]) {
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
            } else if (arg === "--path" || arg === "-p") {
                this.manifest.targetBase = argv.shift() ?? "output";
                env.DEPLOY_PATH = this.manifest.targetBase;
            } else if (arg === "--version" || arg === "-vl") {
                console.log(this.longVersionWithCommit);
                process.exit(0);
            } else if (arg === "--semver" || arg === "-v") {
                console.log(this.shortVersion);
                process.exit(0);
            } else if (arg === "--dry-run" || arg === "-dr") {
                console.log("Dry run mode: No files will be copied.");
                this.manifest.dryRun = true;
            } else if (arg === "--debug" || arg === "-d") {
                this.manifest.debug = true;
            }
        }
    }
}