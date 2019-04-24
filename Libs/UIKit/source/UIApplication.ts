import {NSURLRequest, NSURLConnection, NSPropertyListSerialization, NSURL, MIOCoreGetLanguages, MIOCoreAddLanguage, MIOCoreGetPlatformLanguage} from "mio-foundation-web";
import { UIWindow } from "./UIWindow";
import { MIOCoreStringSetLocalizedStrings } from "mio-foundation-web";

/**
 * Created by godshadow on 11/3/16.
 */


export class UIApplication {

    private static _sharedInstance: UIApplication;

    static sharedInstance(): UIApplication {

        if (UIApplication._sharedInstance == null) {
            UIApplication._sharedInstance = new UIApplication();
        }

        return UIApplication._sharedInstance;
    }

    private constructor() {
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }

    delegate = null;

    isMobile = false;
    defaultLanguage = null;
    currentLanguage = null;
    languages = null;
    ready = false;

    private downloadCoreFileCount = 0;

    private _sheetViewController = null;
    private _sheetSize = null;
    //private _popUpMenuView = null;
    private _popUpMenu = null;
    private _popUpMenuControl = null;

    private _popOverWindow = null;
    private _popOverWindowFirstClick = false;

    private _popOverViewController = null;

    private _windows = [];
    private _keyWindow:UIWindow = null;
    private _mainWindow = null;

    //TODO: Set language in the webworker also.
    private setLanguage(lang, target, completion){
        let languages = MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }

        let url = languages[lang];
        if (url == null){
            completion.call(target);
        }
        
        let request = NSURLRequest.requestWithURL(NSURL.urlWithString(url));
        let con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function(code, data){
            if (code == 200) {
                MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });        
    }

    private downloadAppPlist(target, completion){        
        let request = NSURLRequest.requestWithURL(NSURL.urlWithString("app.plist"));
        let con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function(code, data){
            if (code == 200) {                
                _MIOBundleAppSetResource("app", "plist", data);
            }
            completion.call(target, data);
        });        

    }

    run(){
        this.downloadAppPlist(this, function(data){
            if (data == null) throw new Error("We couldn't download the app.plist");
            
            // Get Languages from the app.plist
            let config = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            let langs = config["Languages"];
            for (let key in langs) {
                let url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            let lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function(){
                this._run();
            });            
        });
    }

    private _run() {        

        this.delegate.didFinishLaunching();
        
        this.delegate.window.makeKeyAndVisible();
        this._mainWindow = this.delegate.window;        
        
        this.delegate.window.rootViewController.onLoadView(this, function () {
            
            this.delegate.window.rootViewController.viewWillAppear(false);
            this.delegate.window.rootViewController.viewDidAppear(false);

            this.ready = true;

            MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        });
    }

    setLanguageURL(key, url) {
        if (this.languages == null)
            this.languages = {};

        this.languages[key] = url;
    }

    setDefaultLanguage(key) {
        this.defaultLanguage = key;
    }

    downloadLanguage(key, fn) {        
        let url = this.languages[key];

        // Download
        let conn = new NSURLConnection();
        conn.initWithRequestBlock(NSURLRequest.requestWithURL(url), this, function (error, data) {

            if (data != null) {
                let json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                MIOCoreStringSetLocalizedStrings(json);
            }

            fn.call(this);
        });
    }

    showModalViewContoller(vc) {
        let w = new UIWindow();
        w.initWithRootViewController(vc);        

        // Add new window
        document.body.appendChild(vc.view.layer);

        //this.addWindow(w);
    }

    showMenuFromControl(control, menu) {
        if (this._popUpMenu != null) {
            if (menu.layerID != this._popUpMenu.layerID)
                this._popUpMenu.hide();
        }

        this._popUpMenuControl = control;
        this._popUpMenu = menu;

        this.delegate.window.addSubview(this._popUpMenu);

        var x = control.layer.getBoundingClientRect().left;
        var y = control.layer.getBoundingClientRect().top + control.layer.getBoundingClientRect().height;
        this._popUpMenu.setX(x);
        this._popUpMenu.setY(y);
        this._popUpMenu.layer.style.zIndex = 200;

        this._popUpMenu.layout();
    }

    hideMenu() {
        if (this._popUpMenu != null) {
            this._popUpMenu.removeFromSuperview();
            this._popUpMenu = null;
        }
    }

    private _resizeEvent(event:MIOCoreEvent) {        
        this.delegate.window.layoutSubviews();
    }

    private _clickEvent(event:MIOCoreEventInput){
        var target = event.coreEvent.target;
        var x = event.x;
        var y = event.y;
    
        // Checking popup menus
        if (this._popUpMenu != null) {
            let controlRect = this._popUpMenuControl.layer.getBoundingClientRect();

            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {

                // Nothing
            }
            else {
                this._popUpMenu.hide();
            }
        }

        // Checking windows

        if (this._keyWindow != null) {        
            let controlRect = this._keyWindow.layer.getBoundingClientRect();

            //console.log("x: " + controlRect.left + " mx: " + x);

            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                //Nothing. Forward the event
            }
            else
                this._keyWindow._eventHappendOutsideWindow();
        }
    }

    setPopOverViewController(vc) {
        if (this._popOverViewController != null)
            this._popOverViewController.dismissViewController(true);

        this._popOverViewController = vc;
    }

    showPopOverControllerFromRect(vc, frame) {
        if (this._popOverWindow != null) {
            this.hidePopOverController();
        }

        if (this._popOverWindow == null) {
            this._popOverWindow = new UIWindow("popover_window");
            this._popOverWindow.initWithRootViewController(vc.popoverPresentationController());
            //this._popOverWindow.layer.style.border = "2px solid rgb(170, 170, 170)";
            this._popOverWindow.setFrame(vc.popoverPresentationController().frame);
            //this.addWindow(this._popOverWindow);
        }

        this._popOverWindow.rootViewController.onLoadView(this, function () {
            this._popOverWindow.rootViewController.viewWillAppear(true);
            this._popOverWindow.rootViewController.viewDidAppear(true);
        });

        this._popOverWindowFirstClick = true;
    }

    hidePopOverController() {
        this._popOverWindow.rootViewController.viewWillDisappear(true);
        this._popOverWindow.removeFromSuperview();
        this._popOverWindow.rootViewController.viewDidDisappear(true);

        this._popOverWindow = null;
    }
    
    // addWindow(window:UIWindow){
    //     this._windows.push(window);
    // }

    private windowZIndexOffset = 0;
    makeKeyWindow(window:UIWindow){
        if (this._keyWindow === window) return;

        if (this._keyWindow != null) {
            this._keyWindow._resignKeyWindow();
            //this.windowZIndexOffset -= 10;
        }                    

        //this.addWindow(window);
        this._keyWindow = window;

        //window.layer.style.zIndex = this.windowZIndexOffset;
        //this.windowZIndexOffset += 10;

    }
}
