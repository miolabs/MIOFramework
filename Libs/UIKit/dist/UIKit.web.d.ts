import { NSObject } from "mio-foundation-web";
import { NSPoint } from "mio-foundation-web";
import { NSRect } from "mio-foundation-web";
import "mio-foundation-web/extensions";
import { NSSize } from "mio-foundation-web";
import { NSCoder } from "mio-foundation-web";
export declare var _MUICoreLayerIDCount: number;
export declare function MUICoreLayerIDFromObject(object: any): string;
export declare function MUICoreLayerIDFromClassname(classname: string): string;
export declare function MUICoreLayerCreate(layerID?: any): HTMLElement;
export declare function MUICoreLayerAddSublayer(layer: any, subLayer: any): void;
export declare function MUICoreLayerRemoveSublayer(layer: any, subLayer: any): void;
export declare function MUICoreLayerCreateWithStyle(style: any, layerID?: any): HTMLElement;
export declare function MUICoreLayerAddStyle(layer: any, style: any): void;
export declare function MUICoreLayerRemoveStyle(layer: any, style: any): void;
export declare function MUICoreLayerSearchElementByAttribute(layer: any, key: any): any;
export declare function MUICoreLayerSearchElementByID(layer: any, elementID: any): any;
export declare function MUICoreLayerGetFirstElementWithTag(layer: any, tag: any): any;
export declare enum MUIAnimationType {
    None = 0,
    BeginSheet = 1,
    EndSheet = 2,
    Push = 3,
    Pop = 4,
    FlipLeft = 5,
    FlipRight = 6,
    FadeIn = 7,
    FadeOut = 8,
    LightSpeedIn = 9,
    LightSpeedOut = 10,
    Hinge = 11,
    SlideInUp = 12,
    SlideOutDown = 13,
    SlideInRight = 14,
    SlideOutRight = 15,
    SlideInLeft = 16,
    SlideOutLeft = 17,
    HorizontalOutFlip = 18,
    HorizontalInFlip = 19,
    ZoomIn = 20,
    ZoomOut = 21
}
export interface UIViewControllerAnimatedTransitioning extends NSObject {
    animationControllerForPresentedController(): any;
}
export interface UIViewControllerAnimatedTransitioning extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare function MUIClassListForAnimationType(type: any): any[];
export declare function _MUIAddAnimations(layer: any, animations: any): void;
export declare function _MUIRemoveAnimations(layer: any, animations: any): void;
export declare function _MUIAnimationStart(layer: any, animationController: any, animationContext: any, target?: any, completion?: any): void;
export declare function _UIAnimationDidFinish(event: any): void;
export declare function MUICoreEventRegisterObserverForType(eventType: MUICoreEventType, observer: any, completion: any): void;
export declare function MUICoreEventUnregisterObserverForType(eventType: MUICoreEventType, observer: any): void;
export declare function MUICoreBundleLoadNibName(name: string, target: any, completion: any): void;
export declare enum MUICoreEventKeyCode {
    Enter = 13,
    Escape = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40
}
export declare enum MUICoreEventType {
    KeyUp = 0,
    KeyDown = 1,
    MouseUp = 2,
    MouseDown = 3,
    TouchStart = 4,
    TouchEnd = 5,
    Click = 6,
    Resize = 7
}
export declare class MUICoreEvent {
    coreEvent: Event;
    eventType: any;
    target: any;
    completion: any;
    initWithType(eventType: MUICoreEventType, coreEvent: Event): void;
    cancel(): void;
}
export declare class MUICoreKeyEvent extends MUICoreEvent {
    keyCode: any;
    initWithKeyCode(eventType: MUICoreEventType, eventKeyCode: MUICoreEventKeyCode, event: Event): void;
}
export declare class MUICoreEventInput extends MUICoreEvent {
    target: any;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
}
export declare enum MUICoreEventMouseButtonType {
    None = 0,
    Left = 1,
    Right = 2,
    Middle = 3
}
export declare class MUICoreEventMouse extends MUICoreEventInput {
    button: MUICoreEventMouseButtonType;
    initWithType(eventType: MUICoreEventType, coreEvent: MouseEvent): void;
}
export declare class MUICoreEventTouch extends MUICoreEventInput {
    initWithType(eventType: MUICoreEventType, coreEvent: TouchEvent): void;
}
export declare class UIEvent extends NSObject {
    static eventWithSysEvent(sysEvent: any): UIEvent;
    x: number;
    y: number;
    initWithSysEvent(e: any): void;
}
export declare enum UIGestureRecognizerState {
    Possible = 0,
    Began = 1,
    Changed = 2,
    Ended = 3,
    Cancelled = 4,
    Failed = 5,
    Recognized = 6
}
export declare class UIGestureRecognizer extends NSObject {
    delegate: any;
    view: UIView;
    state: UIGestureRecognizerState;
    isEnabled: boolean;
    name: string;
    private target;
    private block;
    initWithTarget(target: any, block: any): void;
    private _view;
    setView(view: UIView): void;
    private _state;
    private setState;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesMovedWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
    reset(): void;
    _viewTouchesBeganWithEvent(touches: any, ev: UIEvent): void;
    _viewTouchesMovedWithEvent(touches: any, ev: UIEvent): void;
    _viewTouchesEndedWithEvent(touches: any, ev: UIEvent): void;
}
export declare class UITapGestureRecognizer extends UIGestureRecognizer {
    numberOfTapsRequired: number;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
}
export declare class UIPanGestureRecognizer extends UIGestureRecognizer {
    minimumNumberOfTouches: number;
    maximumNumberOfTouches: number;
    private initialX;
    private initialY;
    private touchDown;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
    private hasStarted;
    touchesMovedWithEvent(touches: any, ev: UIEvent): void;
    private deltaX;
    private deltaY;
    translationInView(view: UIView): NSPoint;
}
export declare class UIView extends NSObject {
    layerID: any;
    layer: any;
    layerOptions: any;
    alpha: number;
    tag: number;
    private _parent;
    parent: UIView;
    protected _viewIsVisible: boolean;
    protected _needDisplay: boolean;
    _isLayerInDOM: boolean;
    protected _subviews: any[];
    readonly subviews: any[];
    _window: UIWindow;
    _outlets: {};
    constructor(layerID?: any);
    init(): void;
    initWithFrame(frame: NSRect): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    copy(): any;
    awakeFromHTML(): void;
    setParent(view: UIView): void;
    addSubLayer(layer: any): void;
    _linkViewToSubview(view: any): void;
    addSubview(view: any, index?: any): void;
    insertSubviewAboveSubview(view: UIView, siblingSubview: UIView): void;
    private addLayerBeforeLayer;
    protected _addLayerToDOM(index?: any): void;
    removeFromSuperview(): void;
    protected _removeLayerFromDOM(): void;
    private _removeAllSubviews;
    setViewIsVisible(value: boolean): void;
    viewWithTag(tag: any): UIView;
    layoutSubviews(): void;
    setNeedsDisplay(): void;
    layerWithItemID(itemID: any): any;
    private _hidden;
    setHidden(hidden: boolean): void;
    hidden: boolean;
    setBackgroundColor(color: any): void;
    setBackgroundRGBColor(r: any, g: any, b: any, a?: any): void;
    getBackgroundColor(): string;
    setAlpha(alpha: any): void;
    private x;
    setX(x: any): void;
    getX(): number;
    private y;
    setY(y: any): void;
    getY(): number;
    private width;
    setWidth(w: any): void;
    getWidth(): number;
    private height;
    setHeight(height: any): void;
    getHeight(): number;
    setFrameComponents(x: any, y: any, w: any, h: any): void;
    setFrame(frame: any): void;
    readonly frame: NSRect;
    readonly bounds: NSRect;
    protected _getValueFromCSSProperty(property: any): string;
    protected _getIntValueFromCSSProperty(property: any): number;
    private _userInteraction;
    userInteraction: any;
    private isMouseDown;
    private mouseDownEvent;
    private mouseUpEvent;
    private mouseMoveEvent;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesMovedWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
    private gestureRecognizers;
    addGestureRecognizer(gesture: UIGestureRecognizer): void;
    removeGestureRecognizer(gesture: UIGestureRecognizer): void;
    private static animationsChanges;
    private static animationsViews;
    private static animationTarget;
    private static animationCompletion;
    static animateWithDuration(duration: number, target: any, animations: any, completion?: any): void;
    private static addTrackingAnimationView;
    private static removeTrackingAnimationView;
    private static animationDidFinish;
}
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UILabel extends UIView {
    private _textLayer;
    autoAdjustFontSize: string;
    autoAdjustFontSizeValue: number;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    setText(text: any): void;
    text: any;
    setTextAlignment(alignment: any): void;
    setHightlighted(value: any): void;
    setTextRGBColor(r: any, g: any, b: any): void;
    setFontSize(size: any): void;
    setFontStyle(style: any): void;
    setFontFamily(fontFamily: any): void;
}
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UIControl extends UIView {
    mouseOverTarget: any;
    mouseOverAction: any;
    mouseOutTarget: any;
    mouseOutAction: any;
    private _enabled;
    enabled: boolean;
    setEnabled(enabled: boolean): void;
    setOnMouseOverAction(target: any, action: any): void;
    setOnMouseOutAction(target: any, action: any): void;
}
/**
 * Created by godshadow on 12/3/16.
 */
