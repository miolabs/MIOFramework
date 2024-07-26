import { NSObject, NSSet, NotificationCenter, _NSPredicateFilterObjects, _NSSortDescriptorSortObjects, Notification, NSClassFromString } from "foundation";
import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSManagedObject } from "./NSManagedObject";
import { NSManagedObjectSet } from "./NSManagedObjectSet";
import { NSIncrementalStore } from "./NSIncrementalStore";
import { NSIncrementalStoreNode } from "./NSIncrementalStoreNode";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSFetchRequest } from "./NSFetchRequest";
import { NSPersistentStoreCoordinator } from "./NSPersistentStoreCoordinator";
import { NSPersistentStore } from "./NSPersistentStore";
import { NSSaveChangesRequest } from "./NSSaveChangesRequest";

/**
 * Created by godshadow on 12/4/16.
 */

export let NSManagedObjectContextWillSaveNotification = "NSManagedObjectContextWillSaveNotification";
export let NSManagedObjectContextDidSaveNotification = "NSManagedObjectContextDidSaveNotification";
export let NSManagedObjectContextObjectsDidChange = "NSManagedObjectContextObjectsDidChange";

export let NSInsertedObjectsKey = "NSInsertedObjectsKey";
export let NSUpdatedObjectsKey = "NSUpdatedObjectsKey";
export let NSDeletedObjectsKey = "NSDeletedObjectsKey";
export let NSRefreshedObjectsKey = "NSRefreshedObjectsKey";

export enum NSManagedObjectContextConcurrencyType {
    PrivateQueue,
    MainQueue
}

export enum NSMergePolicy {
    None
}

export class NSManagedObjectContext extends NSObject {
    persistentStoreCoordinator: NSPersistentStoreCoordinator = null;

    concurrencyType = NSManagedObjectContextConcurrencyType.MainQueue;
    mergePolicy = "";

    private _parent: NSManagedObjectContext = null;

    // private managedObjectChanges = {};

    private objectsByEntity: { [key:string] : any[] } = {};
    private objectsByID : { [key:string] : any } = {};

    private insertedObjects: NSManagedObjectSet = new NSManagedObjectSet(); //= NSSet.set();
    private updatedObjects: NSManagedObjectSet = new NSManagedObjectSet(); //= NSSet.set();
    private deletedObjects: NSManagedObjectSet = new NSManagedObjectSet(); //= NSSet.set();

    private blockChanges:{ [key:string] : any } = null;

    initWithConcurrencyType(type: NSManagedObjectContextConcurrencyType) {
        super.init();
        this.concurrencyType = type;
    }

    set parent(value: NSManagedObjectContext) {
        this._parent = value;
        if (value != null) {
            this.persistentStoreCoordinator = value.persistentStoreCoordinator;
        }
    }
    get parent() { return this._parent; }

    
    private registerObjects : NSManagedObject[] = [];
    private _registerObject(object: NSManagedObject) {

        if (this.objectsByID[object.objectID.URIRepresentation.absoluteString] != null) return;

        this.registerObjects.addObject(object);
        this.objectsByID[object.objectID.URIRepresentation.absoluteString] = object;

        // let entityName = object.entity.name;
        // let array = this.objectsByEntity[entityName];
        // if (array == null) {
        //     array = [];
        //     this.objectsByEntity[entityName] = array;
        // }
        // array.addObject(object);

        this._registerObjectForEntity(object, object.entity);

        if (object.objectID.persistentStore instanceof NSIncrementalStore){
            let is = object.objectID.persistentStore as NSIncrementalStore;
            is.managedObjectContextDidRegisterObjectsWithIDs([object.objectID]);
        }        
    }

    private _registerObjectForEntity(object:NSManagedObject, entity:NSEntityDescription) {        
        let entityName = entity.name;
        let array = this.objectsByEntity[entityName];
        if (array == null) {
            array = [];
            this.objectsByEntity[entityName] = array;
        }
        array.addObject(object);
        
        if (entity.superentity != null) this._registerObjectForEntity(object, entity.superentity);
    }

    private _unregisterObject(object: NSManagedObject) {
        this.registerObjects.removeObject(object);
        delete this.objectsByID[object.objectID.URIRepresentation.absoluteString];

        let entityName = object.entity.name;
        let array = this.objectsByEntity[entityName];
        if (array != null) {
            array.removeObject(object);
        }        

        if (object.objectID.persistentStore instanceof NSIncrementalStore){
            let is = object.objectID.persistentStore as NSIncrementalStore;
            is.managedObjectContextDidUnregisterObjectsWithIDs([object.objectID]);
        }        
        
    }

