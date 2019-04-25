"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    ANIMATIONS
 */
var UIAnimationType;
(function (UIAnimationType) {
    UIAnimationType[UIAnimationType["None"] = 0] = "None";
    UIAnimationType[UIAnimationType["BeginSheet"] = 1] = "BeginSheet";
    UIAnimationType[UIAnimationType["EndSheet"] = 2] = "EndSheet";
    UIAnimationType[UIAnimationType["Push"] = 3] = "Push";
    UIAnimationType[UIAnimationType["Pop"] = 4] = "Pop";
    UIAnimationType[UIAnimationType["FlipLeft"] = 5] = "FlipLeft";
    UIAnimationType[UIAnimationType["FlipRight"] = 6] = "FlipRight";
    UIAnimationType[UIAnimationType["FadeIn"] = 7] = "FadeIn";
    UIAnimationType[UIAnimationType["FadeOut"] = 8] = "FadeOut";
    UIAnimationType[UIAnimationType["LightSpeedIn"] = 9] = "LightSpeedIn";
    UIAnimationType[UIAnimationType["LightSpeedOut"] = 10] = "LightSpeedOut";
    UIAnimationType[UIAnimationType["Hinge"] = 11] = "Hinge";
    UIAnimationType[UIAnimationType["SlideInUp"] = 12] = "SlideInUp";
    UIAnimationType[UIAnimationType["SlideOutDown"] = 13] = "SlideOutDown";
    UIAnimationType[UIAnimationType["SlideInRight"] = 14] = "SlideInRight";
    UIAnimationType[UIAnimationType["SlideOutRight"] = 15] = "SlideOutRight";
    UIAnimationType[UIAnimationType["SlideInLeft"] = 16] = "SlideInLeft";
    UIAnimationType[UIAnimationType["SlideOutLeft"] = 17] = "SlideOutLeft";
    UIAnimationType[UIAnimationType["HorizontalOutFlip"] = 18] = "HorizontalOutFlip";
    UIAnimationType[UIAnimationType["HorizontalInFlip"] = 19] = "HorizontalInFlip";
    UIAnimationType[UIAnimationType["ZoomIn"] = 20] = "ZoomIn";
    UIAnimationType[UIAnimationType["ZoomOut"] = 21] = "ZoomOut";
})(UIAnimationType = exports.UIAnimationType || (exports.UIAnimationType = {}));
// ANIMATION TYPES
function UIClassListForAnimationType(type) {
    var array = [];
    array.push("animated");
    switch (type) {
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
exports.UIClassListForAnimationType = UIClassListForAnimationType;
function _UIAddAnimations(layer, animations) {
    var w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}
exports._UIAddAnimations = _UIAddAnimations;
function _UIRemoveAnimations(layer, animations) {
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}
exports._UIRemoveAnimations = _UIRemoveAnimations;
function _UIAnimationStart(layer, animationController, animationContext, target, completion) {
    if (animationController == null) {
        if (target != null && completion != null)
            completion.call(target);
        return;
    }
    var duration = animationController.transitionDuration(animationContext);
    var animations = animationController.animations(animationContext);
    animationController.animateTransition(animationContext);
    if (duration == 0 || animations == null) {
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
exports._UIAnimationStart = _UIAnimationStart;
function _UIAnimationDidFinish(event) {
    var animationController = event.target.animationParams["animationController"];
    var animations = event.target.animationParams["animations"];
    var target = event.target.animationParams["target"];
    var completion = event.target.animationParams["completion"];
    var layer = event.target;
    _UIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);
    if (target != null && completion != null)
        completion.call(target);
}
exports._UIAnimationDidFinish = _UIAnimationDidFinish;
//# sourceMappingURL=MUICoreAnimation.js.map