export declare enum UIButtonType {
    MomentaryPushIn = 0,
    PushOnPushOff = 1,
    PushIn = 2
}
export declare class UIButton extends UIControl {
    private _statusStyle;
    private _titleStatusStyle;
    private _titleLayer;
    private _imageStatusStyle;
    private _imageLayer;
    target: any;
    action: any;
    private _selected;
    type: UIButtonType;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    initWithAction(target: any, action: any): void;
    setAction(target: any, action: any): void;
    setTitle(title: any): void;
    title: any;
    selected: any;
    setSelected(value: any): void;
    setImageURL(urlString: string): void;
}
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UIViewController extends NSObject {
    layerID: string;
    view: UIView;
    private _htmlResourcePath;
    private _onViewLoadedTarget;
    private _onViewLoadedAction;
    private _onLoadLayerTarget;
    private _onLoadLayerAction;
    private _viewIsLoaded;
    private _layerIsReady;
    private _childViewControllers;
    parentViewController: UIViewController;
    presentingViewController: UIViewController;
    presentedViewController: UIView;
    navigationController: UINavigationController;
    navigationItem: UINavigationItem;
    splitViewController: UISplitViewController;
    tabBarController: any;
    modalPresentationStyle: UIModalPresentationStyle;
    modalTransitionStyle: UIModalTransitionStyle;
    transitioningDelegate: any;
    protected _contentSize: NSSize;
    protected _preferredContentSize: any;
    _outlets: {};
    constructor(layerID?: any);
    init(): void;
    initWithCoder(coder: NSCoder): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    initWithResource(path: any): void;
    localizeSubLayers(layers: any): void;
    localizeLayerIDWithKey(layerID: any, key: any): void;
    loadView(): void;
    _didLoadNibWithLayer(layerData: any): void;
    _didLoadView(): void;
    protected _loadChildControllers(): void;
    protected _loadChildViewController(index: any, max: any): void;
    protected _setViewLoaded(value: any): void;
    onLoadView(target: any, action: any): void;
    onLoadLayer(target: any, action: any): void;
    readonly viewIsLoaded: boolean;
    readonly childViewControllers: any[];
    addChildViewController(vc: any): void;
    removeChildViewController(vc: any): void;
    private _presentationController;
    readonly isPresented: boolean;
    readonly presentationController: UIPresentationController;
    private _popoverPresentationController;
    readonly popoverPresentationController: UIPopoverPresentationController;
    showViewController(vc: any, animated: any): void;
    presentViewController(vc: UIViewController, animated: boolean): void;
    dismissViewController(animate: any): void;
    transitionFromViewControllerToViewController(fromVC: any, toVC: any, duration: any, animationType: any, target?: any, completion?: any): void;
    viewDidLoad(): void;
    viewWillAppear(animated?: any): void;
    viewDidAppear(animated?: any): void;
    viewWillDisappear(animated?: any): void;
    viewDidDisappear(animated?: any): void;
    contentHeight(): number;
    setContentSize(size: any): void;
    contentSize: any;
    preferredContentSize: any;
    setPreferredContentSize(size: any): void;
}
/**
 * Created by godshadow on 06/12/2016.
 */
