import * as fs from 'fs-extra';
import * as path from 'path';
import { FolderHandler } from '../blocks/FolderHandler';
import {assets} from '../blocks/ProjectHandler';

export function Init(name:string, args: any) {
    const folder = new FolderHandler(assets.initDefault, name)
    return folder.build();

}