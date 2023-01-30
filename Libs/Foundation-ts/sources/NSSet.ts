/// <reference path="NSPredicate.ts" />

import { NSObject } from "./NSObject";
import { NSPredicate, _NSPredicateFilterObjects } from "./NSPredicate";

export class NSSet extends NSObject {

    static set() {

        let s = new NSSet();
        s.init();

        return s;
    }

    private _objects = [];

    addObject(object){
        if (this._objects.containsObject(object) == true) return;        
        this._objects.addObject(object);
    }

    removeObject(object){
        if (this._objects.containsObject(object) == false) return;        
        this._objects.removeObject(object);
    }

    removeAllObjects(){
        this._objects = [];
    }

    indexOfObject(object) {
        return this._objects.indexOf(object);
    }

    containsObject(object){
        return this._objects.indexOfObject(object) > -1 ? true : false;
    }

    objectAtIndex(index){
        return this._objects[index];
    }

    get allObjects(){
        return this._objects;
    }

    get count(){
        return this._objects.length;
    }

    get length(){
        return this._objects.length;
    }    

    copy():NSSet{
         
        let set = new NSSet();
        set.init();

        for (let index = 0; index < this._objects.length; index++){
            let obj = this._objects[index];
            set.addObject(obj);
        }

        return set;
    }

    filterWithPredicate(predicate:NSPredicate) {
        let objs = _NSPredicateFilterObjects(this._objects, predicate);
        return objs;
    }

    // Prevent KVO on special properties
    addObserver(obs, keypath:string, context?){
        if (keypath == "count" || keypath == "length") throw new Error("NSSet: Can't observe count. It's not KVO Compilant"); 
        super.addObserver(obs, keypath, context);
    }
    

}
