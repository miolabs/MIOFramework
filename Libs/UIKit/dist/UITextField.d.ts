import { UIControl } from "./UIControl";
import { MIOFormatter } from "../MIOFoundation";
/**
 * Created by godshadow on 12/3/16.
 */
export declare enum UITextFieldType {
    NormalType = 0,
    PasswordType = 1,
    SearchType = 2
}
export declare class UITextField extends UIControl {
    placeHolder: any;
    private _inputLayer;
    type: UITextFieldType;
    textChangeTarget: any;
    textChangeAction: any;
    private _textChangeFn;
    enterPressTarget: any;
    enterPressAction: any;
    keyPressTarget: any;
    keyPressAction: any;
    formatter: MIOFormatter;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _setupLayer;
    setText(text: any): void;
    text: any;
    setPlaceholderText(text: any): void;
    placeholderText: string;
    setOnChangeText(target: any, action: any): void;
    private _textStopPropagationFn;
    private _registerInputEvent;
    private _unregisterInputEvent;
    private _textDidChange;
    private _textDidChangeDelegate;
    private didBeginEditingAction;
    private didBeginEditingTarget;
    setOnBeginEditing(target: any, action: any): void;
    private _textDidBeginEditingFn;
    private _textDidBeginEditing;
    private didEndEditingAction;
    private didEndEditingTarget;
    setOnDidEndEditing(target: any, action: any): void;
    private _textDidEndEditingFn;
    private _textDidEndEditing;
    setOnEnterPress(target: any, action: any): void;
    setOnKeyPress(target: any, action: any): void;
    setTextRGBColor(r: any, g: any, b: any): void;
    textColor: any;
    setEnabled(value: any): void;
    becomeFirstResponder(): void;
    resignFirstResponder(): void;
    selectAll(control: UITextField): void;
}