export declare enum UIModalPresentationStyle {
    FullScreen = 0,
    PageSheet = 1,
    FormSheet = 2,
    CurrentContext = 3,
    Custom = 4,
    OverFullScreen = 5,
    OverCurrentContext = 6,
    Popover = 7,
    None = 8
}
export declare enum UIModalTransitionStyle {
    CoverVertical = 0,
    FlipHorizontal = 1,
    CrossDisolve = 2
}
export declare class UIPresentationController extends NSObject {
    presentationStyle: UIModalPresentationStyle;
    shouldPresentInFullscreen: boolean;
    protected _presentedViewController: UIViewController;
    presentingViewController: any;
    presentedView: any;
    protected _transitioningDelegate: any;
    private _window;
    _isPresented: boolean;
    initWithPresentedViewControllerAndPresentingViewController(presentedViewController: any, presentingViewController: any): void;
    setPresentedViewController(vc: UIViewController): void;
    presentedViewController: UIViewController;
    readonly transitioningDelegate: any;
    presentationTransitionWillBegin(): void;
    presentationTransitionDidEnd(completed: any): void;
    dismissalTransitionWillBegin(): void;
    dismissalTransitionDidEnd(completed: any): void;
    _calculateFrame(): void;
    window: UIWindow;
    observeValueForKeyPath(key: any, type: any, object: any): void;
}
export declare class MUIModalTransitioningDelegate extends NSObject {
    modalTransitionStyle: any;
    private _presentAnimationController;
    private _dissmissAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MUIAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class UIModalPresentAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class UIModalDismissAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
/**
 * Created by godshadow on 11/11/2016.
 */
export declare enum UIPopoverArrowDirection {
    Any = 0,
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}
export interface UIPopoverPresentationControllerDelegate {
    popoverPresentationControllerDidDismissPopover?(popoverPresentationController: UIPopoverPresentationController): any;
}
export declare class UIPopoverPresentationController extends UIPresentationController {
    permittedArrowDirections: UIPopoverArrowDirection;
    sourceView: any;
    sourceRect: NSRect;
    delegate: any;
    private _contentSize;
    private _canvasLayer;
    private _contentView;
    readonly transitioningDelegate: any;
    presentationTransitionWillBegin(): void;
    dismissalTransitionDidEnd(completed: any): void;
    _calculateFrame(): void;
    private _drawRoundRect;
}
export declare class MIOModalPopOverTransitioningDelegate extends NSObject {
    modalTransitionStyle: any;
    private _showAnimationController;
    private _dissmissAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MIOPopOverPresentAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any[];
}
export declare class MIOPopOverDismissAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any[];
}
export declare class UINavigationItem extends NSObject {
    backBarButtonItem: UIButton;
    titleView: UIView;
    title: string;
    private leftView;
    private rightView;
    initWithLayer(layer: any): void;
}
export declare function UINavItemSearchInLayer(layer: any): UINavigationItem;
/**
 * Created by godshadow on 9/4/16.
 */
