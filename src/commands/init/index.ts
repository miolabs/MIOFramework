/**
 * This command is responsible for initializing a new project.
 */

import { assets } from "../../utils/ProjectHandler";
import { FolderHandler } from "./FolderHandler";

export function Init(name: string, args: any) {
    const folder = new FolderHandler(assets.initDefault, name);
    return folder.build().then(() => {
        console.log(`Project initialized in ${folder.resultFolderName}`);
        return true;
    }).catch((err) => {
        console.error(err);
        return false;
    });
}
