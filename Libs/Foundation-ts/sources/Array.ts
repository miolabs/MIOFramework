declare global {
interface Array<T>
{
    count:number;
    addObject(object:any):void;
    removeObject(object:any):void;
    removeObjectAtIndex(index:number):void;
    indexOfObject(object:any):number;
    containsObject(object:any):boolean;
    objectAtIndex(index:number):any;
    firstObject():any;
    lastObject():any;
} }

Array.prototype.addObject = function(object){
    this.push(object);
}

Array.prototype.removeObject = function(object){
    let index = this.indexOf(object);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.removeObjectAtIndex = function(index){        
    this.splice(index, 1);    
}

Array.prototype.indexOfObject = function(object){
    return this.indexOf(object);
}

Array.prototype.containsObject = function(object):boolean{
    let index = this.indexOf(object);
    return index > -1 ? true : false;
}

Array.prototype.objectAtIndex = function(index){
    return this[index];
}

Object.defineProperty(Array.prototype, "count", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
})

Array.prototype.firstObject = function(){
    return this[0];
}

Array.prototype.lastObject = function(){
    return this[this.count - 1];
}

// The empty export on the bottom is required if you declare global in .ts and do not export anything. This forces the file to be a module. 
export {}