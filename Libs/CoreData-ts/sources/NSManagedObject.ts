import { NSObject, NSSet } from "foundation";
import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSManagedObjectContext } from "./NSManagedObjectContext";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSIncrementalStore } from "./NSIncrementalStore";
import { NSAttributeDescription } from "./NSAttributeDescription";
import { NSDeleteRule, NSRelationshipDescription } from "./NSRelationshipDescription";
import { NSManagedObjectSet } from "./NSManagedObjectSet";
import { NSManagedObjectModel } from "./NSManagedObjectModel";

/**
 * Created by godshadow on 23/03/2017.
 */


export class NSManagedObject extends NSObject {        

    init(){
        throw new Error("NSManagedObject: Can't initialize an NSManagedObject with -init");
    }

    _initWithObjectID(objectID:NSManagedObjectID, context:NSManagedObjectContext) {

        //super.init();
        this._objectID = objectID;
        this._managedObjectContext = context;
        this._isFault = true;
        this._storedValues = null;

        this.awakeFromFetch();

        //NSLog("ManagedObject create: " + this.entity.name + "/" + this.objectID._getReferenceObject());
    }

    initWithEntityAndInsertIntoManagedObjectContext(entity:NSEntityDescription, context:NSManagedObjectContext){        
        
        let objectID = NSManagedObjectID._objectIDWithEntity(entity);
        this._initWithObjectID(objectID, context);

        context.insertObject(this);        
        this.setDefaultValues();

        this.awakeFromInsert();

        //NSLog("ManagedObject ins create: " + this.entity.name + "/" + this.objectID._getReferenceObject());                  
    }

    private setDefaultValues(){
        let attributes = this.entity.attributesByName;
        for(let key in attributes) {
            let attr = attributes[key];
            let value = attr.defaultValue;

            if (value == null) continue;

            this.setValueForKey(value, key);
        }
    }
    
    private _objectID:NSManagedObjectID = null;    
    get objectID():NSManagedObjectID {return this._objectID;}
    get entity():NSEntityDescription {return this.objectID.entity;}

    private _managedObjectContext:NSManagedObjectContext = null;
    get managedObjectContext():NSManagedObjectContext {return this._managedObjectContext;}

    get hasChanges():boolean {return (this._isInserted || this._isUpdated || this._isDeleted);}

    private _isInserted = false;
    get isInserted():boolean {return this._isInserted;}
    _setIsInserted(value:boolean) {
        this.willChangeValue("hasChanges");
        this.willChangeValue("isInserted");
        this._isInserted = value;        
        this.didChangeValue("isInserted");
        this.didChangeValue("hasChanges");
    }    

    private _isUpdated = false;
    get isUpdated():boolean {return this._isUpdated;}
    _setIsUpdated(value:boolean) {
        this.willChangeValue("hasChanges");
        this.willChangeValue("isUpdated");
        this._isUpdated = value;
        this.didChangeValue("isUpdated");
        this.didChangeValue("hasChanges");
    }
    
    private _isDeleted = false;
    get isDeleted():boolean {return this._isDeleted;}
    _setIsDeleted(value:boolean) {
        this.willChangeValue("hasChanges");
        this.willChangeValue("isDeleted");
        this._isDeleted = value;
        this.deleteInverseRelationships();
        this.didChangeValue("isDeleted");
        this.didChangeValue("hasChanges");        
    }
    
    private _isFault = false;
    get isFault():boolean {return this._isFault;}
    _setIsFault(value:boolean) {
        if (value == this._isFault) return;
        this.willChangeValue("hasChanges");
        this.willChangeValue("isFault");
        this._isFault = value;
        if (value == true) this._storedValues = null;
        this.didChangeValue("isFault");
        this.didChangeValue("hasChanges");
    }    
        
    awakeFromInsert() {}
    awakeFromFetch() {}

    private _changedValues:{ [key:string] : any } = {}; 
    get changedValues() {return this._changedValues;} 

    private _storedValues:{ [key:string] : any } = null;
    private committedValues(){
        if (this.objectID.isTemporaryID == true) return {};
        // if (this.objectID.isTemporaryID == true && this._storedValues == null) {
        //     this._storedValues = {};
        //     return this._storedValues;
        // }

        if (this._storedValues == null) {
            // Get from the store
            if (this.objectID.persistentStore instanceof NSIncrementalStore) {
                this._storedValues = this.storeValuesFromIncrementalStore(this.objectID.persistentStore);
            }
            else{
                throw new Error("NSManagedObject: Only Incremental store is supported.");
            }
            this._setIsFault(false);
        }

        return this._storedValues;
    }