    insertObject(object: NSManagedObject) {
        if (this.insertedObjects.containsObject(object)) return;

        let store = this.persistentStoreCoordinator._persistentStoreForObject(object);
        let objectID = object.objectID;

        objectID._setStoreIdentifier(store.identifier);
        objectID._setPersistentStore(store);

        if (this.updatedObjects.containsObject(object)) { this.updatedObjects.removeObject(object); }

        this.insertedObjects.addObject(object);
        this._registerObject(object);
        object._setIsInserted(true);
    }

    updateObject(object: NSManagedObject) {
        if (this.updatedObjects.containsObject(object)) return;        
        if (this.insertedObjects.containsObject(object)) return;
        if (this.deletedObjects.containsObject(object)) return;
        this.updatedObjects.addObject(object);
        object._setIsUpdated(true);
    }

    deleteObject(object: NSManagedObject) {
        if (this.deletedObjects.containsObject(object)) { return; }
        if (this.updatedObjects.containsObject(object)) { this.updatedObjects.removeObject(object); }
        
        this.insertedObjects.removeObject(object);
        object._setIsInserted(false);
        this.updatedObjects.removeObject(object);
        object._setIsUpdated(false);
        this.deletedObjects.addObject(object);
        object._setIsDeleted(true);
        //this._unregisterObject(object);
    }

    _objectWithURIRepresentationString(urlString:string){
        return this.objectsByID[urlString];
    }

    objectWithID(objectID: NSManagedObjectID) {

        let obj:NSManagedObject = this.objectsByID[objectID.URIRepresentation.absoluteString];
        if (obj == null) {
            obj = NSClassFromString(objectID.entity.managedObjectClassName);
            obj._initWithObjectID(objectID, this);  
            this._registerObject(obj);               
        }
        return obj;
    }

    existingObjectWithID(objectID: NSManagedObjectID): NSManagedObject {

        let obj: NSManagedObject = this.objectsByID[objectID.URIRepresentation.absoluteString];

        let store:NSIncrementalStore = objectID.persistentStore as NSIncrementalStore;
        let node:NSIncrementalStoreNode = store._nodeForObjectID(objectID, this);

        if (obj != null && node != null){
            obj._setIsFault(true);
        }
        else if (obj == null && node != null){
            obj = NSClassFromString(objectID.entity.managedObjectClassName);
            obj._initWithObjectID(objectID, this);
            this._registerObject(obj);
        }

        return obj;
    }

    refreshObject(object: NSManagedObject, mergeChanges: boolean) {

        if (mergeChanges == false) return;

        if (object.isFault == false) return;

        let changes :{ [key:string]:any} = null;
        if (this.blockChanges != null) {
            changes = this.blockChanges;
        }
        else {
            changes = {};
            changes[NSRefreshedObjectsKey] = {};
        }

        let entityName = object.entity.name;
        let objs = changes[NSRefreshedObjectsKey];

        let set = objs[entityName];
        if (set == null) {
            set = NSSet.set();
            objs[entityName] = set;
        }

        set.addObject(object);

        if (this.blockChanges == null) {
            //this.persistentStoreCoordinator.updateObjectWithObjectID(object.objectID, this); 
            //object.isFault = false;           
            NotificationCenter.defaultCenter().postNotification(NSManagedObjectContextObjectsDidChange, this, changes);
        }
    }

    private addObjectToTracking(objectTracking: any, object: NSManagedObject) {
        let array = objectTracking[object.entity.name];
        if (array == null) {
            array = [];
            objectTracking[object.entity.name] = array;
        }
        array.push(object);
    }

    private removeObjectFromTracking(objectTracking: any, object: NSManagedObject) {
        let array = objectTracking[object.entity.name];
        if (array == null) return;
        let index = array.indexOf(object);
        if (index > -1) array.splice(index, 1);
    }

    removeAllObjectsForEntityName(entityName : string) {
        let objs = this.objectsByEntity[entityName];
        if (objs != null) {
            for (let index = objs.length - 1; index >= 0; index--) {
                let o = objs[index];
                this.deleteObject(o);
            }
        }
    }

