"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManifest = void 0;
class FileManifest {
    command;
    sourceBase;
    targetBase;
    dirs;
    files;
    dryRun = false;
    debug = false;
    constructor(fm) {
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
exports.FileManifest = FileManifest;