    private storeValuesFromIncrementalStore(store:NSIncrementalStore){        
        let storedValues:{ [key:string] : any }  = {};        
        let properties = this.entity.properties;
        
        for(let index = 0; index < properties.length; index++){
            let property = properties[index];
            if (property instanceof NSAttributeDescription) {
                let attribute = property as NSAttributeDescription;
                let node = store.newValuesForObjectWithID(this.objectID, this.managedObjectContext);
                if (node == null) continue;
                let value = node.valueForPropertyDescription(attribute);                
                storedValues[attribute.name] = value;
            }
            else if (property instanceof NSRelationshipDescription) {
                let relationship = property as NSRelationshipDescription;                
                
                if (relationship.isToMany == false) {                    
                    let objectID = store.newValueForRelationship(relationship, this.objectID, this.managedObjectContext);
                    if (objectID != null){
                        storedValues[relationship.name] = objectID;
                    }                        
                }
                else {                  
                    // Tick. I store the value in a private property when the object is temporary                      
                    let set:NSManagedObjectSet = NSManagedObjectSet._setWithManagedObject(this, relationship);
                    //storedValues[relationship.name] = set;
                    
                    let objectIDs = store.newValueForRelationship(relationship, this.objectID, this.managedObjectContext);
                    if (objectIDs == null) continue;
                    
                    for(let count = 0; count < objectIDs.length; count++){
                        let objID = objectIDs[count];
                        set._addObjectID(objID);
                    }  
                    
                    this["_" + relationship.name] = set;                    
                }
            }
        }         
        
        return storedValues;
    }

    committedValuesForKeys(keys:string[]){
        let values = this.committedValues();
        if (keys == null) return values;

        let result: { [key:string] : any } = {};
        for (let key in keys){
            let obj = values[key];
            result[key] = obj;
        }
        return result;
    }

    willSave() {}
    didSave() {}

    willTurnIntoFault() {}
    didTurnIntoFault() {}

    willAccessValueForKey(key:string) {};
    didAccessValueForKey(key:string) {};

    // valueForKeyPath(keyPath:string) : any {

    //     let keys = keyPath.split(".");
        
    //     const k = keys[0];
    //     let value = this.valueForKey(k);
        
    //     // This means we are at the end of the key path tree
    //     if (keys.length == 1) return value;
        
    //     // We need to follow the tree
    //     const object = value as NSManagedObject;
    //     keys.removeObjectAtIndex(0);
    //     const newKeyPath = keys.join(".")
    //     return object.valueForKeyPath(newKeyPath);
    // }

    valueForKey(key:string){
        if (key == null) return null;

        let property = this.entity.propertiesByName[key];
        if (property == null) {      
            return super.valueForKey(key);
        }      
        
        this.willAccessValueForKey(key);

        let value = null;

        if (property instanceof NSAttributeDescription){
            if (key in this._changedValues) {
                value = this._changedValues[key];
            }
            else {
                value = this.primitiveValueForKey(key);
            }
        }
        else if (property instanceof NSRelationshipDescription){
            let relationship = property as NSRelationshipDescription;
            if (relationship.isToMany == false){
                if (key in this._changedValues) {
                    let objID:NSManagedObjectID = this._changedValues[key];
                    if (objID != null) {
                        value = this.managedObjectContext.objectWithID(objID);
                    }
                }
                else {
                    value = this.primitiveValueForKey(key);
                }
            }
            else {                
                if (key in this._changedValues) {
                    value = this._changedValues[key];
                }
                else {
                    value = this.primitiveValueForKey(key);                    
                }
            }
        }   
  
        this.didAccessValueForKey(key);
        
        return value;
    }

    setValueForKey(value:any, key:string, visited:NSSet = new NSSet()){
        let property = this.entity.propertiesByName[key];

        if (property == null) {
            super.setValueForKey(value, key);
            return;
        }

        this.willChangeValueForKey(key);

        if (property instanceof NSRelationshipDescription){
            let relationship = property as NSRelationshipDescription;
                        
            if (relationship.isToMany == false){
                let currentValue = this.valueForKey(key);
                
                let objID = value != null ? (value as NSManagedObject).objectID : null;
                this._changedValues[key] = objID;
            
                this._setInverseRelationshipValue(currentValue, value, relationship, visited);
            }
            else {
                // TODO: We don't support adding a set value yet.
            }            
        }
        else {
            this._changedValues[key] = value;
        }

        this.didChangeValueForKey(key);        

        this.managedObjectContext.updateObject(this);
    }

