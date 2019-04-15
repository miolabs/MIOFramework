import { NSObject } from "mio-foundation-web";

/*
    ANIMATIONS
 */

export enum UIAnimationType
{
    None,
    BeginSheet,
    EndSheet,
    Push,
    Pop,
    FlipLeft,
    FlipRight,
    FadeIn,
    FadeOut,
    LightSpeedIn,
    LightSpeedOut,
    Hinge,
    SlideInUp,
    SlideOutDown,
    SlideInRight,
    SlideOutRight,
    SlideInLeft,
    SlideOutLeft,
    HorizontalOutFlip,
    HorizontalInFlip,   
    ZoomIn,
    ZoomOut 
}

export interface UIViewControllerAnimatedTransitioning extends NSObject
{    
    animationControllerForPresentedController();
}


export interface UIViewControllerAnimatedTransitioning extends NSObject
{    
    transitionDuration(transitionContext):number;
    animateTransition(transitionContext):void;
    animationEnded(transitionCompleted):void;
    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext);
}

// ANIMATION TYPES
export function UIClassListForAnimationType(type)
{
    var array = [];
    array.push("animated");

    switch (type)
    {
        case UIAnimationType.BeginSheet:
            array.push("slideInDown");
            break;

        case UIAnimationType.EndSheet:
            array.push("slideOutUp");
            break;

        case UIAnimationType.Push:
            array.push("slideInRight");
            break;

        case UIAnimationType.Pop:
            array.push("slideOutRight");
            break;

        case UIAnimationType.FadeIn:
            array.push("fadeIn");
            break;

        case UIAnimationType.FadeOut:
            array.push("fadeOut");
            break;

        case UIAnimationType.LightSpeedOut:
            array.push("lightSpeedOut");
            break;

        case UIAnimationType.Hinge:
            array.push("hinge");
            break;

        case UIAnimationType.SlideInUp:
            array.push("slideInUp");
            break;

        case UIAnimationType.SlideOutDown:
            array.push("slideOutDown");            
            break;

        case UIAnimationType.SlideInRight:
            array.push("slideInRight");
            break;

        case UIAnimationType.SlideOutRight:
            array.push("slideOutRight");
            break;

        case UIAnimationType.SlideInLeft:
            array.push("slideInLeft");
            break;

        case UIAnimationType.SlideOutLeft:
            array.push("slideOutLeft");
            break;

        case UIAnimationType.HorizontalOutFlip:
            array.push("flipOutY");
            break;            

        case UIAnimationType.HorizontalInFlip:
            array.push("flipInY");
            break;    
            
        case UIAnimationType.ZoomIn:
            array.push("zoomIn");
            break;

        case UIAnimationType.ZoomOut:
            array.push("zoomOut");
            break;
    }

    return array;
}

export function _UIAddAnimations(layer, animations)
{
    let w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}

export function _UIRemoveAnimations(layer, animations)
{
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}

export function _UIAnimationStart(layer, animationController, animationContext, target?, completion?)
{
    if (animationController == null)
    {
        if (target != null && completion != null)
                completion.call(target);        
        return;
    }

    let duration = animationController.transitionDuration(animationContext);
    let animations = animationController.animations(animationContext);

    animationController.animateTransition(animationContext);

    if (duration == 0 || animations == null)
    {
        // NO animation
        animationController.animationEnded(true);

        if (target != null && completion != null)
            completion.call(target);

        return;
    }

    layer.style.animationDuration = duration + "s";
    _UIAddAnimations(layer, animations);

    layer.animationParams = {};
    layer.animationParams["animationController"] = animationController;
    layer.animationParams["animations"] = animations;

    if (target != null)
        layer.animationParams["target"] = target;
    if (completion != null)
        layer.animationParams["completion"] = completion;

    layer.addEventListener("animationend", _UIAnimationDidFinish);
}

export function _UIAnimationDidFinish(event)
{
    let animationController = event.target.animationParams["animationController"];
    let animations = event.target.animationParams["animations"];
    let target = event.target.animationParams["target"];
    let completion = event.target.animationParams["completion"];
    let layer = event.target;

    _UIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);

    if (target != null && completion != null)
        completion.call(target);
}