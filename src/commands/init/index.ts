/**
 * This command is responsible for initializing a new project.
 */

import { assets } from "../../utils/ProjectHandler";
import { FolderHandler } from "./FolderHandler";

export function Init(name: string, args: any) {
    const folder = new FolderHandler(assets.initDefault, name);
    return folder.build();
}
