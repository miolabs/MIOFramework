/**
 * This command is responsible for initializing a new project.
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { FolderHandler } from './FolderHandler';
import {assets} from '../../utils/ProjectHandler';

export function Init(name:string, args: any) {
    const folder = new FolderHandler(assets.initDefault, name)
    return folder.build();

}