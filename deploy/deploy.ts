import { Deployer } from './deployer';
import { argv } from "process";

const deploy = new Deployer("fileManifest.json");
deploy.argumentHandler(argv);
deploy.deploy();