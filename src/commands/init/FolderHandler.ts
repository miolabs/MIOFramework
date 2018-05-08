import * as fs from "fs-extra";
import * as path from "path";
import { IAssetData } from "../../interfaces/IAssetData";
import {config} from "../../utils/ProjectHandler";

function getAsset(assetPath: string) {
    return path.resolve(__dirname, "..", config.assetsFolder, assetPath);
}
function getTarget(targetPath: string) {
    return path.resolve(".", targetPath);
}
export class FolderHandler {
    public templateFolderPath = "";
    constructor(
        assetData: IAssetData,
        public resultFolderName: string,
    ) {
        this.templateFolderPath = getAsset(assetData.path);
        this.resultFolderName = getTarget(resultFolderName);
    }
    public build(): Promise<void> {
        return fs.copy(this.templateFolderPath, this.resultFolderName);
    }
}
