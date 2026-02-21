/**
 * Created by godshadow on 11/3/16.
 */

import { NSCoder } from "foundation";
import { MIOCoreClassByName } from "mio-core";
import { UICoreNibCoder, UICoreNibCopy } from "./core/UICoreNibParser";
import { CALayer, CALayerEvent } from "./CoreAnimation/CALayer";
import { CGRect } from "./CoreGraphics/CGRect";
import { UIColor } from "./UIColor";
import { UIEvent } from "./UIEvent";
import { UIGestureRecognizer } from "./UIGestureRecognizer";
import { UIResponder } from "./UIResponder";
import { UIWindow } from "./UIWindow";


export class UIView extends UIResponder
{
    layer:CALayer;
    layerID = null;    
    layerOptions = null;
    alpha = 1;
    tag: number = 0;
    owner = null;

    private _superview: UIView = null;
    set superview(view) { this.setSuperview(view); }
    get superview(): UIView { return this._superview; }


    protected _viewIsVisible = false;
    protected _needDisplay = true;

    protected _subviews = [];
    get subviews() {
        return this._subviews;
    }

    _window: UIWindow = null;

    _outlets = {};
    _segues = [];

    _checkSegues() {
    }

    protected _performSegue(){
        if (this._segues.length == 0) return;

        let item = this._segues[0];                        
        // _UIStoryboardSeguePerform(item["Kind"], this, item["Identifier"], this.owner, item["Destination"]);        
    }

    // constructor(layerID?) {
    //     super();
    //     this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(this);
    // }

    static get layerClass() : any { return CALayer }

