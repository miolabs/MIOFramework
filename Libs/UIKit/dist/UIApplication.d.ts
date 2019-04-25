import { UIWindow } from "./UIWindow";
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UIApplication {
    private static _sharedInstance;
    static sharedInstance(): UIApplication;
    private constructor();
    delegate: any;
    isMobile: boolean;
    defaultLanguage: any;
    currentLanguage: any;
    languages: any;
    ready: boolean;
    private downloadCoreFileCount;
    private _sheetViewController;
    private _sheetSize;
    private _popUpMenu;
    private _popUpMenuControl;
    private _popOverWindow;
    private _popOverWindowFirstClick;
    private _popOverViewController;
    private _windows;
    private _keyWindow;
    private _mainWindow;
    private setLanguage;
    private downloadAppPlist;
    run(): void;
    private mainResourceURLString;
    private _run;
    private _launchApp;
    setLanguageURL(key: any, url: any): void;
    setDefaultLanguage(key: any): void;
    downloadLanguage(key: any, fn: any): void;
    showModalViewContoller(vc: any): void;
    showMenuFromControl(control: any, menu: any): void;
    hideMenu(): void;
    private _resizeEvent;
    private _clickEvent;
    setPopOverViewController(vc: any): void;
    showPopOverControllerFromRect(vc: any, frame: any): void;
    hidePopOverController(): void;
    private windowZIndexOffset;
    makeKeyWindow(window: UIWindow): void;
}
