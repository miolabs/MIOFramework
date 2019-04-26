"use strict";var UIAnimationType,UIActivityIndicatorViewStyle,__extends=this&&this.__extends||function(){var i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};return function(e,t){function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}();function UIOutletRegister(e,t,n){e._outlets[t]=n}function UIOutletQuery(e,t){return e._outlets[t]}function UIOutlet(e,t,n,i){var o=UIOutletQuery(e,t);if(null!=o)return o;var r=null;if(e instanceof UIView?r=UILayerSearchElementByID(e.layer,t):e instanceof UIViewController&&(r=UILayerSearchElementByID(e.view.layer,t)),null==r)return null;null==n&&(n=r.getAttribute("data-class")),null==n&&(n="UIView");var a=NSClassFromString(n);if(a.initWithLayer(r,e,i),UIOutletRegister(e,t,a),e instanceof UIView)e._linkViewToSubview(a);else if(e instanceof UIViewController)if(a instanceof UIView)e.view._linkViewToSubview(a);else{if(!(a instanceof UIViewController))throw new Error("UIOutlet: Wrong type");e.addChildViewController(a)}return a instanceof UIView&&a.awakeFromHTML(),a}function UIWindowSize(){var e=document.body.clientWidth,t=window.innerHeight;return new NSSize(e,t)}function _MIUShowViewController(e,t,n,i,o,r){t.viewWillAppear(),t.modalPresentationStyle!=UIModalPresentationStyle.FullScreen&&t.modalPresentationStyle!=UIModalPresentationStyle.CurrentContext||e.viewWillDisappear();var a=null,l=t.presentationController;if(a=null!=l?l.presentedView:t.view,0!=i){var s={};s.presentingViewController=e,s.presentedViewController=t,s.presentedView=a,null!=l&&l.presentationTransitionWillBegin();var u=null;null!=t.transitioningDelegate?u=t.transitioningDelegate.animationControllerForPresentedController(t,e,n):null!=n&&"function"==typeof n.animationControllerForPresentedController?u=n.animationControllerForPresentedController(t,e,n):null!=l&&(u=l.transitioningDelegate.animationControllerForPresentedController(t,e,n)),_UIAnimationStart(a.layer,u,s,this,function(){_UIAnimationDidStart(e,t,l,o,r)})}else _UIAnimationDidStart(e,t,l,o,r)}function _UIAnimationDidStart(e,t,n,i,o){t.viewDidAppear(),t.modalPresentationStyle!=UIModalPresentationStyle.FullScreen&&t.modalPresentationStyle!=UIModalPresentationStyle.CurrentContext||e.viewDidDisappear(),null!=n&&(n.presentationTransitionDidEnd(!0),n._isPresented=!0),null!=i&&null!=o&&o.call(i)}function _UIHideViewController(e,t,n,i,o){e.modalPresentationStyle!=UIModalPresentationStyle.FullScreen&&e.modalPresentationStyle!=UIModalPresentationStyle.CurrentContext&&1!=MIOCoreIsPhone()||t.viewWillAppear(),e.viewWillDisappear();var r=null,a=e.presentationController;r=null!=a?a.presentedView:e.view;var l=null;null!=e.transitioningDelegate?l=e.transitioningDelegate.animationControllerForDismissedController(e):null!=n&&"function"==typeof n.animationControllerForDismissedController?l=n.animationControllerForDismissedController(e):null!=a&&(l=a.transitioningDelegate.animationControllerForDismissedController(e));var s={};s.presentingViewController=e,s.presentedViewController=t;var u=(s.presentedView=r).layer;null!=a&&a.dismissalTransitionWillBegin(),_UIAnimationStart(u,l,s,this,function(){e.modalPresentationStyle!=UIModalPresentationStyle.FullScreen&&e.modalPresentationStyle!=UIModalPresentationStyle.CurrentContext||t.viewDidAppear(),e.viewDidDisappear(),null!=a&&(a.dismissalTransitionDidEnd(!0),a._isPresented=!1),null!=i&&null!=o&&o.call(i)})}function _UITransitionFromViewControllerToViewController(e,t,n,i,o){t.viewWillAppear(),e.viewWillDisappear();var r=null;null!=t.transitioningDelegate?r=t.transitioningDelegate.animationControllerForPresentedController(t,e,n):null!=n&&null!=n.transitioningDelegate&&(r=n.transitioningDelegate.animationControllerForPresentedController(t,e,n));var a={};a.presentingViewController=e,a.presentedViewController=t,_UIAnimationStart((a.presentedView=t).view.layer,r,a,this,function(){t.viewDidAppear(),e.viewDidDisappear(),null!=i&&null!=o&&o.call(i)})}function MUICoreLayerIDFromObject(e){return MUICoreLayerIDFromClassname(e.constructor.name.substring(3))}function MUICoreLayerIDFromClassname(e){for(var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],n="",i=0;i<4;i++){n+=t[Math.floor(16*Math.random())]}var o=e.toLowerCase()+"_"+n;return exports._MUICoreLayerIDCount++,o}function MUICoreLayerCreate(e){var t=document.createElement("DIV");return null!=e&&t.setAttribute("id",e),t}function MUICoreLayerAddSublayer(e,t){e.appendChild(t)}function MUICoreLayerRemoveSublayer(e,t){e.removeChild(t)}function MUICoreLayerCreateWithStyle(e,t){var n=MUICoreLayerCreate(t);return MUICoreLayerAddStyle(n,e),n}function MUICoreLayerAddStyle(e,t){e.classList.add(t)}function MUICoreLayerRemoveStyle(e,t){e.classList.remove(t)}function UIClassListForAnimationType(e){var t=[];switch(t.push("animated"),e){case UIAnimationType.BeginSheet:t.push("slideInDown");break;case UIAnimationType.EndSheet:t.push("slideOutUp");break;case UIAnimationType.Push:t.push("slideInRight");break;case UIAnimationType.Pop:t.push("slideOutRight");break;case UIAnimationType.FadeIn:t.push("fadeIn");break;case UIAnimationType.FadeOut:t.push("fadeOut");break;case UIAnimationType.LightSpeedOut:t.push("lightSpeedOut");break;case UIAnimationType.Hinge:t.push("hinge");break;case UIAnimationType.SlideInUp:t.push("slideInUp");break;case UIAnimationType.SlideOutDown:t.push("slideOutDown");break;case UIAnimationType.SlideInRight:t.push("slideInRight");break;case UIAnimationType.SlideOutRight:t.push("slideOutRight");break;case UIAnimationType.SlideInLeft:t.push("slideInLeft");break;case UIAnimationType.SlideOutLeft:t.push("slideOutLeft");break;case UIAnimationType.HorizontalOutFlip:t.push("flipOutY");break;case UIAnimationType.HorizontalInFlip:t.push("flipInY");break;case UIAnimationType.ZoomIn:t.push("zoomIn");break;case UIAnimationType.ZoomOut:t.push("zoomOut")}return t}function _UIAddAnimations(e,t){e.offsetWidth;for(var n=0;n<t.length;n++)e.classList.add(t[n])}function _UIRemoveAnimations(e,t){for(var n=0;n<t.length;n++)e.classList.remove(t[n])}function _UIAnimationStart(e,t,n,i,o){if(null!=t){var r=t.transitionDuration(n),a=t.animations(n);if(t.animateTransition(n),0==r||null==a)return t.animationEnded(!0),void(null!=i&&null!=o&&o.call(i));e.style.animationDuration=r+"s",_UIAddAnimations(e,a),e.animationParams={},e.animationParams.animationController=t,e.animationParams.animations=a,null!=i&&(e.animationParams.target=i),null!=o&&(e.animationParams.completion=o),e.addEventListener("animationend",_UIAnimationDidFinish)}else null!=i&&null!=o&&o.call(i)}function _UIAnimationDidFinish(e){var t=e.target.animationParams.animationController,n=e.target.animationParams.animations,i=e.target.animationParams.target,o=e.target.animationParams.completion,r=e.target;_UIRemoveAnimations(r,n),r.removeEventListener("animationend",_UIAnimationDidFinish),t.animationEnded(!0),null!=i&&null!=o&&o.call(i)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.UIOutletRegister=UIOutletRegister,exports.UIOutletQuery=UIOutletQuery,exports.UIOutlet=UIOutlet,exports.UIWindowSize=UIWindowSize,exports._MIUShowViewController=_MIUShowViewController,exports._UIAnimationDidStart=_UIAnimationDidStart,exports._UIHideViewController=_UIHideViewController,exports._UITransitionFromViewControllerToViewController=_UITransitionFromViewControllerToViewController,exports._MUICoreLayerIDCount=0,exports.MUICoreLayerIDFromObject=MUICoreLayerIDFromObject,exports.MUICoreLayerIDFromClassname=MUICoreLayerIDFromClassname,exports.MUICoreLayerCreate=MUICoreLayerCreate,exports.MUICoreLayerAddSublayer=MUICoreLayerAddSublayer,exports.MUICoreLayerRemoveSublayer=MUICoreLayerRemoveSublayer,exports.MUICoreLayerCreateWithStyle=MUICoreLayerCreateWithStyle,exports.MUICoreLayerAddStyle=MUICoreLayerAddStyle,exports.MUICoreLayerRemoveStyle=MUICoreLayerRemoveStyle,function(e){e[e.None=0]="None",e[e.BeginSheet=1]="BeginSheet",e[e.EndSheet=2]="EndSheet",e[e.Push=3]="Push",e[e.Pop=4]="Pop",e[e.FlipLeft=5]="FlipLeft",e[e.FlipRight=6]="FlipRight",e[e.FadeIn=7]="FadeIn",e[e.FadeOut=8]="FadeOut",e[e.LightSpeedIn=9]="LightSpeedIn",e[e.LightSpeedOut=10]="LightSpeedOut",e[e.Hinge=11]="Hinge",e[e.SlideInUp=12]="SlideInUp",e[e.SlideOutDown=13]="SlideOutDown",e[e.SlideInRight=14]="SlideInRight",e[e.SlideOutRight=15]="SlideOutRight",e[e.SlideInLeft=16]="SlideInLeft",e[e.SlideOutLeft=17]="SlideOutLeft",e[e.HorizontalOutFlip=18]="HorizontalOutFlip",e[e.HorizontalInFlip=19]="HorizontalInFlip",e[e.ZoomIn=20]="ZoomIn",e[e.ZoomOut=21]="ZoomOut"}(UIAnimationType=exports.UIAnimationType||(exports.UIAnimationType={})),exports.UIClassListForAnimationType=UIClassListForAnimationType,exports._UIAddAnimations=_UIAddAnimations,exports._UIRemoveAnimations=_UIRemoveAnimations,exports._UIAnimationStart=_UIAnimationStart,exports._UIAnimationDidFinish=_UIAnimationDidFinish,function(e){e[e.White=0]="White",e[e.WhiteLarge=1]="WhiteLarge",e[e.Gray=2]="Gray"}(UIActivityIndicatorViewStyle=exports.UIActivityIndicatorViewStyle||(exports.UIActivityIndicatorViewStyle={}));var UIActivityIndicatorView=function(i){function e(){var e=null!==i&&i.apply(this,arguments)||this;return e._hidesWhenStopped=!0,e.isAnimating=!1,e._activityIndicatorViewStyle=UIActivityIndicatorViewStyle.White,e}return __extends(e,i),e.prototype.initWithLayer=function(e,t,n){i.prototype.initWithLayer.call(this,e,t,n),this.setHidden(!0)},e.prototype.startAnimating=function(){this.setHidden(!1)},e.prototype.stopAnimating=function(){this.setHidden(!0)},Object.defineProperty(e.prototype,"hidesWhenStopped",{get:function(){return this._hidesWhenStopped},set:function(e){this._hidesWhenStopped=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"animating",{get:function(){return this.isAnimating},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"activityIndicatorViewStyle",{get:function(){return this._activityIndicatorViewStyle},set:function(e){},enumerable:!0,configurable:!0}),e}(UIView);function MIOEdgeInsetsMake(e,t,n,i){var o=new UIEdgeInsets;return o.initWithValues(e,t,n,i),o}exports.UIActivityIndicatorView=UIActivityIndicatorView,exports.MIOEdgeInsetsMake=MIOEdgeInsetsMake;var UIPopoverArrowDirection,UIEdgeInsets=function(o){function t(){var e=null!==o&&o.apply(this,arguments)||this;return e.top=0,e.left=0,e.bottom=0,e.right=0,e}return __extends(t,o),t.Zero=function(){var e=new t;return e.init(),e},t.prototype.initWithValues=function(e,t,n,i){o.prototype.init.call(this),this.top=e,this.left=t,this.bottom=n,this.right=i},t}(MIOObject);exports.UIEdgeInsets=UIEdgeInsets,function(e){e[e.Any=0]="Any",e[e.Up=1]="Up",e[e.Down=2]="Down",e[e.Left=3]="Left",e[e.Right=4]="Right"}(UIPopoverArrowDirection=exports.UIPopoverArrowDirection||(exports.UIPopoverArrowDirection={}));var UIPopoverPresentationController=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.permittedArrowDirections=UIPopoverArrowDirection.Any,e.sourceView=null,e.sourceRect=MIORect.Zero(),e.delegate=null,e._contentSize=null,e._canvasLayer=null,e._contentView=null,e}return __extends(e,t),Object.defineProperty(e.prototype,"transitioningDelegate",{get:function(){return null==this._transitioningDelegate&&(this._transitioningDelegate=new MIOModalPopOverTransitioningDelegate,this._transitioningDelegate.init()),this._transitioningDelegate},enumerable:!0,configurable:!0}),e.prototype.presentationTransitionWillBegin=function(){this._calculateFrame(),UICoreLayerAddStyle(this.presentedView.layer,"popover_window")},e.prototype.dismissalTransitionDidEnd=function(e){0!=e&&null!=this.delegate&&"function"==typeof this.delegate.popoverPresentationControllerDidDismissPopover&&this.delegate.popoverPresentationControllerDidDismissPopover(this)},e.prototype._calculateFrame=function(){var e=this.presentedViewController,t=this.presentedView,n=e.preferredContentSize.width,i=e.preferredContentSize.height,o=e.popoverPresentationController.sourceView,r=e.popoverPresentationController.sourceRect,a=!1,l=o.layer.getBoundingClientRect().top+r.size.height+10;l+i>window.innerHeight&&(l=o.layer.getBoundingClientRect().top-i-10),l<0&&(a=!0,l=(window.innerHeight-i)/2);var s=0;0==a?(s=o.layer.getBoundingClientRect().left+10)+n>window.innerWidth&&(s=o.layer.getBoundingClientRect().left+r.size.width-n+10):(s=o.layer.getBoundingClientRect().left+r.size.width+10)+n>window.innerWidth&&(s=o.layer.getBoundingClientRect().left-n-10),t.setFrame(MIORect.rectWithValues(0,0,n,i)),this.window.setFrame(MIORect.rectWithValues(s,l,n,i))},e.prototype._drawRoundRect=function(e,t,n,i,o){var r=this._canvasLayer.getContext("2d");r.beginPath(),r.moveTo(e+o,t),r.lineTo(e+n-o,t),r.quadraticCurveTo(e+n,t,e+n,t+o),r.lineTo(e+n,t+i-o),r.quadraticCurveTo(e+n,t+i,e+n-o,t+i),r.lineTo(e+o,t+i),r.quadraticCurveTo(e,t+i,e,t+i-o),r.lineTo(e,t+o),r.quadraticCurveTo(e,t,e+o,t),r.closePath();r.strokeStyle="rgba(208, 208, 219, 1)",r.lineWidth=1,r.stroke()},e}(UIPresentationController);exports.UIPopoverPresentationController=UIPopoverPresentationController;var MIOModalPopOverTransitioningDelegate=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.modalTransitionStyle=null,e._showAnimationController=null,e._dissmissAnimationController=null,e}return __extends(e,t),e.prototype.animationControllerForPresentedController=function(e,t,n){return null==this._showAnimationController&&(this._showAnimationController=new MIOPopOverPresentAnimationController,this._showAnimationController.init()),this._showAnimationController},e.prototype.animationControllerForDismissedController=function(e){return null==this._dissmissAnimationController&&(this._dissmissAnimationController=new MIOPopOverDismissAnimationController,this._dissmissAnimationController.init()),this._dissmissAnimationController},e}(MIOObject);exports.MIOModalPopOverTransitioningDelegate=MIOModalPopOverTransitioningDelegate;var MIOPopOverPresentAnimationController=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.transitionDuration=function(e){return.25},t.prototype.animateTransition=function(e){},t.prototype.animationEnded=function(e){},t.prototype.animations=function(e){return UIClassListForAnimationType(UIAnimationType.FadeIn)},t}(MIOObject);exports.MIOPopOverPresentAnimationController=MIOPopOverPresentAnimationController;var UIModalPresentationStyle,UIModalTransitionStyle,MIOPopOverDismissAnimationController=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.transitionDuration=function(e){return.25},t.prototype.animateTransition=function(e){},t.prototype.animationEnded=function(e){},t.prototype.animations=function(e){return UIClassListForAnimationType(UIAnimationType.FadeOut)},t}(MIOObject);exports.MIOPopOverDismissAnimationController=MIOPopOverDismissAnimationController,function(e){e[e.FullScreen=0]="FullScreen",e[e.PageSheet=1]="PageSheet",e[e.FormSheet=2]="FormSheet",e[e.CurrentContext=3]="CurrentContext",e[e.Custom=4]="Custom",e[e.OverFullScreen=5]="OverFullScreen",e[e.OverCurrentContext=6]="OverCurrentContext",e[e.Popover=7]="Popover",e[e.None=8]="None"}(UIModalPresentationStyle=exports.UIModalPresentationStyle||(exports.UIModalPresentationStyle={})),function(e){e[e.CoverVertical=0]="CoverVertical",e[e.FlipHorizontal=1]="FlipHorizontal",e[e.CrossDisolve=2]="CrossDisolve"}(UIModalTransitionStyle=exports.UIModalTransitionStyle||(exports.UIModalTransitionStyle={}));var UIPresentationController=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.presentationStyle=UIModalPresentationStyle.PageSheet,e.shouldPresentInFullscreen=!1,e._presentedViewController=null,e.presentingViewController=null,e.presentedView=null,e._transitioningDelegate=null,e._window=null,e._isPresented=!1,e}return __extends(e,n),e.prototype.initWithPresentedViewControllerAndPresentingViewController=function(e,t){n.prototype.init.call(this),this.presentedViewController=e,this.presentingViewController=t},e.prototype.setPresentedViewController=function(e){this._presentedViewController=e,this.presentedView=e.view},Object.defineProperty(e.prototype,"presentedViewController",{get:function(){return this._presentedViewController},set:function(e){this.setPresentedViewController(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"transitioningDelegate",{get:function(){return null==this._transitioningDelegate&&(this._transitioningDelegate=new MIOModalTransitioningDelegate,this._transitioningDelegate.init()),this._transitioningDelegate},enumerable:!0,configurable:!0}),e.prototype.presentationTransitionWillBegin=function(){var e=this.presentedViewController,t=this.presentedView;this._calculateFrame(),e.modalPresentationStyle!=UIModalPresentationStyle.PageSheet&&e.modalPresentationStyle!=UIModalPresentationStyle.FormSheet&&e.modalPresentationStyle!=UIModalPresentationStyle.FullScreen&&1!=MIOCoreIsPhone()||UICoreLayerAddStyle(t.layer,"modal_window")},e.prototype.presentationTransitionDidEnd=function(e){},e.prototype.dismissalTransitionWillBegin=function(){},e.prototype.dismissalTransitionDidEnd=function(e){},e.prototype._calculateFrame=function(){var e=this.presentingViewController,t=this.presentedViewController,n=this.presentedView;if(t.modalPresentationStyle==UIModalPresentationStyle.FullScreen)n.layer.style.left="0px",n.layer.style.top="0px",n.layer.style.width="100%",n.layer.style.height="100%";else if(t.modalPresentationStyle==UIModalPresentationStyle.CurrentContext){var i=e.view.getWidth(),o=e.view.getHeight();n.setFrame(MIORect.rectWithValues(0,0,i,o))}else if(t.modalPresentationStyle==UIModalPresentationStyle.PageSheet){var r=UIWindowSize();null==(s=t.preferredContentSize)&&(s=new MIOSize(320,200));i=s.width,o=s.height;var a=(r.width-i)/2;n.setFrame(MIORect.rectWithValues(0,0,i,o)),this.window.setFrame(MIORect.rectWithValues(a,0,i,o)),n.layer.classList.add("modal")}else if(t.modalPresentationStyle==UIModalPresentationStyle.FormSheet){r=UIWindowSize();null==(s=t.preferredContentSize)&&(s=new MIOSize(320,200));i=s.width,o=s.height,a=(r.width-i)/2;var l=(r.height-o)/2;n.setFrame(MIORect.rectWithValues(0,0,i,o)),this.window.setFrame(MIORect.rectWithValues(a,l,i,o)),n.layer.classList.add("modal")}else{var s;null==(s=t.preferredContentSize)&&(s=new MIOSize(320,200));i=s.width,o=s.height;n.setFrame(MIORect.rectWithValues(0,0,i,o))}},Object.defineProperty(e.prototype,"window",{get:function(){return this._window},set:function(e){var t=this.presentedViewController;this._window=e,0==MIOCoreIsMobile()&&t.modalPresentationStyle!=UIModalPresentationStyle.CurrentContext&&t.addObserver(this,"preferredContentSize")},enumerable:!0,configurable:!0}),e.prototype.observeValueForKeyPath=function(e,t,n){"preferredContentSize"==e&&"did"==t&&(this.presentedView.layer.style.transition="left 0.25s, width 0.25s, height 0.25s",this._calculateFrame())},e}(MIOObject);exports.UIPresentationController=UIPresentationController;var MIOModalTransitioningDelegate=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.modalTransitionStyle=null,e._presentAnimationController=null,e._dissmissAnimationController=null,e}return __extends(e,t),e.prototype.animationControllerForPresentedController=function(e,t,n){return null==this._presentAnimationController&&(this._presentAnimationController=new MIOModalPresentAnimationController,this._presentAnimationController.init()),this._presentAnimationController},e.prototype.animationControllerForDismissedController=function(e){return null==this._dissmissAnimationController&&(this._dissmissAnimationController=new MIOModalDismissAnimationController,this._dissmissAnimationController.init()),this._dissmissAnimationController},e}(MIOObject);exports.MIOModalTransitioningDelegate=MIOModalTransitioningDelegate;var MIOAnimationController=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.transitionDuration=function(e){return 0},t.prototype.animateTransition=function(e){},t.prototype.animationEnded=function(e){},t.prototype.animations=function(e){return null},t}(MIOObject);exports.MIOAnimationController=MIOAnimationController;var MIOModalPresentAnimationController=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.transitionDuration=function(e){return.15},t.prototype.animateTransition=function(e){},t.prototype.animationEnded=function(e){},t.prototype.animations=function(e){var t=null,n=e.presentedViewController;return n.modalPresentationStyle!=UIModalPresentationStyle.PageSheet&&n.modalPresentationStyle!=UIModalPresentationStyle.FormSheet&&n.modalPresentationStyle!=UIModalPresentationStyle.FullScreen||(t=1==MIOCoreIsPhone()?UIClassListForAnimationType(UIAnimationType.SlideInUp):UIClassListForAnimationType(UIAnimationType.BeginSheet)),t},t}(MIOObject);exports.MIOModalPresentAnimationController=MIOModalPresentAnimationController;var MIOModalDismissAnimationController=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.transitionDuration=function(e){return.25},t.prototype.animateTransition=function(e){},t.prototype.animationEnded=function(e){},t.prototype.animations=function(e){var t=null,n=e.presentingViewController;return n.modalPresentationStyle!=UIModalPresentationStyle.PageSheet&&n.modalPresentationStyle!=UIModalPresentationStyle.FormSheet&&n.modalPresentationStyle!=UIModalPresentationStyle.FullScreen||(t=1==MIOCoreIsPhone()?UIClassListForAnimationType(UIAnimationType.SlideOutDown):UIClassListForAnimationType(UIAnimationType.EndSheet)),t},t}(MIOObject);exports.MIOModalDismissAnimationController=MIOModalDismissAnimationController;var UIGestureRecognizerState,UIEvent=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.x=0,e.y=0,e}return __extends(n,t),n.eventWithSysEvent=function(e){var t=new n;return t.initWithSysEvent(e),t},n.prototype.initWithSysEvent=function(e){t.prototype.init.call(this),this.x=e.clientX,this.y=e.clientY},n}(NSObject);exports.UIEvent=UIEvent,function(e){e[e.Possible=0]="Possible",e[e.Began=1]="Began",e[e.Changed=2]="Changed",e[e.Ended=3]="Ended",e[e.Cancelled=4]="Cancelled",e[e.Failed=5]="Failed",e[e.Recognized=6]="Recognized"}(UIGestureRecognizerState=exports.UIGestureRecognizerState||(exports.UIGestureRecognizerState={}));var UIGestureRecognizer=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.delegate=null,e.isEnabled=!0,e.name=null,e.target=null,e.block=null,e._view=null,e._state=UIGestureRecognizerState.Possible,e}return __extends(e,n),Object.defineProperty(e.prototype,"view",{get:function(){return this._view},set:function(e){this.setView(e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._state},set:function(e){this.setState(e)},enumerable:!0,configurable:!0}),e.prototype.initWithTarget=function(e,t){n.prototype.init.call(this),this.target=e,this.block=t},e.prototype.setView=function(e){this._view=e},e.prototype.setState=function(e){0!=this.isEnabled&&(this._state==e&&e!=UIGestureRecognizerState.Changed||(this._state=e,this.block.call(this.target,this)))},e.prototype.touchesBeganWithEvent=function(e,t){this.state=UIGestureRecognizerState.Began},e.prototype.touchesMovedWithEvent=function(e,t){this.state=UIGestureRecognizerState.Changed},e.prototype.touchesEndedWithEvent=function(e,t){this.state=UIGestureRecognizerState.Ended},e.prototype.reset=function(){this.state=UIGestureRecognizerState.Possible},e.prototype._viewTouchesBeganWithEvent=function(e,t){this.reset(),this.touchesBeganWithEvent(e,t)},e.prototype._viewTouchesMovedWithEvent=function(e,t){this.touchesMovedWithEvent(e,t)},e.prototype._viewTouchesEndedWithEvent=function(e,t){this.touchesEndedWithEvent(e,t)},e}(MIOObject),UITapGestureRecognizer=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.numberOfTapsRequired=1,e}return __extends(e,n),e.prototype.touchesBeganWithEvent=function(e,t){n.prototype.touchesBeganWithEvent.call(this,e,t),this.state=UIGestureRecognizerState.Began},e.prototype.touchesEndedWithEvent=function(e,t){n.prototype.touchesEndedWithEvent.call(this,e,t),this.state=UIGestureRecognizerState.Ended},e}(exports.UIGestureRecognizer=UIGestureRecognizer);exports.UITapGestureRecognizer=UITapGestureRecognizer;var MIOFileHandlingPanel,UIPanGestureRecognizer=function(n){function e(){var e=null!==n&&n.apply(this,arguments)||this;return e.minimumNumberOfTouches=1,e.maximumNumberOfTouches=0,e.initialX=null,e.initialY=null,e.touchDown=!1,e.hasStarted=!1,e.deltaX=0,e.deltaY=0,e}return __extends(e,n),e.prototype.touchesBeganWithEvent=function(e,t){this.initialX=t.x,this.initialY=t.y,this.touchDown=!0},e.prototype.touchesEndedWithEvent=function(e,t){n.prototype.touchesEndedWithEvent.call(this,e,t),this.initialX=null,this.initialY=null,this.hasStarted=!1,this.touchDown=!1},e.prototype.touchesMovedWithEvent=function(e,t){0!=this.touchDown&&(0==this.hasStarted&&(this.state=UIGestureRecognizerState.Began),this.hasStarted=!0,this.deltaX=this.initialX-t.x,this.deltaY=this.initialY-t.y,this.state=UIGestureRecognizerState.Changed)},e.prototype.translationInView=function(e){return new MIOPoint(this.deltaX,this.deltaY)},e}(UIGestureRecognizer);exports.UIPanGestureRecognizer=UIPanGestureRecognizer,function(e){e[e.OKButton=0]="OKButton"}(MIOFileHandlingPanel=exports.MIOFileHandlingPanel||(exports.MIOFileHandlingPanel={}));var UIOpenPanel=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.files=[],e.panelTarget=null,e.panelCompletion=null,e._inputLayer=null,e}return __extends(n,t),n.openPanel=function(){var e=new n;return e.init(),e},n.prototype.beginSheetModalForWindow=function(e,t,n){this.panelTarget=t,this.panelCompletion=n;var i=this;this._inputLayer=document.createElement("INPUT"),this._inputLayer.setAttribute("type","file"),this._inputLayer.style.display="none",this._inputLayer.addEventListener("change",function(e){var t=e.target.files;i.filesDidSelect(t)},!1),UICoreLayerAddSublayer(e.layer,this._inputLayer),this._inputLayer.click()},n.prototype.filesDidSelect=function(e){this.files=e,null!=this.panelTarget&&null!=this.panelCompletion&&this.panelCompletion.call(this.panelTarget,MIOFileHandlingPanel.OKButton)},n}(UIWindow);exports.UIOpenPanel=UIOpenPanel;