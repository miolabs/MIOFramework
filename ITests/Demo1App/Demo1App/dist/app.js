var __extends=this&&this.__extends||function(){var i=function(t,n){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}i(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),ViewController=function(i){function t(){return null!==i&&i.apply(this,arguments)||this}return __extends(t,i),t.prototype.textLabel$get=function(){return this.textLabel$internal},Object.defineProperty(t.prototype,"textLabel",{get:function(){return this.textLabel$get()},set:function(t){this.textLabel$set(t)},enumerable:!0,configurable:!0}),t.prototype.textLabel$set=function(t){this.textLabel$internal;this.textLabel$internal=t},t.prototype.viewDidLoad=function(t){i.prototype.viewDidLoad.call(this,{})},t.prototype.buttonClickedWithSender=function(t,n){console.log("Button clicked!!")},t.prototype.initNibNameOptionalBundleOptional=function(t,n,e){i.prototype.initNibNameOptionalBundleOptional.call(this,{},n,e)},t.prototype.initCoderNSCoder=function(t,n){i.prototype.initCoderNSCoder.call(this,{},n)},t.prototype.init$vars=function(){i.prototype.init$vars&&i.prototype.init$vars.call(this),this.textLabel$internal=Optional.none},t.$infoAddress="0x7fe47800acf8",t.initCoderNSCoder$failable=!0,t}(UIViewController),AppDelegate=function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return __extends(t,n),t.prototype._window$get=function(){return this._window$internal},Object.defineProperty(t.prototype,"_window",{get:function(){return this._window$get()},set:function(t){this._window$set(t)},enumerable:!0,configurable:!0}),t.prototype._window$set=function(t){this._window$internal;this._window$internal=t},t.prototype.applicationDidFinishLaunchingWithOptions=function(t,n,e){return!0},t.prototype.applicationWillResignActive=function(t,n){},t.prototype.applicationDidEnterBackground=function(t,n){},t.prototype.applicationWillEnterForeground=function(t,n){},t.prototype.applicationDidBecomeActive=function(t,n){},t.prototype.applicationWillTerminate=function(t,n){},t.prototype.init=function(t){n.prototype.init.call(this,{})},t.prototype.init$vars=function(){n.prototype.init$vars&&n.prototype.init$vars.call(this),this._window$internal=Optional.none},t.$infoAddress="0x7fe4780ad1b0",t}(UIResponder);"undefined"!=typeof UIApplicationDelegate$implementation&&_mixin(AppDelegate,UIApplicationDelegate$implementation,!1);