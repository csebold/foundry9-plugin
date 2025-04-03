"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManifest = void 0;
class FileManifest {
    sourceBase;
    targetBase;
    dirs;
    files;
    dryRun = false;
    constructor(fm) {
        this.sourceBase = fm.sourceBase;
        this.targetBase = fm.targetBase;
        this.dirs = fm.dirs;
        this.files = fm.files;
        this.dryRun = fm.dryRun;
    }
}
exports.FileManifest = FileManifest;