    primitiveValueForKey(key:string){
        
        let property = this.entity.propertiesByName[key];

        let committedValues = this.committedValues();
        
        if (property instanceof NSRelationshipDescription){
            let relationship = property as NSRelationshipDescription;
            if (relationship.isToMany == false){                
                let objID:NSManagedObjectID = committedValues[key];
                if (objID == null) return null;
                let obj = this.managedObjectContext.objectWithID(objID);
                return obj;
            }
            else {                
                // Trick. I store the value in a private property when the object is temporary
                let set:NSManagedObjectSet = this["_" + relationship.name];
                if (set == null) {
                    set = NSManagedObjectSet._setWithManagedObject(this, relationship);
                    this["_" + relationship.name] = set;
                }
                return set;
            }
        }
        
        // Return attribute property
        return committedValues[key];
    }

    setPrimitiveValueForKey(value:any, key:string){
        
        let property = this.entity.propertiesByName[key];
        
        let committedValues = this.committedValues(); 

        if (value == null) {
            committedValues[key] = null;
        }
        else if (property instanceof NSRelationshipDescription){
            let relationship = property as NSRelationshipDescription;
            if (relationship.isToMany == false){
                let obj = value as NSManagedObject;
                committedValues[key] = obj.objectID;
            }            
            else {
                if (value == null){
                    this["_" + relationship.name] = NSManagedObjectSet._setWithManagedObject(this, relationship);
                }
                else {
                    if ((value instanceof NSManagedObjectSet) == false) throw new Error("NSManagedObject: Trying to set a value in relation ships that is not a set.");
                    this["_" + relationship.name] = value;
                }
            }
            
            let inverseRelationship = relationship.inverseRelationship;
            if (inverseRelationship != null) {
                // TODO:
            }
        }
        else {
            committedValues[key] = value;
        }

    }

    // hasFaultForRelationshipNamed(relationsipName:string){
    //     return this.relationshipNamesFaults.containsObject(relationsipName);
    // }

    //
    // PRIVATE 
    //


    _addObjectForKey(object:NSManagedObject, key:string, visited:NSSet = new NSSet()){
        let set:NSManagedObjectSet = this._changedValues[key];
        
        if (set == null) {
            // Check for committed value
            let storedSet = this.primitiveValueForKey(key);
            set = storedSet != null ? storedSet.copy() : null;
        }

        let rel:NSRelationshipDescription = this.entity.relationshipsByName[key];
        if (set == null) {            
            set = NSManagedObjectSet._setWithManagedObject(this, rel);            
        }

        set.addObject(object);
        this._changedValues[key] = set;
        this.managedObjectContext.updateObject(this);

        this._setInverseRelationshipValue(null, object, rel, visited);
    }

    _removeObjectForKey(object:any, key:string, visited:NSSet = new NSSet()){
        let set:NSManagedObjectSet = this._changedValues[key];
        
        if (set == null) {
            // Check for committed value
            let storedSet = this.primitiveValueForKey(key);
            set = storedSet != null ? storedSet.copy() : null;
        }

        let rel:NSRelationshipDescription = this.entity.relationshipsByName[key];
        if (set == null) {            
            set = NSManagedObjectSet._setWithManagedObject(this, rel);
        }

        set.removeObject(object);
        this._changedValues[key] = set;
        this.managedObjectContext.updateObject(this);
        
        this._setInverseRelationshipValue(object, null, rel, visited);
    }
    
    _didCommit(){
        this._changedValues = {};
        this._storedValues = null;
        this._setIsFault(false);
    }

    private _setInverseRelationshipValue(oldValue:NSManagedObject, newValue:NSManagedObject, relationShip:NSRelationshipDescription, visited:NSSet){
        if (relationShip.inverseRelationship == null) return;
        //if (oldValue == newValue) return;
        visited.addObject(this.objectID.URIRepresentation.absoluteString);
        
        let relName = relationShip.inverseName;        
        let relEntity = this.entity.managedObjectModel.entitiesByName[relationShip.inverseEntityName];
        let rel = relEntity.relationshipsByName[relName] as NSRelationshipDescription;
        if (rel.isToMany == false){
            if (oldValue != null && !visited.containsObject(oldValue.objectID.URIRepresentation.absoluteString)) oldValue.setValueForKey(null, relName, visited);
            // NOTE: This is to ensure, we update the graph correctly 
            if (oldValue != null && newValue != null && oldValue.objectID.URIRepresentation.absoluteString == newValue.objectID.URIRepresentation.absoluteString) {
                visited.removeObject(oldValue.objectID.URIRepresentation.absoluteString);
            }
            if (newValue != null && !visited.containsObject(newValue.objectID.URIRepresentation.absoluteString)) newValue.setValueForKey(this, relName, visited);
        }
        else {
            if (oldValue != null && !visited.containsObject(oldValue.objectID.URIRepresentation.absoluteString)) oldValue._removeObjectForKey(this, relName, visited);
            // NOTE: This is to ensure, we update the graph correctly
            if (oldValue != null && newValue != null && oldValue.objectID.URIRepresentation.absoluteString == newValue.objectID.URIRepresentation.absoluteString) {
                visited.removeObject(oldValue.objectID.URIRepresentation.absoluteString);
            }
            if (newValue != null && !visited.containsObject(newValue.objectID.URIRepresentation.absoluteString)) newValue._addObjectForKey(this, relName, visited);
        }
    }

