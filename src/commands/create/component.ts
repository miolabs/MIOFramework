import { assets } from "../../utils/ProjectHandler";
import { TemplateHandler } from "./TemplateHandler";
import { ControllerTemplate } from "./templates/ControllerTemplate";
import { StyleTemplate } from "./templates/StyleTemplate";
import { ViewTemplate } from "./templates/ViewTemplate";

export function View(params, name) {
    return component(params, name, false, true);
}

export function ViewController(params, name) {
    return component(params, name, true, true);
}

export function Controller(params, name) {
    const needTemplate = params.needTemplate;
    return component(params, name, true, needTemplate);
}

export function component(
    params, name: string, needController: boolean= false, needView: boolean= false) {
    const needStyle = !params.noStyle;
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
        promises.push(ctrl.build());
    }
    return Promise.all(promises);
}
