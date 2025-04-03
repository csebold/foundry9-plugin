"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deployer_1 = require("./deployer");
const process_1 = require("process");
const deploy = new deployer_1.Deployer("fileManifest.json");
deploy.argumentHandler(process_1.argv);
deploy.deploy();
