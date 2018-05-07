import * as fs from "fs-extra";
import Handlebars from "handlebars";
import * as path from "path";
import { ITemplateData } from "../../interfaces/ITemplateData";
import { config } from "../../utils/ProjectHandler";

function getAsset(assetPath: string) {
    return path.resolve(__dirname, "..", config.assetsFolder, assetPath);
}
export class TemplateHandler {
    constructor(
        public data: ITemplateData,
    ) {}
    public build(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.readFile(getAsset(this.data.assetData.path), "utf-8", (error, source) => {
                if (error) {
                    console.error(error);
                    return reject(error);
                }
                const template = Handlebars.compile(source);
                const processed = template(this.data.dataToFill);
                return this.saveFile(resolve, reject, processed, this.data.resultFileFullPath);
            });
        });
    }
    private saveFile(resolve, reject, processed, writePath) {
        fs.outputFile(writePath, processed, (error) => {
            if (error) {
                console.error(error);
                return reject(error);
            }
            console.info(`File saved in ${writePath}`);
            return resolve(true);
        });
    }
}