export declare class UINavigationController extends UIViewController {
    rootViewController: any;
    viewControllersStack: any[];
    currentViewControllerIndex: number;
    init(): void;
    initWithRootViewController(vc: UIViewController): void;
    setRootViewController(vc: UIViewController): void;
    viewWillAppear(animated?: boolean): void;
    viewDidAppear(animated?: any): void;
    viewWillDisappear(animated?: any): void;
    viewDidDisappear(animated?: any): void;
    pushViewController(vc: UIViewController, animated?: boolean): void;
    popViewController(animated?: boolean): void;
    popToRootViewController(animated?: boolean): void;
    preferredContentSize: any;
    private _pushAnimationController;
    private _popAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MUIPushAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any[];
}
export declare class MUIPopAnimationController extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any[];
}
/**
 * Created by godshadow on 05/08/16.
 */
export declare enum UISplitViewControllerDisplayMode {
    Automatic = 0,
    PrimaryHidden = 1,
    AllVisible = 2,
    PrimaryOverlay = 3
}
export declare class UISplitViewController extends UIViewController {
    private masterView;
    private detailView;
    preferredDisplayMode: UISplitViewControllerDisplayMode;
    init(): void;
    readonly displayMode: UISplitViewControllerDisplayMode;
    private _displayModeButtonItem;
    readonly displayModeButtonItem: UIButton;
    private _collapsed;
    readonly collapsed: boolean;
    private setCollapsed;
    private _masterViewController;
    setMasterViewController(vc: any): void;
    private _detailViewController;
    setDetailViewController(vc: any): void;
    showDetailViewController(vc: UIViewController): void;
    readonly masterViewController: UIViewController;
    readonly detailViewController: UIViewController;
    private _showDetailViewController;
    private _pushDetailViewController;
    private _popViewController;
    private displayModeButtonItemAction;
    private _pushAnimationController;
    private _popAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: UIViewController): any;
}
export declare function MUIOutletRegister(owner: any, layerID: any, c: any): void;
export declare function MUIOutletQuery(owner: any, layerID: any): any;
export declare function MUIOutlet(owner: any, elementID: any, className?: any, options?: any): any;
export declare function MUIWindowSize(): NSSize;
export declare function _MUIShowViewController(fromVC: UIViewController, toVC: UIViewController, sourceVC: any, animated: boolean, target?: any, completion?: any): void;
export declare function _MUIAnimationDidStart(fromVC: UIViewController, toVC: UIViewController, pc: UIPresentationController, target?: any, completion?: any): void;
export declare function _MUIHideViewController(fromVC: UIViewController, toVC: UIViewController, sourceVC: any, target?: any, completion?: any): void;
export declare function _MUITransitionFromViewControllerToViewController(fromVC: any, toVC: any, sourceVC: any, target?: any, completion?: any): void;
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UIWindow extends UIView {
    rootViewController: UIViewController;
    private _resizeWindow;
    init(): void;
    initWithRootViewController(vc: any): void;
    makeKey(): void;
    makeKeyAndVisible(): void;
    layoutSubviews(): void;
    addSubview(view: UIView): void;
    protected _addLayerToDOM(): void;
    removeFromSuperview(): void;
    protected _removeLayerFromDOM(): void;
    setHidden(hidden: any): void;
    _eventHappendOutsideWindow(): void;
    _becameKeyWindow(): void;
    _resignKeyWindow(): void;
    private _dismissRootViewController;
}
export declare class UIResponder extends NSObject {
}
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
