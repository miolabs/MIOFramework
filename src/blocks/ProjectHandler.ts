import * as path from 'path';
import {
    camelToSnake,
    capitalizeFirstLetter,
    uncapitalizeFirstLetter
} from '../utils/stringutils';

export const assets = {
    compVcDefault: {path: 'components/controller/vc.default.hbs', variableNames: ["name", "vcName", "containerId", "viewPath"]},
    compVCEmpty: {path: 'components/controller/vc.empty.hbs', variableNames: ["name"]},
    compVCEmptyRes: {path: 'components/controller/vc.emptyres.hbs', variableNames: ["name", "vcName", "containerId"]},
    viewCssDefault: {path: 'components/view/css.default.hbs', variableNames: ["containerId"]},
    viewHtmlDefault: {path: 'components/view/html.default.hbs', variableNames: ["containerId", "customStyleFile"]},
    viewHtmlNoCustomStyle: {path: 'components/view/html.nocustomstyle.hbs', variableNames: ["containerId"]},
    viewScssDefault: {path: 'components/view/scss.default.hbs', variableNames: ["containerId"]},
    initDefault: {path: 'init/default', variableNames: []},
}

export const config = {
    htmlDir: 'app/layout',
    cssDir: 'app/layout',
    tsDir: 'sources',
    assetsFolder: 'assets'
}
export class ProjectHandler {
    public static genContainerIdFromName(name: string) {
        return camelToSnake(name).toLowerCase();
    }
}