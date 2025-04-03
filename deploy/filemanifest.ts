export class FileManifest implements FileManifestLike {
    sourceBase: string;
    targetBase: string;
    dirs: string[];
    files: string[];
    dryRun: boolean = false;

    constructor(fm: FileManifestLike) {
        this.sourceBase = fm.sourceBase;
        this.targetBase = fm.targetBase;
        this.dirs = fm.dirs;
        this.files = fm.files;
        this.dryRun = fm.dryRun;
    }
}

export interface FileManifestLike {
    sourceBase: string;
    targetBase: string;
    dirs: string[];
    files: string[];
    dryRun: boolean;
}
