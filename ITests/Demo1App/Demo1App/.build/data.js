var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ViewController = /** @class */ (function (_super) {
    __extends(ViewController, _super);
    function ViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewController.prototype.textLabel$get = function () { return this.textLabel$internal; };
    Object.defineProperty(ViewController.prototype, "textLabel", {
        get: function () { return this.textLabel$get(); },
        set: function ($newValue) { this.textLabel$set($newValue); },
        enumerable: true,
        configurable: true
    });
    ViewController.prototype.textLabel$set = function ($newValue) {
        var $oldValue = this.textLabel$internal;
        this.textLabel$internal = $newValue;
    };
    ;
    ViewController.prototype.viewDidLoad = function ($info0x7fe4780aca98) {
        var _this = this;
        _super.prototype.viewDidLoad.call(this, {});
    };
    ViewController.prototype.buttonClicked = function ($info0x7fe4780ace58, sender) {
        var _this = this;
        //_this.textLabel[0]._text = _injectIntoOptional("Bye");
        console.log("??");
    };
    ViewController.prototype.initNibNameOptionalBundleOptional = function ($info0x7fe47877a470, nibNameOrNil, nibBundleOrNil) {
        var _this = this;
        _super.prototype.initNibNameOptionalBundleOptional.call(this, {}, nibNameOrNil, nibBundleOrNil);
        return;
    };
    ViewController.prototype.initCoderNSCoder = function ($info0x7fe47877b880, aDecoder) {
        var _this = this;
        _super.prototype.initCoderNSCoder.call(this, {}, aDecoder);
        return;
    };
    ViewController.prototype.init$vars = function () {
        if (_super.prototype.init$vars)
            _super.prototype.init$vars.call(this);
        this.textLabel$internal = Optional.none;
    };
    ViewController.$infoAddress = '0x7fe47800acf8';
    ViewController.initCoderNSCoder$failable = true;
    return ViewController;
}(UIViewController));
var AppDelegate = /** @class */ (function (_super) {
    __extends(AppDelegate, _super);
    function AppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDelegate.prototype._window$get = function () { return this._window$internal; };
    Object.defineProperty(AppDelegate.prototype, "_window", {
        get: function () { return this._window$get(); },
        set: function ($newValue) { this._window$set($newValue); },
        enumerable: true,
        configurable: true
    });
    AppDelegate.prototype._window$set = function ($newValue) {
        var $oldValue = this._window$internal;
        this._window$internal = $newValue;
    };
    ;
    AppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function ($info0x7fe4780ad828, application, launchOptions) {
        var _this = this;
        return true;
    };
    AppDelegate.prototype.applicationWillResignActive = function ($info0x7fe4780b2938, application) {
        var _this = this;
    };
    AppDelegate.prototype.applicationDidEnterBackground = function ($info0x7fe4780b2bd8, application) {
        var _this = this;
    };
    AppDelegate.prototype.applicationWillEnterForeground = function ($info0x7fe4780b2e78, application) {
        var _this = this;
    };
    AppDelegate.prototype.applicationDidBecomeActive = function ($info0x7fe4780b3118, application) {
        var _this = this;
    };
    AppDelegate.prototype.applicationWillTerminate = function ($info0x7fe4780b33b8, application) {
        var _this = this;
    };
    AppDelegate.prototype.init = function ($info0x7fe47a803258) {
        var _this = this;
        _super.prototype.init.call(this, {});
        return;
    };
    AppDelegate.prototype.init$vars = function () {
        if (_super.prototype.init$vars)
            _super.prototype.init$vars.call(this);
        this._window$internal = Optional.none;
    };
    AppDelegate.$infoAddress = '0x7fe4780ad1b0';
    return AppDelegate;
}(MUIResponder));
if (typeof MUIApplicationDelegate$implementation != 'undefined')
    _mixin(AppDelegate, MUIApplicationDelegate$implementation, false);
