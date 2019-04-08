export class NSRange 
{
    location = 0;
    length = 0;
    
    constructor(location, length) {
        this.location = location;
        this.length = length;
    }    
}

export function NSMaxRange(range:NSRange):number{
    return range.location + range.length;
 }

export function NSEqualRanges(range1:NSRange, range2:NSRange):boolean {
    return (range1.location == range2.location && range1.length == range2.length);
 }

export function NSLocationInRange(location:number, range:NSRange){
    if (range == null) return false;
    return (location >= range.location && location < NSMaxRange(range))? true : false;
 }

export function NSIntersectionRange(range1:NSRange, range2:NSRange):NSRange {

    let max1 = NSMaxRange(range1);
    let max2 = NSMaxRange(range2);
    var min, loc;
    var result;
 
    min = (max1 < max2) ? max1: max2;
    loc = (range1.location > range2.location) ? range1.location : range2.location;
 
    if(min < loc) {
        result.location = result.length = 0;
    }
    else {
        result.location = loc;
        result.length = min - loc;
    }
 
    return result;
}

export function NSUnionRange(range1:NSRange, range2:NSRange):NSRange{
    
    let max1 = NSMaxRange(range1);
    let max2 = NSMaxRange(range2); 
    
    var max,loc;
    var result;
 
    max = (max1 > max2) ? max1 : max2;
    loc = (range1.location < range2.location) ? range1.location:range2.location;
 
    result.location = loc;
    result.length = max - result.location;
    
    return result;
 }