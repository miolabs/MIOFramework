export enum _CAAnimationType
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
    ZoomInUp,
    ZoomOut,
    BounceIn,
    BounceOut 
}

// ANIMATION TYPES
export function _CAClassListForAnimationType( type:_CAAnimationType )
{
    let array:string[] = [];
    array.push("animated");

    switch (type)
    {
        case _CAAnimationType.BeginSheet    : array.push("slideInDown")  ; break;
        case _CAAnimationType.EndSheet      : array.push("slideOutUp")   ; break;
        case _CAAnimationType.Push          : array.push("slideInRight") ; break;
        case _CAAnimationType.Pop           : array.push("slideOutRight"); break;
        case _CAAnimationType.FadeIn        : array.push("fadeIn")       ; break;
        case _CAAnimationType.FadeOut       : array.push("fadeOut")      ; break;
        case _CAAnimationType.LightSpeedOut : array.push("lightSpeedOut"); break;
        case _CAAnimationType.Hinge         : array.push("hinge")        ; break;
        case _CAAnimationType.SlideInUp     : array.push("slideInUp")    ; break;
        case _CAAnimationType.SlideOutDown  : array.push("slideOutDown") ; break;
        case _CAAnimationType.SlideInRight  : array.push("slideInRight") ; break;
        case _CAAnimationType.SlideOutRight : array.push("slideOutRight"); break;
        case _CAAnimationType.SlideInLeft   : array.push("slideInLeft")  ; break;
        case _CAAnimationType.SlideOutLeft  : array.push("slideOutLeft") ; break;
        case _CAAnimationType.HorizontalOutFlip: array.push("flipOutY")  ; break;
        case _CAAnimationType.HorizontalInFlip : array.push("flipInY")   ; break;
        case _CAAnimationType.ZoomIn           : array.push("zoomIn")    ; break;
        case _CAAnimationType.ZoomInUp         : array.push("zoomInUp")  ; break;
        case _CAAnimationType.ZoomOut          : array.push("zoomOut")   ; break;
        case _CAAnimationType.BounceIn         : array.push("bounceIn")  ; break;
        case _CAAnimationType.BounceOut        : array.push("bounceOut") ; break;
    }

    return array;
}

export function _CAAddAnimations(element:any, animations:string[])
{    
    for (let index = 0; index < animations.length; index++)
        element.classList.add( "animate__" + animations[index] );
}

export function _CARemoveAnimations(element:any, animations:string[])
{
    for (let index = 0; index < animations.length; index++)
        element.classList.remove( "animate__" + animations[index] );
}