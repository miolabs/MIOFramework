import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 15/3/16.
 */
export declare class UITextArea extends UIControl {
    private textareaLayer;
    textChangeTarget: any;
    textChangeAction: any;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayer;
    text: any;
    setText(text: any): void;
    getText(): any;
    setEditMode(value: any): void;
    setOnChangeText(target: any, action: any): void;
}
