import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSPersistentStoreRequest } from "./NSPersistentStoreRequest";
import { NSRelationshipDescription } from "./NSRelationshipDescription";
import { NSPersistentStore } from "./NSPersistentStore";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSManagedObjectContext } from "./NSManagedObjectContext";
import { NSIncrementalStoreNode } from "./NSIncrementalStoreNode";
import { NSManagedObject } from "./NSManagedObject";

export class NSIncrementalStore extends NSPersistentStore {
    
    //
    // Can't be overriden 
    //

    newObjectIDForEntity(entity: NSEntityDescription, referenceObject: string): NSManagedObjectID {

        if (entity == null) throw new Error("NSIncrementalStore: Trying to create and object ID with NULL entity");

        let objID = NSManagedObjectID._objectIDWithEntity(entity, referenceObject);
        objID._setPersistentStore(this);
        objID._setStoreIdentifier(this.identifier);
        
        console.log("New REFID: " + referenceObject);

        return objID;
    }

    referenceObjectForObjectID(objectID: NSManagedObjectID) {
        return objectID._getReferenceObject();
    }

    //
    // Could be overriden
    //

    executeRequest(request: NSPersistentStoreRequest, context: NSManagedObjectContext): any[] {
        return [];
    }

    newValuesForObjectWithID(objectID: NSManagedObjectID, context: NSManagedObjectContext): NSIncrementalStoreNode {
        return null;
    }

    newValueForRelationship(relationship: NSRelationshipDescription, objectID: NSManagedObjectID, context?: NSManagedObjectContext): any {
        return null;
    } 

    obtainPermanentIDsForObjects(objects: any[]){        
        var array:any[] = [];
        for(var index = 0; index < objects.length; index++){
            let obj = objects[index];
            array.addObject(obj.objectID);
        }

        return array;
    }

    managedObjectContextDidRegisterObjectsWithIDs(objectIDs:any){}    
    managedObjectContextDidUnregisterObjectsWithIDs(objectIDs:any){}

    //
    // Methods only to be call by the framework
    //

    _executeRequest(request: NSPersistentStoreRequest, context: NSManagedObjectContext) {
        return this.executeRequest(request, context);
    }

    _obtainPermanentIDForObject(object:NSManagedObject) {
        return this.obtainPermanentIDsForObjects([object])[0];
    }

    _nodeForObjectID(objectID:NSManagedObjectID, context:NSManagedObjectContext):NSIncrementalStoreNode {
        return this.newValuesForObjectWithID(objectID, context);        
    }

    _objectIDForEntity(entity:NSEntityDescription, referenceObject:string){
        // TODO:Check if already exits
        return this.newObjectIDForEntity(entity, referenceObject);
    }

    _fetchObjectWithObjectID(objectID:NSManagedObjectID, context:NSManagedObjectContext){
        // TODO: Make an normal query with object ID
        // HACK: Now I override in subclass, not compatible with iOS
    }
}