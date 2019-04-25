import { UIWindow } from "./UIWindow";
export declare enum MIOFileHandlingPanel {
    OKButton = 0
}
export declare class UIOpenPanel extends UIWindow {
    files: any[];
    static openPanel(): UIOpenPanel;
    private panelTarget;
    private panelCompletion;
    private _inputLayer;
    beginSheetModalForWindow(window: UIWindow, target: any, completion: any): void;
    private filesDidSelect;
}
