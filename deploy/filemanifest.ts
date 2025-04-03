export class FileManifest implements FileManifestLike {
    command?: string;
    sourceBase: string;
    targetBase: string;
    dirs: string[];
    files: string[];
    dryRun: boolean = false;
    debug: boolean = false;

    constructor(fm: FileManifestLike) {
        this.sourceBase = fm.sourceBase ?? "src";
        this.targetBase = fm.targetBase ?? "output";
        this.dirs = fm.dirs ?? [];
        this.files = fm.files ?? [];
        this.dryRun = fm.dryRun;
        this.debug = fm.debug;

        if (this.debug) {
            console.log("FileManifest initialized with:");
            console.log(JSON.stringify(this, null, 2));
        }
    }
}

export interface FileManifestLike {
    command?: string;
    sourceBase?: string;
    targetBase?: string;
    dirs?: string[];
    files?: string[];
    dryRun: boolean;
    debug: boolean;
}
