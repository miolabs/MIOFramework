import { _CAAddAnimations, _CARemoveAnimations } from "./CoreAnimation+Animations";
import { CALayer } from "./CALayer";

export function _CAAnimationStart(layer:CALayer, animationController, animationContext, completion?:any)
{
    if (animationController == null){
        if (completion != null) completion();        
        return;
    }

    let duration = animationController.transitionDuration(animationContext);
    let animations = animationController.animations(animationContext);

    animationController.animateTransition(animationContext);

    if ( duration == 0 || animations == null ) {
        // NO animation
        animationController.animationEnded(true);
        if ( completion != null ) completion();
        return;
    }

    let element = layer.contents;

    element.style.animationDuration = duration + "s";
    _CAAddAnimations(element, animations);

    element.animationParams = {};
    element.animationParams["animationController"] = animationController;
    element.animationParams["animations"] = animations;

    if (completion != null)
        element.animationParams["completion"] = completion;

    element.addEventListener("animationend", _CAAnimationDidFinish);
}

export function _CAAnimationDidFinish( event:any )
{
    let animationController = event.target.animationParams["animationController"];
    let animations = event.target.animationParams["animations"];    
    let completion = event.target.animationParams["completion"];
    let element = event.target;
    
    _CARemoveAnimations(element, animations);
    element.removeEventListener("animationend", _CAAnimationDidFinish);
    animationController.animationEnded(true);

    if (completion != null) completion();
}