    private insertToInverseRelationships(){

        let relationships = this.entity.relationshipsByName;
        for (let relName in relationships) {
            let rel:NSRelationshipDescription = relationships[relName];
            if (rel.inverseRelationship != null) {
                let parentObject:NSManagedObject = this.valueForKey(relName);
                if (parentObject == null) continue;
                let parentRelationship = parentObject.entity.relationshipsByName[rel.inverseRelationship.name];
                if (parentRelationship.isToMany == false){
                    parentObject.setValueForKey(this, rel.inverseRelationship.name);
                }
                else {
                    let set:NSManagedObjectSet = parentObject.valueForKey(rel.inverseRelationship.name);
                    set.addObject(this);
                }
            }
        }
    }

    private deleteInverseRelationships() {
        
        let relationships = this.entity.relationshipsByName;
        for (let relName in relationships) {
            let rel = relationships[relName] as NSRelationshipDescription;
            if (rel.inverseRelationship == null) continue;
            
            switch (rel.deleteRule) 
            {
                case NSDeleteRule.cascadeDeleteRule: this.deleteByCascade(rel); break;
                case NSDeleteRule.nullifyDeleteRule: this.deleteByNullify(rel); break;
                default: break
            }
        }
    }

    private deleteByNullify(relationship: NSRelationshipDescription){
        
        let visited = new NSSet();
        visited.addObject(this);
        if (relationship.isToMany == false) {
            let obj = this.valueForKey(relationship.name) as NSManagedObject;
            if (obj == null || obj.isDeleted == false) return;
            obj._nullify_inverse_relation(relationship.inverseRelationship, this, visited);
        }
        else {
            let objects = this.valueForKey(relationship.name) as NSManagedObjectSet;
            for (let index = 0; index < objects.count; index++){
                let obj = objects.objectAtIndex(index);
                if (obj.isDeleted == false) obj._nullify_inverse_relation(relationship.inverseRelationship, this, visited);
            }
        }
    }
    
    private _nullify_inverse_relation (relationship: NSRelationshipDescription, obj: NSManagedObject, visited: NSSet) {
        if (relationship.isToMany == false) {            
            this.setValueForKey(null, relationship.name, visited);
        }
        else {
            this._removeObjectForKey(obj, relationship.name, visited);
        }
    }

    
    private deleteByCascade(relationship: NSRelationshipDescription) {

        if (relationship.isToMany == false) {
            let obj = this.valueForKey(relationship.name) as NSManagedObject;
            if (obj == null || obj.isDeleted == false) return;
            this.managedObjectContext.deleteObject(obj);
        }
        else {
            let objects = this.valueForKey(relationship.name) as NSManagedObjectSet;
            for (let index = 0; index < objects.count; index++){
                let obj = objects.objectAtIndex(index);
                if (obj.isDeleted == false) this.managedObjectContext.deleteObject(obj);
                this._removeObjectForKey(obj, relationship.name)
            }
        }
    }
    

    // private deleteFromInverseRelationships(){

    //     let relationships = this.entity.relationshipsByName;
    //     for (let relName in relationships) {
    //         let rel = relationships[relName] as NSRelationshipDescription;
    //         if (rel.inverseRelationship != null) {
    //             let value = this.valueForKey(relName);
    //             if (value == null) return;
    //             if (value instanceof NSManagedObject) {
    //                 let object = value as NSManagedObject;
    //                 let parentRelationship = object.entity.relationshipsByName[rel.inverseRelationship.name];
    //                 if (parentRelationship.isToMany == false){
    //                     object.setValueForKey(null, rel.inverseRelationship.name);
    //                 }
    //                 else {
    //                     object._removeObjectForKey(this, rel.inverseRelationship.name);
    //                 }
    //             }
    //             // else if (value instanceof NSManagedObjectSet){
                    
    //             // }                
    //         }
    //     }
    // }
}
