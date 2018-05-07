import { cleanArgs } from "../../utils/arguments";
import { assets } from "../../utils/ProjectHandler";
import { TemplateHandler } from "./TemplateHandler";
import { ControllerTemplate } from "./templates/ControllerTemplate";
import { StyleTemplate } from "./templates/StyleTemplate";
import { ViewTemplate } from "./templates/ViewTemplate";

export function View(cmd, name) {
    const params = cleanArgs(cmd);
    const needStyle = !params.noStyle;
    return component(params, name, false, true, needStyle);
}
export function ViewController(cmd, name) {
    const params = cleanArgs(cmd);
    const needStyle = !params.noStyle;
    return component(params, name, true, true, needStyle);
}
export function Controller(cmd, name) {
    const params = cleanArgs(cmd);
    const needStyle = !params.noStyle;
    const needTemplate = params.needTemplate;
    return component(params, name, true, needTemplate, needStyle);
}

export function component(
    params, name: string, needController: boolean= false, needView: boolean= false, needStyle: boolean= false) {
    const promises = [];
    let style = null;
    let view = null;

    if (needStyle) {
        if (params.scss) {
            style = new StyleTemplate(name, assets.viewScssDefault);
        } else {
            style = new StyleTemplate(name, assets.viewCssDefault);
        }
        const css = new TemplateHandler(style.getBuildInfo());
        promises.push(css.build());
    }
    if (needView) {
        if (params.noCustomStyle) {
            view = new ViewTemplate(name, assets.viewHtmlNoCustomStyle, style);
        } else {
            view = new ViewTemplate(name, assets.viewHtmlDefault, style);
        }
        const html = new TemplateHandler(view.getBuildInfo());
        promises.push(html.build());
    }
    if (needController) {
        let ts = null;
        if (!needView && params.initEmptyResource) {
            ts = new ControllerTemplate(name, assets.compVCEmptyRes);
        } else if (!needView && params.initEmpty) {
            ts = new ControllerTemplate(name, assets.compVCEmpty);
        } else {
            ts = new ControllerTemplate(name, assets.compVcDefault, view);
        }
        const ctrl = new TemplateHandler(ts.getBuildInfo());
    }
    return Promise.all(promises);
}
