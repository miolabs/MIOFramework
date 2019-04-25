"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mio_foundation_web_1 = require("mio-foundation-web");
var UIWindow_1 = require("./UIWindow");
var mio_foundation_web_2 = require("mio-foundation-web");
var MUICoreBundle_1 = require("./core/MUICoreBundle");
/**
 * Created by godshadow on 11/3/16.
 */
var UIApplication = /** @class */ (function () {
    function UIApplication() {
        this.delegate = null;
        this.isMobile = false;
        this.defaultLanguage = null;
        this.currentLanguage = null;
        this.languages = null;
        this.ready = false;
        this.downloadCoreFileCount = 0;
        this._sheetViewController = null;
        this._sheetSize = null;
        //private _popUpMenuView = null;
        this._popUpMenu = null;
        this._popUpMenuControl = null;
        this._popOverWindow = null;
        this._popOverWindowFirstClick = false;
        this._popOverViewController = null;
        this._windows = [];
        this._keyWindow = null;
        this._mainWindow = null;
        this.mainResourceURLString = null;
        // addWindow(window:UIWindow){
        //     this._windows.push(window);
        // }
        this.windowZIndexOffset = 0;
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }
    UIApplication.sharedInstance = function () {
        if (UIApplication._sharedInstance == null) {
            UIApplication._sharedInstance = new UIApplication();
        }
        return UIApplication._sharedInstance;
    };
    //TODO: Set language in the webworker also.
    UIApplication.prototype.setLanguage = function (lang, target, completion) {
        var languages = mio_foundation_web_1.MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }
        var url = languages[lang];
        if (url == null) {
            completion.call(target);
        }
        var request = mio_foundation_web_1.NSURLRequest.requestWithURL(mio_foundation_web_1.NSURL.urlWithString(url));
        var con = new mio_foundation_web_1.NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                mio_foundation_web_2.MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });
    };
    UIApplication.prototype.downloadAppPlist = function (target, completion) {
        var request = mio_foundation_web_1.NSURLRequest.requestWithURL(mio_foundation_web_1.NSURL.urlWithString("app.plist"));
        var con = new mio_foundation_web_1.NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                mio_foundation_web_1.MIOCoreBundleSetAppResource("app", "plist", data);
            }
            completion.call(target, data);
        });
    };
    UIApplication.prototype.run = function () {
        this.downloadAppPlist(this, function (data) {
            if (data == null)
                throw new Error("We couldn't download the app.plist");
            // Get Languages from the app.plist
            var config = mio_foundation_web_1.NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            this.mainResourceURLString = config["UIMainStoryboardFile"];
            var langs = config["Languages"];
            if (langs == null)
                this._run();
            for (var key in langs) {
                var url = langs[key];
                mio_foundation_web_1.MIOCoreAddLanguage(key, url);
            }
            var lang = mio_foundation_web_1.MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function () {
                this._run();
            });
        });
    };
    UIApplication.prototype._run = function () {
        this.delegate.didFinishLaunching();
        this._mainWindow = this.delegate.window;
        if (this._mainWindow == null) {
            MUICoreBundle_1.MUICoreBundleLoadNibName(this.mainResourceURLString, this, function (vc) {
                this.delegate.window = new UIWindow_1.UIWindow();
                this.delegate.window.initWithRootViewController(vc);
                this._launchApp();
            });
        }
        else
            this._launchApp();
    };
    UIApplication.prototype._launchApp = function () {
        this.delegate.window.makeKeyAndVisible();
        this.delegate.window.rootViewController.onLoadView(this, function () {
            this.delegate.window.rootViewController.viewWillAppear(false);
            this.delegate.window.rootViewController.viewDidAppear(false);
            this.ready = true;
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        });
    };
    UIApplication.prototype.setLanguageURL = function (key, url) {
        if (this.languages == null)
            this.languages = {};
        this.languages[key] = url;
    };
    UIApplication.prototype.setDefaultLanguage = function (key) {
        this.defaultLanguage = key;
    };
    UIApplication.prototype.downloadLanguage = function (key, fn) {
        var url = this.languages[key];
        // Download
        var conn = new mio_foundation_web_1.NSURLConnection();
        conn.initWithRequestBlock(mio_foundation_web_1.NSURLRequest.requestWithURL(url), this, function (error, data) {
            if (data != null) {
                var json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                mio_foundation_web_2.MIOCoreStringSetLocalizedStrings(json);
            }
            fn.call(this);
        });
    };
    UIApplication.prototype.showModalViewContoller = function (vc) {
        var w = new UIWindow_1.UIWindow();
        w.initWithRootViewController(vc);
        // Add new window
        document.body.appendChild(vc.view.layer);
        //this.addWindow(w);
    };
    UIApplication.prototype.showMenuFromControl = function (control, menu) {
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
    };
    UIApplication.prototype.hideMenu = function () {
        if (this._popUpMenu != null) {
            this._popUpMenu.removeFromSuperview();
            this._popUpMenu = null;
        }
    };
    UIApplication.prototype._resizeEvent = function (event) {
        this.delegate.window.layoutSubviews();
    };
    UIApplication.prototype._clickEvent = function (event) {
        var target = event.coreEvent.target;
        var x = event.x;
        var y = event.y;
        // Checking popup menus
        if (this._popUpMenu != null) {
            var controlRect = this._popUpMenuControl.layer.getBoundingClientRect();
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
            var controlRect = this._keyWindow.layer.getBoundingClientRect();
            //console.log("x: " + controlRect.left + " mx: " + x);
            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                //Nothing. Forward the event
            }
            else
                this._keyWindow._eventHappendOutsideWindow();
        }
    };
    UIApplication.prototype.setPopOverViewController = function (vc) {
        if (this._popOverViewController != null)
            this._popOverViewController.dismissViewController(true);
        this._popOverViewController = vc;
    };
    UIApplication.prototype.showPopOverControllerFromRect = function (vc, frame) {
        if (this._popOverWindow != null) {
            this.hidePopOverController();
        }
        if (this._popOverWindow == null) {
            this._popOverWindow = new UIWindow_1.UIWindow("popover_window");
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
    };
    UIApplication.prototype.hidePopOverController = function () {
        this._popOverWindow.rootViewController.viewWillDisappear(true);
        this._popOverWindow.removeFromSuperview();
        this._popOverWindow.rootViewController.viewDidDisappear(true);
        this._popOverWindow = null;
    };
    UIApplication.prototype.makeKeyWindow = function (window) {
        if (this._keyWindow === window)
            return;
        if (this._keyWindow != null) {
            this._keyWindow._resignKeyWindow();
            //this.windowZIndexOffset -= 10;
        }
        //this.addWindow(window);
        this._keyWindow = window;
        //window.layer.style.zIndex = this.windowZIndexOffset;
        //this.windowZIndexOffset += 10;
    };
    return UIApplication;
}());
exports.UIApplication = UIApplication;
//# sourceMappingURL=UIApplication.js.map