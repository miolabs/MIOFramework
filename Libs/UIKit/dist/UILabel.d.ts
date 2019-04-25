import { UIView } from "./UIView";
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UILabel extends UIView {
    private _textLayer;
    autoAdjustFontSize: string;
    autoAdjustFontSizeValue: number;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    setText(text: any): void;
    text: any;
    setTextAlignment(alignment: any): void;
    setHightlighted(value: any): void;
    setTextRGBColor(r: any, g: any, b: any): void;
    setFontSize(size: any): void;
    setFontStyle(style: any): void;
    setFontFamily(fontFamily: any): void;
}