    executeFetch(request : any) {

        let entityName = request.entityName;
        let entity = NSEntityDescription.entityForNameInManagedObjectContext(entityName, this);
        request.entity = entity;

        //TODO: Get the store from configuration name
        let store: NSPersistentStore = this.persistentStoreCoordinator.persistentStores[0];
        let objs = store._executeRequest(request, this);

        for (let index = 0; index < objs.length; index++) {
            let o = objs[index];
            this._registerObject(o);
        }

        if (request instanceof NSFetchRequest) {
            let fetchRequest = request as NSFetchRequest;
            let objects = _NSPredicateFilterObjects(this.objectsByEntity[entityName], fetchRequest.predicate);
            objects = _NSSortDescriptorSortObjects(objects, fetchRequest.sortDescriptors);
            return objects;
        }

        return [];
    }

    _obtainPermanentIDForObject(object: NSManagedObject) {
        let store: NSPersistentStore = object.objectID.persistentStore;
        let objID = store._obtainPermanentIDForObject(object);

        delete this.objectsByID[object.objectID.URIRepresentation.absoluteString];

        object.objectID._setReferenceObject(objID._getReferenceObject());

        this.objectsByID[object.objectID.URIRepresentation.absoluteString] = object;
    }

    save() {

        // Check if nothing changed... to avoid unnecessay methods calls
        if (this.insertedObjects.length == 0 && this.updatedObjects.length == 0 && this.deletedObjects.length == 0) return;

        // There's changes, so keep going...
        NotificationCenter.defaultCenter().postNotification(NSManagedObjectContextWillSaveNotification, this);

        // Deleted objects
        let deletedObjectsByEntityName: { [key:string] : NSManagedObject[] }  = {};
        for (let index = 0; index < this.deletedObjects.count; index++) {
            let delObj: NSManagedObject = this.deletedObjects.objectAtIndex(index);

            // Track object for save notification
            let entityName = delObj.entity.name;
            let array = deletedObjectsByEntityName[entityName];
            if (array == null) {
                array = [];
                deletedObjectsByEntityName[entityName] = array;
            }
            array.addObject(delObj);
        }

        // Inserted objects
        let insertedObjectsByEntityName: { [key:string] : NSManagedObject[] }  = {};
        for (let index = 0; index < this.insertedObjects.count; index++) {
            let insObj: NSManagedObject = this.insertedObjects.objectAtIndex(index);

            this._obtainPermanentIDForObject(insObj);

            // Track object for save notification
            let entityName = insObj.entity.name;
            let array = insertedObjectsByEntityName[entityName];
            if (array == null) {
                array = [];
                insertedObjectsByEntityName[entityName] = array;
            }
            array.addObject(insObj);
        }

        // Updated objects
        let updatedObjectsByEntityName: { [key:string] : NSManagedObject[] }  = {};
        for (let index = 0; index < this.updatedObjects.count; index++) {
            let updObj: NSManagedObject = this.updatedObjects.objectAtIndex(index);

            // Track object for save notification
            let entityName = updObj.entity.name;
            let array = updatedObjectsByEntityName[entityName];
            if (array == null) {
                array = [];
                updatedObjectsByEntityName[entityName] = array;
            }
            array.addObject(updObj);
        }

        if (this.parent == null) {
            // Save to persistent store
            let saveRequest = new NSSaveChangesRequest();
            saveRequest.initWithObjects(this.insertedObjects, this.updatedObjects, this.deletedObjects);
            //TODO: Execute save per store configuration            
            let store: NSPersistentStore = this.persistentStoreCoordinator.persistentStores[0];
            store._executeRequest(saveRequest, this);

            //Clear values
            for (let index = 0; index < this.insertedObjects.count; index++) {
                let obj: NSManagedObject = this.insertedObjects.objectAtIndex(index);
                obj._didCommit();
            }

            for (let index = 0; index < this.updatedObjects.count; index++) {
                let obj: NSManagedObject = this.updatedObjects.objectAtIndex(index);
                obj._didCommit();
            }

            for (let index = 0; index < this.deletedObjects.count; index++) {
                let obj: NSManagedObject = this.deletedObjects.objectAtIndex(index);
                obj._didCommit();
                this._unregisterObject(obj);
            }

            // Clear
            this.insertedObjects = new NSManagedObjectSet(); //NSSet.set();
            this.updatedObjects = new NSManagedObjectSet(); //NSSet.set();
            this.deletedObjects = new NSManagedObjectSet(); //NSSet.set();
        }

        let objsChanges : { [key:string] : any}  = {};
        objsChanges[NSInsertedObjectsKey] = insertedObjectsByEntityName;
        objsChanges[NSUpdatedObjectsKey] = updatedObjectsByEntityName;
        objsChanges[NSDeletedObjectsKey] = deletedObjectsByEntityName;

        let noty = new Notification(NSManagedObjectContextDidSaveNotification, this, objsChanges);
        if (this.parent != null) {
            this.parent.mergeChangesFromContextDidSaveNotification(noty);
        }

        NotificationCenter.defaultCenter().postNotification(NSManagedObjectContextDidSaveNotification, this, objsChanges);
    }

