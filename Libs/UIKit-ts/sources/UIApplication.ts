/**
 * Created by godshadow on 11/3/16.
 */

import { Bundle, NSLog, PropertyListSerialization, URLConnection, URLRequest, _MIOBundleAppGetResource, _MIOBundleLoadBundles } from "foundation";
import { MIOCoreAddLanguage, MIOCoreGetContentsFromURLString, MIOCoreGetLanguages, MIOCoreGetMainURLString, MIOCoreGetPlatformLanguage, MIOCoreGetQueryOptions, MIOLocalizedStringsSet } from "mio-core";
import { UIApplicationDelegate } from "./UIApplicationDelegate";
import { UIStoryboard } from "./UIStoryboard";
import { UIWindow } from "./UIWindow";


export class UIApplication 
{
    private static _sharedInstance: UIApplication;

    static get shared(): UIApplication {

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

    delegate: UIApplicationDelegate|null = null;

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
    private setLanguage(lang:string, completion:any){
        let languages = MIOCoreGetLanguages();
        if (languages == null) {
            completion();
            return;
        }

        let url = languages[lang];
        if (url == null){
            completion();
            return;
        }
        
        MIOCoreGetContentsFromURLString(url, this, function(this:Bundle, code:number, data:string){
            if (code == 200) {
                MIOLocalizedStringsSet(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion();
        });        
    }

    run( args:string[] ){
        _MIOBundleLoadBundles("app.bundles.json", (error:Error) => {
            
            if (error != null) { NSLog(error); return }

            // Get Languages from the app.plist
            let appPlistData = _MIOBundleAppGetResource("Main", "app", "plist");
            if (appPlistData == null) throw new Error("We couldn't download the app.plist");

            let config = PropertyListSerialization.propertyListWithData(appPlistData, 0, 0, null);

            // Get Main story board
            // let mainStoryBoardFile = config["UIMainStoryboardFile"];
            // if (mainStoryBoardFile != null) {
            //     MIOCoreDownloadResource(mainStoryBoardFile, "json", this, function(data){
            //         this.mainStoryboard = new UIStoryboard();
            //         this.mainStoryboard.initWithName(mainStoryBoardFile, null);

            //         this.downloadLanguages(config);
            //     });


            let langs = config["Languages"];
            for (let key in langs) {
                let url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            let lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, () => {
                let args = this._parse_options();
                this._run( args );
            });
        });

        // // Get App.plist
        // MIOCoreGetContentsFromURLString("app.plist", this, function(this:UIApplication, code:number, data:any) {
        //     if (data == null) throw new Error("We couldn't download the app.plist");
                                    
        //     let config = PropertyListSerialization.propertyListWithData(data, 0, 0, null);
        //     let mainStoryBoardFile = "layout/" + config["UIMainStoryboardFile"];

        //     // Get Main story board
        //     if (mainStoryBoardFile != null) {
        // //         MIOCoreBundleDownloadResource(mainStoryBoardFile, "json", this, function(data){
        // //             this.mainStoryboard = new UIStoryboard();
        // //             this.mainStoryboard.initWithName(mainStoryBoardFile, null);

        // //             this.downloadLanguages(config);
        // //         });
        //     }
        //     else {
        //         this.downloadLanguages(config);
        //     }
        // });
    }

    private _parse_options() {
        let url = MIOCoreGetMainURLString();
        let queryOptions = MIOCoreGetQueryOptions();

        let options = {}
        options["url"] = url;
        for (let index = 0; index < queryOptions.length; index++) {
            const op = queryOptions[index];
            const array = op.split("=");
            options[array[0]] = decodeURIComponent(array[1]);
        }

        return options;
    }
    
    private mainStoryboard:UIStoryboard = null;
    private _run( args:any ) {

        if ( this.delegate.applicationDidFinishLaunchingWithOptions( this, args ) == false ) {
            NSLog("Error in applicationDidFinishLaunchingWithOptions");
            return;
        };
        this._mainWindow = this.delegate.window;

        if (this._mainWindow == null) {
            let vc = this.mainStoryboard.instantiateInitialViewController();
            this.delegate.window = new UIWindow();
            this.delegate.window.initWithRootViewController(vc);

            this._launchApp()            
            // MUICoreBundleLoadNibName( this.initialResourceURLString, this, function(vc:UIViewController){
            //     this.delegate.window = new UIWindow();
            //     this.delegate.window.initWithRootViewController(vc);
            //     this._launchApp()
            // });
        }
        else this._launchApp();         
    }

    private _launchApp(){
        this.delegate.window.makeKeyAndVisible();

        this.delegate.window.rootViewController.onLoadView( () => {
            
            let window = this.delegate.window as UIWindow;
            window.addSubview(window.rootViewController.view);
            
            this.delegate.window.rootViewController.viewWillAppear(false);
            this.delegate.window.rootViewController.viewDidAppear(false);

            this.ready = true;

            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
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
        let conn = new URLConnection();
        conn.initWithRequestBlock(URLRequest.requestWithURL(url), this, function (error, data) {

            if (data != null) {
                let json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                // MIOCoreStringSetLocalizedStrings(json);
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

        let x = control.layer.getBoundingClientRect().left;
        let y = control.layer.getBoundingClientRect().top + control.layer.getBoundingClientRect().height;
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

    // private _resizeEvent(event:MUICoreEvent) {        
    //     this.delegate.window.layoutSubviews();
    // }

    // private _clickEvent(event:MUICoreEventInput){
    //     let target = event.coreEvent.target;
    //     let x = event.x;
    //     let y = event.y;
    
    //     // Checking popup menus
    //     if (this._popUpMenu != null) {
    //         let controlRect = this._popUpMenuControl.layer.getBoundingClientRect();

    //         if ((x > controlRect.left && x < controlRect.right)
    //             && (y > controlRect.top && y < controlRect.bottom)) {

    //             // Nothing
    //         }
    //         else {
    //             this._popUpMenu.hide();
    //         }
    //     }

    //     // Checking windows

    //     if (this._keyWindow != null) {        
    //     //     let controlRect = this._keyWindow.layer.getBoundingClientRect();

    //     //     //console.log("x: " + controlRect.left + " mx: " + x);

    //     //     if ((x > controlRect.left && x < controlRect.right)
    //     //         && (y > controlRect.top && y < controlRect.bottom)) {
    //     //         //Nothing. Forward the event
    //     //     }
    //     //     else
    //     //         this._keyWindow._eventHappendOutsideWindow();
    //     }
    // }

    // setPopOverViewController(vc) {
    //     if (this._popOverViewController != null)
    //         this._popOverViewController.dismissViewController(true);

    //     this._popOverViewController = vc;
    // }

    // showPopOverControllerFromRect(vc, frame) {
    //     if (this._popOverWindow != null) {
    //         this.hidePopOverController();
    //     }

    //     if (this._popOverWindow == null) {
    //         this._popOverWindow = new UIWindow("popover_window");
    //         this._popOverWindow.initWithRootViewController(vc.popoverPresentationController());
    //         //this._popOverWindow.layer.style.border = "2px solid rgb(170, 170, 170)";
    //         this._popOverWindow.setFrame(vc.popoverPresentationController().frame);
    //         //this.addWindow(this._popOverWindow);
    //     }

    //     this._popOverWindow.rootViewController.onLoadView(this, function () {
    //         this._popOverWindow.rootViewController.viewWillAppear(true);
    //         this._popOverWindow.rootViewController.viewDidAppear(true);
    //     });

    //     this._popOverWindowFirstClick = true;
    // }

    // hidePopOverController() {
    //     this._popOverWindow.rootViewController.viewWillDisappear(true);
    //     this._popOverWindow.removeFromSuperview();
    //     this._popOverWindow.rootViewController.viewDidDisappear(true);

    //     this._popOverWindow = null;
    // }
    
    // addWindow(window:UIWindow){
    //     this._windows.push(window);
    // }

    // private windowZIndexOffset = 0;
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
