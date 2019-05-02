class ViewController extends MUIViewController{

    textLabel$internal
    textLabel$get() { return this.textLabel$internal }
    get textLabel() { return this.textLabel$get() }
    textLabel$set($newValue) {
    let $oldValue = this.textLabel$internal
    this.textLabel$internal = $newValue
    }
    set textLabel($newValue) { this.textLabel$set($newValue) }
    ;
    
    
    
    
    
    viewDidLoad($info?){
    let _this = this;
    
    super.viewDidLoad( {});
    }
    buttonClickedWithSender(sender, $info?){
    let _this = this;
    
    this.textLabel[0]._text = _injectIntoOptional("Bye");
    }
    initNibNameOptionalBundleOptional(nibNameOrNil, nibBundleOrNil, $info?){
    let _this = this;
    
    super.initNibNameOptionalBundleOptional(nibNameOrNil, nibBundleOrNil, {});
    return ;
    }
    initCoderNSCoder(aDecoder, $info?){
    let _this = this;
    
    super.initCoderNSCoder(aDecoder, {});
    return ;
    }
    static readonly initCoderNSCoder$failable = true
    
    init$vars() {
    if(super.init$vars)super.init$vars()
    this.textLabel$internal = Optional.none
    }
    }
    
    class AppDelegate extends MUIResponder implements MUIApplicationDelegate{
    
    _window$internal
    _window$get() { return this._window$internal }
    get _window() { return this._window$get() }
    _window$set($newValue) {
    let $oldValue = this._window$internal
    this._window$internal = $newValue
    }
    set _window($newValue) { this._window$set($newValue) }
    ;
    
    
    
    
    
    applicationDidFinishLaunchingWithOptions(application, launchOptions, $info?){
    let _this = this;
    
    return true;
    }
    applicationWillResignActive(application, $info?){
    let _this = this;
    
    }
    applicationDidEnterBackground(application, $info?){
    let _this = this;
    
    }
    applicationWillEnterForeground(application, $info?){
    let _this = this;
    
    }
    applicationDidBecomeActive(application, $info?){
    let _this = this;
    
    }
    applicationWillTerminate(application, $info?){
    let _this = this;
    
    }
    init($info?){
    let _this = this;
    
    super.init( {});
    return ;
    }
    
    init$vars() {
    if(super.init$vars)super.init$vars()
    this._window$internal = Optional.none
    }
    }
    if(typeof MUIApplicationDelegate$implementation != 'undefined') _mixin(AppDelegate, MUIApplicationDelegate$implementation, false)