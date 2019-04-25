import { UIView } from "./UIView";
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UIImageView extends UIView {
    private _imageLayer;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    setImage(imageURL: any): void;
    setHeight(h: any): void;
    setWidth(w: any): void;
}
