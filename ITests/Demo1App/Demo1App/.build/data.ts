

class ViewController extends MUIViewController{
static readonly $infoAddress = '0x7fe47800acf8'

textLabel$internal
textLabel$get() { return this.textLabel$internal }
get textLabel() { return this.textLabel$get() }
textLabel$set($newValue) {
let $oldValue = this.textLabel$internal
this.textLabel$internal = $newValue
}
set textLabel($newValue) { this.textLabel$set($newValue) }
;





viewDidLoad($info0x7fe4780aca98){
let _this = this;

super.viewDidLoad({}, );
}
buttonClicked($info0x7fe4780ace58, sender){
let _this = this;

_this.textLabel[0]._text = _injectIntoOptional("Bye");
}
initNibNameOptionalBundleOptional($info0x7fe47877a470, nibNameOrNil, nibBundleOrNil){
let _this = this;

super.initNibNameOptionalBundleOptional({}, nibNameOrNil, nibBundleOrNil);
return ;
}
initCoderNSCoder($info0x7fe47877b880, aDecoder){
let _this = this;

super.initCoderNSCoder({}, aDecoder);
return ;
}
static readonly initCoderNSCoder$failable = true

init$vars() {
if(super.init$vars)super.init$vars()
this.textLabel$internal = Optional.none
}
}

class AppDelegate extends MUIResponder implements MUIApplicationDelegate{
static readonly $infoAddress = '0x7fe4780ad1b0'

_window$internal
_window$get() { return this._window$internal }
get _window() { return this._window$get() }
_window$set($newValue) {
let $oldValue = this._window$internal
this._window$internal = $newValue
}
set _window($newValue) { this._window$set($newValue) }
;





applicationDidFinishLaunchingWithOptions($info0x7fe4780ad828, application, launchOptions){
let _this = this;

return true;
}
applicationWillResignActive($info0x7fe4780b2938, application){
let _this = this;

}
applicationDidEnterBackground($info0x7fe4780b2bd8, application){
let _this = this;

}
applicationWillEnterForeground($info0x7fe4780b2e78, application){
let _this = this;

}
applicationDidBecomeActive($info0x7fe4780b3118, application){
let _this = this;

}
applicationWillTerminate($info0x7fe4780b33b8, application){
let _this = this;

}
init($info0x7fe47a803258){
let _this = this;

super.init({}, );
return ;
}

init$vars() {
if(super.init$vars)super.init$vars()
this._window$internal = Optional.none
}
}
if(typeof MUIApplicationDelegate$implementation != 'undefined') _mixin(AppDelegate, MUIApplicationDelegate$implementation, false)