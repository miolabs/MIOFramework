import { UIView } from "./UIView";
import { MIOPoint, MIORect, MIOSize } from "../MIOFoundation";
/**
 * Created by godshadow on 01/09/16.
 */
export declare class UIScrollView extends UIView {
    pagingEnabled: boolean;
    delegate: any;
    scrolling: boolean;
    private _showsVerticalScrollIndicator;
    showsVerticalScrollIndicator: boolean;
    private _scrollEnable;
    scrollEnable: boolean;
    private scrollTimer;
    private lastOffsetY;
    protected contentView: UIView;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayer;
    private scrollEventCallback;
    private scrollEventStopCallback;
    protected didStartScroll(): void;
    protected didScroll(deltaX: any, deltaY: any): void;
    protected didStopScroll(): void;
    setScrollEnable(value: boolean): void;
    setShowsVerticalScrollIndicator(value: boolean): void;
    contentOffset: MIOPoint;
    readonly bounds: MIORect;
    addSubview(view: UIView, index?: any): void;
    contentSize: MIOSize;
    layoutSubviews(): void;
    scrollToTop(animate?: any): void;
    scrollToBottom(animate?: any): void;
    scrollToPoint(x: any, y: any, animate?: any): void;
    scrollRectToVisible(rect: any, animate?: any): void;
}