    init() {
        let c = MIOCoreClassByName( this.className );
        this.layer = c ? new c.layerClass( ) : new UIView.layerClass();

        //if (this.layer == null) this.layer = new UIView.layerClass();
        // this.layer = MUICoreLayerCreate(this.layerID);        
        //UICoreLayerAddStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "view");
        //this.layer.style.position = "absolute";
        // this.layer.style.top = "0px";
        // this.layer.style.left = "0px";
        //this.layer.style.width = "100%";
        //this.layer.style.height = "100%";
        //this.layer.style.background = "rgb(255, 255, 255)";                
    }

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );        
        if ( coder instanceof UICoreNibCoder ) {
            let c = MIOCoreClassByName( this.className );
            this.layer = new c.layerClass( coder.layerContents, coder.scripts );
            this._subviews = coder.decodeSubviews();
            // Custom properties
            this.tag = coder.decodeIntegerForKey( "tag" );
            this._assign_outlets( coder );
        }

        this.awakeFromNib();
    }

    private _assign_outlets( coder: UICoreNibCoder ){
        for (let key in this._outlets) {
            let obj = coder.outlets[ key ];
            let prop = this._outlets[ key ];
            this[ prop ] = obj;
        }
    }


    initWithFrame(frame: CGRect) {
        this.layer = new CALayer( this.layerID );
        // this.layer = MUICoreLayerCreate(this.layerID);
        // this.layer.style.position = "absolute";
        this.setX(frame.origin.x);
        this.setY(frame.origin.y);
        this.setWidth(frame.size.width);
        this.setHeight(frame.size.height);
    }

    awakeFromNib() { }

    setSuperview(view: UIView) {
        this.willChangeValue("parent");
        this._superview = view;
        this.didChangeValue("parent");
    }

    _linkViewToSubview( view:UIView ) {
        if ((view instanceof UIView) == false) throw new Error("_linkViewToSubview: Trying to add an object that is not a view");

        this.subviews.push(view);
    }

    addSubview( view:UIView, index?:number ) {
        if ((view instanceof UIView) == false) throw new Error("addSubview: Trying to add an object that is not a view");

        view.setSuperview(this);

        if (index == null)
            this.subviews.push(view);
        else
            this.subviews.splice(index, 0, view);

        this.layer.addSublayer( view.layer );
        view.setNeedsDisplay();
    }

    insertSubviewAboveSubview(view: UIView, siblingSubview: UIView) {
        view.setSuperview(this);
        let index = this.subviews.indexOf(siblingSubview);
        this.subviews.splice(index, 0, view);
        this.addLayerBeforeLayer(view.layer, siblingSubview.layer);
        view.setNeedsDisplay();
    }

    private addLayerBeforeLayer(newLayer, layer) {
        // if (newLayer._isLayerInDOM == true) return;
        // if (layer == null || newLayer == null) return;
        // this.layer.insertBefore(newLayer, layer);
        // newLayer._isLayerInDOM = true;
    }

    removeFromSuperview() {
        if (this.superview == null) return;

        this.layer.removeFromSuperlayer();
        this.superview.subviews.removeObject( this );
    }

    // private _removeAllSubviews() {

    //     var node = this.layer;

    //     while (this.layer.hasChildNodes()) {              // selected elem has children

    //         if (node.hasChildNodes()) {                // current node has children
    //             node = node.lastChild;                 // set current node to child
    //         }
    //         else {                                     // last child found
    //             node = node.parentNode;                // set node to parent
    //             node.removeChild(node.lastChild);      // remove last node
    //         }
    //     }
    // }

    setViewIsVisible( value: boolean )
    {
        this._viewIsVisible = true;
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            v.setViewIsVisible(value);
        }
    }

    viewWithTag( tag:number ) : UIView | null 
    {
        // TODO: Use also the view tag component
        // let view = MUICoreViewSearchViewTag(this, tag);
        return null;
    }

    layoutSubviews() {
        for (let index = 0; index < this.subviews.length; index++) {
            let v = this.subviews[index];
            if ((v instanceof UIView) == false) throw new Error("layout: Trying to layout an object that is not a view");
            v.setNeedsDisplay();
        }
    }

    setNeedsDisplay() {
        this._needDisplay = true;

        if (this._viewIsVisible == false) return;
        if (this.hidden == true) return;

        this._needDisplay = false;
        this.layoutSubviews();

        for (var index = 0; index < this.subviews.length; index++) {
            let v = this.subviews[index];
            if (!(v instanceof UIView)) {
                console.log("ERROR: trying to call setNeedsDisplay: in object that it's not a view");
            }
            else
                v.setNeedsDisplay();
        }
    }

    // layerWithItemID(itemID) {
    //     return MUICoreLayerSearchElementByID(this.layer, itemID);
    // }

    copy() {        
        return UICoreNibCopy( this.layer.contents );
    }

    private _hidden: boolean = false;
    setHidden(hidden: boolean) {
        this._hidden = hidden;

        this.layer.isHidden = hidden;
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this.setHidden(value);
    }

    set backgroundColor( color: UIColor ) { this.setBackgroundColor ( color ); }    

    setBackgroundColor( color: UIColor ) {
        // this.layer.style.backgroundColor = "#" + color;
    }

    // getBackgroundColor() {
    //     var cs = document.defaultView.getComputedStyle(this.layer, null);
    //     var bg = cs.getPropertyValue('background-color');

    //     return bg;
    // }

    setAlpha(alpha) {
        // this.willChangeValue("alpha");
        // this.alpha = alpha;
        // this.didChangeValue("alpha");

        // if (UIView.animationsChanges != null) {
        //     let animation = { "View": this, "Key": "opacity", "EndValue": alpha };
        //     UIView.animationsChanges.addObject(animation);
        // }
        // else {
        //     this.layer.style.opacity = alpha;
        // }
    }

    private x = 0;
    setX(x) {
        this.willChangeValue("frame");
        this.x = x;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "x", "EndValue": x + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            // this.layer.style.left = x + "px";
        }
    }

    getX() {
        // let x = this._getIntValueFromCSSProperty("left");
        // return x;
        return 0;
    }

    private y = 0;
    setY(y) {
        this.willChangeValue("frame");
        this.y = y;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "y", "EndValue": y + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            // this.layer.style.top = y + "px";
        }
    }

    getY() {
        // let y = this._getIntValueFromCSSProperty("top");
        // return y;
        return 0;
    }

    private width = 0;
    setWidth(w) {
        this.willChangeValue("frame");
        this.width = w;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "width", "EndValue": w + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            // this.layer.style.width = w + "px";
        }
    }

    getWidth() {
        // let w1 = this.layer.clientWidth;
        // let w2 = this._getIntValueFromCSSProperty("width");
        // let w = Math.max(w1, w2);
        // if (isNaN(w)) w = 0;
        // return w;
        return 0;
    }

    private height = 0;
    setHeight(height) {
        this.willChangeValue("height");
        this.height = height;
        this.didChangeValue("height");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "height", "EndValue": height + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            // this.layer.style.height = height + "px";
        }
    }

    getHeight() {
        // let h = this.height;
        // if (h == 0) h = this.layer.clientHeight;
        // else {
        //     if (h == 0) h = this.layer.height;
        //     else if (h == 0) h = this._getIntValueFromCSSProperty("height");
        // }
        // return h;
        return 0;
    }

    setFrameComponents(x, y, w, h) {
        this.setX(x);
        this.setY(y);
        this.setWidth(w);
        this.setHeight(h);
    }

    setFrame(frame:CGRect) {
        this.willChangeValue("frame");
        this.setFrameComponents(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
        this.didChangeValue("frame");
    }

    get frame():CGRect {
        return CGRect.rectFromValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    set frame(frame:CGRect){
        this.setFrame(frame);
    }

    public get bounds() {
        return CGRect.rectFromValues(0, 0, this.getWidth(), this.getHeight());
    }

    //
    // Event handling and user interaction
    //

    protected _userInteraction = false;
    get userInteraction(): boolean { return this._userInteraction; }
    set userInteraction( value:boolean ) {
        if (value == this._userInteraction) return;

        if (value == true) {
            this.layer.registerEventAction( this, this.on_event );
        }
        else {
            this.layer.unregisterEventAction( this, this.on_event );
        }
    }

    protected on_event( event:CALayerEvent ) {
        
        switch ( event ){
            case CALayerEvent.mouseDown: this.on_mouse_down_event( event ); break;
            case CALayerEvent.mouseUp: this.on_mouse_up_event( event ); break;
        }
    }
    
    private on_mouse_down_event( event:any ) {
        let e = new UIEvent(); //.eventWithSysEvent( event );
        this.touchesBeganWithEvent(null, e );
        // this.isMouseDown = true;
        // window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        // ev.preventDefault(); // Prevent selection
    }

    private on_mouse_up_event( event:any ) {
        // this.isMouseDown = false;
        let e = new UIEvent(); //.eventWithSysEvent(ev);
        this.touchesEndedWithEvent( null, e );
    }

    private mouseMoveEvent(ev) {
        // if (this.isMouseDown == false) return;
        // if (ev.buttons == 0) {
        //     window.removeEventListener("mousemove", this.mouseMoveEvent);
        //     this.isMouseDown = false;
        //     let e = UIEvent.eventWithSysEvent(ev);
        //     this.touchesEndedWithEvent(null, e);
        // }
        // else {
        //     let e = UIEvent.eventWithSysEvent(ev);
        //     this.touchesMovedWithEvent(null, e);
        // }
    }

    addGestureRecognizer(gesture: UIGestureRecognizer) {
        if (this.gestureRecognizers.containsObject(gesture)) return;

        gesture.view = this;
        this.gestureRecognizers.addObject(gesture);
        this.userInteraction = true;
    }

    removeGestureRecognizer(gesture: UIGestureRecognizer) {
        gesture.view = null;
        this.gestureRecognizers.removeObject(gesture);
    }

    //
    // Animations
    //

    private static animationsChanges = null;
    private static animationsViews = null;
    private static animationTarget = null;
    private static animationCompletion = null;
    static animateWithDurationAnimations(duration: number, animations, completion?) {
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        //UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        //animations.call(target);
        animations();

        for (let index = 0; index < UIView.animationsChanges.length; index++) {
            let anim = UIView.animationsChanges[index];
            let view = anim["View"];
            let key = anim["Key"];
            let value = anim["EndValue"];

            let cssProp =
                key === 'x' ? 'left' :
                key === 'y' ? 'top' :
                key

            view.layer.style.transition = (view.layer.style.transition ? view.layer.style.transition + ", " : "") + cssProp + " " + duration + "s";
            setTimeout(() => view.layer.style[cssProp] = value)

            UIView.addTrackingAnimationView(view);
        }
        UIView.animationsChanges = null;
    }

    private static addTrackingAnimationView(view: UIView) {
        // let index = UIView.animationsViews.indexOf(view);
        // if (index > -1) return;
        // UIView.animationsViews.addObject(view);
        // view.layer.animationParams = { "View": view };
        // view.layer.addEventListener("webkitTransitionEnd", UIView.animationDidFinish);
    }

    private static removeTrackingAnimationView(view: UIView) {
        // let index = UIView.animationsViews.indexOf(view);
        // if (index == -1) return;
        // UIView.animationsViews.removeObject(view);
        // view.layer.removeEventListener("webkitTransitionEnd", UIView.animationDidFinish);
        // view.layer.style.transition = "none";
        // view.setNeedsDisplay();
    }

    private static animationDidFinish(event) {
        let view = event.target.animationParams["View"];
        UIView.removeTrackingAnimationView(view);
        if (UIView.animationsViews.length > 0) return;
        UIView.animationsChanges = null;
        UIView.animationsViews = null;
        if (UIView.animationTarget != null && UIView.animationCompletion != null) UIView.animationCompletion.call(UIView.animationTarget);
        UIView.animationTarget = null;
        UIView.animationCompletion = null;
    }

}