    mergeChangesFromContextDidSaveNotification(notification: Notification) {

        let insertedObjects = notification.userInfo[NSInsertedObjectsKey];
        let updateObjects = notification.userInfo[NSUpdatedObjectsKey];
        let deletedObjects = notification.userInfo[NSDeletedObjectsKey];

        // Inserted objects        
        for (let entityName in insertedObjects) {
            let ins_objs = insertedObjects[entityName];

            // save changes and add to context
            let array = this.insertedObjects[entityName];
            if (array == null) {
                array = [];
                this.insertedObjects[entityName] = array;
            }

            for (let i = 0; i < ins_objs.length; i++) {
                let o = ins_objs[i];
                let index = array.indexOf(o);
                if (index == -1)
                    array.push(o);
            }
        }

        // Update objects
        for (let entityName in updateObjects) {
            var upd_objs = updateObjects[entityName];

            let array = this.updatedObjects[entityName];
            if (array == null) {
                array = [];
                this.updatedObjects[entityName] = array;
            }

            for (let i = 0; i < upd_objs.length; i++) {
                let o = upd_objs[i];
                let index = array.indexOf(o);
                if (index == -1)
                    array.push(o);
            }
        }

        // Delete objects
        for (let entityName in deletedObjects) {
            let del_objs = deletedObjects[entityName];

            let array = this.deletedObjects[entityName];
            if (array == null) {
                array = [];
                this.deletedObjects[entityName] = array;
            }

            for (let i = 0; i < del_objs.length; i++) {
                let o = del_objs[i];
                let index = array.indexOf(o);
                if (index == -1)
                    array.push(o);
            }
        }
    }

    performBlockAndWait(target:any, block:any) {

        this.blockChanges = {};
        this.blockChanges[NSInsertedObjectsKey] = {};
        this.blockChanges[NSUpdatedObjectsKey] = {};
        this.blockChanges[NSDeletedObjectsKey] = {};
        this.blockChanges[NSRefreshedObjectsKey] = {};

        block.call(target);

        // Refresed block objects
        let refresed = this.blockChanges[NSRefreshedObjectsKey];
        //this.refreshObjectsFromStore(refresed);

        NotificationCenter.defaultCenter().postNotification(NSManagedObjectContextObjectsDidChange, this, this.blockChanges);
        this.blockChanges = null;
    }

    reset(){
        let pss = {};
        
        for (let key in this.objectsByID){
            let obj:NSManagedObject = this.objectsByID[key];
            
            let arr = pss[obj.objectID.persistentStore.identifier];
            if (arr == null) {
                arr = [];
                pss[obj.objectID.persistentStore.identifier] = arr;
            }

            arr.addObject(obj.objectID);
            obj._didCommit();
        }        

        for (let index = 0; index < this.persistentStoreCoordinator.persistentStores.length; index++){
            let ps = this.persistentStoreCoordinator.persistentStores[index];
            let objs = pss[ps.identifier];
            if (objs == null || objs.length == 0) continue;

            if (ps instanceof NSIncrementalStore){
                let is = ps as NSIncrementalStore;
                is.managedObjectContextDidUnregisterObjectsWithIDs(objs);
            }                        
        }        
        
        this.registerObjects = [];
        this.objectsByID = {};
        this.objectsByEntity = {};
        
        this.insertedObjects = new NSManagedObjectSet(); //NSSet.set();
        this.updatedObjects = new NSManagedObjectSet(); //NSSet.set();
        this.deletedObjects = new NSManagedObjectSet(); //NSSet.set();        
    }

}

