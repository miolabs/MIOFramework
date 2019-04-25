import { UIView } from "./UIView";
/**
 * Created by godshadow on 04/08/16.
 */
export declare class UIWebView extends UIView {
    private _iframeLayer;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _setupLayer;
    setURL(url: any): void;
    setHTML(html: any): void;
}
