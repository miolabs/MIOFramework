import { NSObject, NSPredicate, _NSPredicateFilterObjects, _NSSortDescriptorSortObjects} from "foundation";
import { NSRelationshipDescription } from "./NSRelationshipDescription";
import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSManagedObject } from "./NSManagedObject";

export class NSManagedObjectSet<T = any> extends NSObject {

    static _setWithManagedObject(object:NSManagedObject, relationship:NSRelationshipDescription) {
        let mos = new NSManagedObjectSet();
        mos._initWithManagedObject(object, relationship);
        return mos;
    }

    private mo:NSManagedObject = null;
    private relationship:NSRelationshipDescription = null;
    private objectIDs = [];
    private relationshipFault = true;

    init(){
        throw new Error("NSManagedObjectSet: Can't initialize an NSManagedObjectSet with -init")
    }

    _initWithManagedObject(object:NSManagedObject, relationship:NSRelationshipDescription){
        super.init();
        this.mo = object;
        this.relationship = relationship;
    }

    _addObjectID(objectID:NSManagedObjectID){
        if (this.objectIDs.containsObject(objectID) == true) return;
        this.objectIDs.addObject(objectID);
        this.relationshipFault = true;        
    }

    addObject(object:NSManagedObject){
        this._addObjectID(object.objectID);
    }

    _removeObject(objectID:NSManagedObjectID){
        if (this.objectIDs.containsObject(objectID) == false) return;
        this.objectIDs.removeObject(objectID);
        this.relationshipFault = true;        
    }

    removeObject(object:NSManagedObject){
        this._removeObject(object.objectID);
    }

    removeAllObjects(){        
        this.objectIDs = [];
    }

    indexOfObject(object:NSManagedObject|string|Array<string>) {
        if (object instanceof NSManagedObject) return this.objectIDs.indexOfObject(object.objectID);
        let ids = this.allObjects.map( function(e){ return e.objectID._getReferenceObject(); } );
        
        if ( typeof( object ) === "string" ){
            return ids.indexOfObject( object );
        }

        for (let id of ids) {
            if ( object.containsObject(id) ) return 0;
        }
        return -1;
    }

    containsObject(object:NSManagedObject){
        return this.objectIDs.indexOfObject(object.objectID) > -1 ? true : false;
    }

    objectAtIndex(index){
        let objects = this.allObjects;
        return objects.objectAtIndex(index);
    }

    private objects = null;
    get allObjects(){
        if (this.relationshipFault == false){
            return this.objects;
        }

        this.objects = [];
        this.relationshipFault = false;

        for(let index = 0; index < this.objectIDs.length; index++){
            let objID = this.objectIDs[index];
            let obj = this.mo.managedObjectContext.objectWithID(objID);
            this.objects.addObject(obj);
        }                                            

        return this.objects;
    }

    get count(){
        return this.objectIDs.length;
    }

    get length(){
        return this.count;
    }    

    filterWithPredicate(predicate:NSPredicate) {
        let objs = _NSPredicateFilterObjects(this.allObjects, predicate);
        return objs;
    }

    sortedArrayUsingDescriptors(sortDescriptors){
        let objs = _NSSortDescriptorSortObjects(this.allObjects, sortDescriptors);
        return objs;
    }
    
    // Prevent KVO on special properties
    addObserver(obs, keypath:string, context?){
        if (keypath == "count" || keypath == "length") throw new Error("NSSet: Can't observe count. It's not KVO Compilant"); 
        super.addObserver(obs, keypath, context);
    }

    _reset(){
        this.relationshipFault = true;
        this.objects = [];
        this.objectIDs = [];
    }

    intersection(set:NSManagedObjectSet) : NSManagedObjectSet {
        let intersect = NSManagedObjectSet._setWithManagedObject(this.mo, this.relationship);

        for (let index = 0; index < set.count; index++) {
            let obj = set.objectAtIndex(index);
            if (this.containsObject(obj)) intersect.addObject(obj);
        }

        return intersect;
    }

    subtracting(set:NSManagedObjectSet) : NSManagedObjectSet {
        let substract = NSManagedObjectSet._setWithManagedObject(this.mo, this.relationship);
 
        for (let index = 0; index < this.count; index++) {
            let obj = this.objectAtIndex(index);
            if (set.containsObject(obj) == false) substract.addObject(obj);
        }

        return substract;
    }

    map(block: (e:T, index:number, s:NSManagedObjectSet<T>) => any) {
        let array = [];
        for(let index = 0; index < this.count; index++){ 
            let obj = this.objectAtIndex(index);
            let mapValue = block(obj, index, this);
            array.addObject(mapValue);
        }
        return array;
    }

    copy() : NSManagedObjectSet {

        let set = NSManagedObjectSet._setWithManagedObject(this.mo, this.relationship);

        for (let index = 0; index < this.count; index++) {
            let obj = this.objectAtIndex(index);
            set.addObject(obj);
        }

        return set;

    }

}
