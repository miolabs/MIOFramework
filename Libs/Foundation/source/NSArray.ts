//For code completion the interface is defined in types/mio/index.d.ts

interface Array<T>
{
    count();
    addObject(object);
    removeObject(object);
    removeObjectAtIndex(index);
    indexOfObject(object);
    containsObject(object);
    objectAtIndex(index);
    firstObject();
    lastObject();
};

Array.prototype.addObject = function(){
    return this.length;
}

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
