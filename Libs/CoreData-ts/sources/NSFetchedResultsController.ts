
import { NSObject, NotificationCenter, Notification, NSSet, IndexPath, _NSSortDescriptorSortObjects } from "foundation";
import { NSFetchRequest } from "./NSFetchRequest";
import { NSManagedObjectContext, NSManagedObjectContextDidSaveNotification, NSManagedObjectContextObjectsDidChange, NSUpdatedObjectsKey, NSInsertedObjectsKey, NSDeletedObjectsKey, NSRefreshedObjectsKey } from "./NSManagedObjectContext";
import { NSManagedObject } from "./NSManagedObject";
import { NSManagedObjectModel } from "./NSManagedObjectModel"
import { NSEntityDescription } from "./NSEntityDescription";

/**
 * Created by godshadow on 12/4/16.
 */

export enum NSFetchedResultsChangeType {
    Insert,
    Delete,
    Update,
    Move
}

export interface NSFetchedResultsControllerDelegate {
    controllerWillChangeContent?(controller:NSFetchedResultsController);
    controllerDidChangeContent?(controller:NSFetchedResultsController);

    controllerDidChangeSection?(controller:NSFetchedResultsController, sectionInfo, sectionIndex, changeType:NSFetchedResultsChangeType);
    controllerDidChangeObject?(controller:NSFetchedResultsController, object, indexPath:IndexPath, changeType:NSFetchedResultsChangeType, newIndexPath:IndexPath);
}

export class NSFetchSection extends NSObject
{
    objects = [];

    numberOfObjects(){
        return this.objects.length;
    }
}

export class NSFetchedResultsController extends NSObject
{
    sections = [];
    
    fetchRequest:NSFetchRequest = null;
    managedObjectContext:NSManagedObjectContext  = null;
    sectionNameKeyPath = null;
    fetchEntity:NSEntityDescription = null;
    
    // private registerObjects = {};
    private registerObjects = {};

    initWithFetchRequest(request, managedObjectContext, sectionNameKeyPath?){
        this.fetchRequest = request;
        this.managedObjectContext = managedObjectContext;
        this.sectionNameKeyPath = sectionNameKeyPath;        
    }

    private _delegate:NSFetchedResultsControllerDelegate = null;
    get delegate():NSFetchedResultsControllerDelegate{
        return this._delegate;
    }
    set delegate(delegate:NSFetchedResultsControllerDelegate){
        this._delegate = delegate;

        // TODO: Add and remove notification observer

        if (delegate != null) {
            NotificationCenter.defaultCenter().addObserver(this, NSManagedObjectContextDidSaveNotification, function(this:NSFetchedResultsController, notification:Notification){

                let moc:NSManagedObjectContext = notification.object;
                if (moc !== this.managedObjectContext) return;
                
                let entityName = this.fetchRequest.entityName;

                let ins_objs = this.objectsFromEntitiesAndSubentities(entityName, notification.userInfo[NSInsertedObjectsKey]);
                let upd_objs = this.objectsFromEntitiesAndSubentities(entityName, notification.userInfo[NSUpdatedObjectsKey]);
                let del_objs = this.objectsFromEntitiesAndSubentities(entityName, notification.userInfo[NSDeletedObjectsKey]);

                if (ins_objs.length > 0 || upd_objs.length > 0 || del_objs.length > 0)
                     this.updateContent(ins_objs, upd_objs, del_objs);
            });

            NotificationCenter.defaultCenter().addObserver(this, NSManagedObjectContextObjectsDidChange, function(this:NSFetchedResultsController, notification:Notification) {

                let moc:NSManagedObjectContext = notification.object;
                if (moc !== this.managedObjectContext) return;

                let refreshed = notification.userInfo[NSRefreshedObjectsKey];
                if (refreshed == null) return;
                let entityName = this.fetchRequest.entityName;

                let objects = this.objectsFromEntitiesAndSubentities(entityName, refreshed);
                this.refreshObjects(objects);
            });
        }
        else {
            NotificationCenter.defaultCenter().removeObserver(this, NSManagedObjectContextDidSaveNotification);
            NotificationCenter.defaultCenter().removeObserver(this, NSManagedObjectContextObjectsDidChange);
        }
    }

    private checkEntity(entityName:string, fetchEntityName:string) : boolean {
        if (entityName == fetchEntityName) return true;

        let entity = NSManagedObjectModel.entityForNameInManagedObjectContext(entityName, this.managedObjectContext);
        if (entity.superentity == null) return false;        

        return this.checkEntity(entity.superentity.name, fetchEntityName);
    }

    private objectsFromEntitiesAndSubentities(entityName:string, entities:any){        
        let objects:NSSet = new NSSet();
        if (entities == null) return objects;

        for (let key in entities) {
            if (this.checkEntity(key, entityName) == false) continue;            
            let objs = entities[key];
            if (objs instanceof NSSet) objs = objs.allObjects;
            for (let i = 0; i < objs.length; i++) objects.addObject(objs[i]);
        }
                
        return objects;
    }

    // TODO: Replace resultObjects to fetchedObjects
    resultObjects = [];
    get fetchedObjects(){
        return this.resultObjects;
    }

    performFetch(){
        this.registerObjects = {};
        this.changeObjects = {};
        this.objects2sections = {};

        this.resultObjects = this.managedObjectContext.executeFetch(this.fetchRequest);
        this._splitInSections();

        return this.resultObjects;
    }

    private processObject(object:NSManagedObject, result:boolean){

        if (result == true) {
            let ref = object.objectID._getReferenceObject();
            if (this.registerObjects[ref] == null){
                this.resultObjects.push(object);
                this.registerObjects[ref] = object;
                this.changeObjects[ref] = {"Object": object, "ChangeType": NSFetchedResultsChangeType.Insert};                
            }
            else {
                this.changeObjects[ref] = {"Object": object, "IndexPath": this.indexPathForObject(object), "ChangeType": NSFetchedResultsChangeType.Update};                
            }    
        }
        else {
            let ref = object.objectID._getReferenceObject();
            if (this.registerObjects[ref] != null){
                this.resultObjects.removeObject(object);
                delete this.registerObjects[ref];
                this.changeObjects[ref] = {"Object": object, "IndexPath": this.indexPathForObject(object), "ChangeType": NSFetchedResultsChangeType.Delete};                
            }
        }
    }

    private checkObjects(objects){
        let predicate = this.fetchRequest.predicate;        
        for (let count = 0; count < objects.length; count++){
            let obj = objects.objectAtIndex(count);
            if (predicate != null) {
                let result = predicate.evaluateObject(obj);
                this.processObject(obj, result);
            }
            else {
                this.processObject(obj, true);
            }
        }        
    }

    private refreshObjects(objects:NSSet){ 
        if (objects.count == 0) return;

        this.changeObjects = {};

        this.checkObjects(objects);
        this.resultObjects = _NSSortDescriptorSortObjects(this.resultObjects, this.fetchRequest.sortDescriptors);
        this._splitInSections();
        this._notify();
    }

    private changeObjects = {};

    private updateContent(inserted:NSSet, updated:NSSet, deleted:NSSet){
        
        this.changeObjects = {};

        this.checkObjects(inserted);
        this.checkObjects(updated);        
                
        // Process inserted objects        
        // for(var i = 0; i < inserted.length; i++) {
        //     let o = inserted[i];
        //     this.resultObjects.push(o);
        // }

        // Process updated objects
        // TODO: Check if the sort descriptor keys changed. If not do nothing becuse the objects are already
        //       in the fetched objects array

        // Process delete objects
        for(let i = 0; i < deleted.count; i++) {
            let o = deleted.objectAtIndex(i);
            let index = this.resultObjects.indexOf(o);
            if (index != -1){
                this.resultObjects.splice(index, 1);
                let ref = o.objectID._getReferenceObject();
                delete this.registerObjects[ref];
                this.changeObjects[ref] = {"Object": o, "IndexPath": this.indexPathForObject(o), "ChangeType": NSFetchedResultsChangeType.Delete};                
            }
        }        

        this.resultObjects = _NSSortDescriptorSortObjects(this.resultObjects, this.fetchRequest.sortDescriptors);        
        this._splitInSections();
        this._notify();
    }

    private _notify(){
        if (this._delegate == null) return;
        
        if (typeof this._delegate.controllerWillChangeContent === "function")
            this._delegate.controllerWillChangeContent(this);

        for (let sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++){
            let sectionInfo = this.sections[sectionIndex];
            if (typeof this._delegate.controllerDidChangeSection === "function")
                this._delegate.controllerDidChangeSection(this, sectionInfo, sectionIndex, NSFetchedResultsChangeType.Insert);

            if (typeof this._delegate.controllerDidChangeObject === "function") {                    

                for (let ref in this.changeObjects) {
                    let item = this.changeObjects[ref];
                    let obj = item["Object"];
                    let indexPath = item["IndexPath"] as IndexPath;
                    let newIndexPath = item["NewIndexPath"] as IndexPath;
                    let changeType = item["ChangeType"] as NSFetchedResultsChangeType;
                    if (indexPath != null && newIndexPath != null && indexPath.isEqualToIndexPath(newIndexPath)) newIndexPath = null;                    
                    this._delegate.controllerDidChangeObject(this, obj, indexPath, changeType, newIndexPath);
                }

                // let items = sectionInfo.objects;
                // for (let index = 0; index < items.length; index++) {
                //     let obj = items[index];
                //     let newIndexPath = NSIndexPath.indexForRowInSection(index, sectionIndex);
                //     this._delegate.controllerDidChangeObject(this, obj, null, NSFetchedResultsChangeType.Insert, newIndexPath);
                // }
            }
        }

        if (typeof this._delegate.controllerDidChangeContent === "function")
            this._delegate.controllerDidChangeContent(this);
    }

    indexPathForObject(object:NSManagedObject):IndexPath {
        let ref = object.objectID._getReferenceObject();
        let section = this.objects2sections[ref];
        if (section == null) return null;

        let sectionIndex = this.sections.indexOf(section);
        let rowIndex = section.objects.indexOf(object);

        if (rowIndex == -1) return null;

        return IndexPath.indexForRowInSection(rowIndex, sectionIndex);
    }
    
    private objects2sections = {};
    private _splitInSections(){
        this.sections = [];
        this.objects2sections = {};

        if (this.sectionNameKeyPath == null){
            let section = new NSFetchSection();
            //section.objects = this.resultObjects;
            for (let index = 0; index < this.resultObjects.length; index++){
                let obj:NSManagedObject = this.resultObjects[index];                
                // Cache to for checking updates
                let ref = obj.objectID._getReferenceObject();
                this.registerObjects[ref] = obj;  
                section.objects.push(obj); 
                this.objects2sections[ref] = section;

                if (this.changeObjects[ref] != null) {
                    let item = this.changeObjects[ref];
                    item["NewIndexPath"] = IndexPath.indexForRowInSection(index, 0);
                }
            }

            this.sections.push(section);
        }
        else{
            let currentSection = null;
            let currentSectionKeyPathValue = null;

            if (this.resultObjects.length == 0) return;

            // Set first object
            let firstObj:NSManagedObject = this.resultObjects[0];
            currentSection = new NSFetchSection();
            this.sections.push(currentSection);
            currentSectionKeyPathValue = firstObj.valueForKeyPath(this.sectionNameKeyPath); 
            // Cache to for checking updates
            // let reference = firstObj.objectID._getReferenceObject();
            // this.registerObjects[reference] = firstObj;
            // currentSection.objects.push(firstObj);
            // this.objects2sections[reference] = currentSection;
            let rowIndex = 0;
            for (let index = 0; index < this.resultObjects.length; index++){
                let obj:NSManagedObject = this.resultObjects[index];
                // Cache to for checking updates
                let ref = obj.objectID._getReferenceObject();
                this.registerObjects[ref] = obj;

                let value = obj.valueForKeyPath(this.sectionNameKeyPath);          

                if (currentSectionKeyPathValue != value) {
                    currentSection = new NSFetchSection();
                    this.sections.push(currentSection);
                    currentSectionKeyPathValue = value;
                    rowIndex = 0;
                }

                currentSection.objects.push(obj);
                this.objects2sections[ref] = currentSection;

                if (this.changeObjects[ref] != null) {
                    let item = this.changeObjects[ref];
                    let sectionIndex = this.sections.indexOf(currentSection);
                    item["NewIndexPath"] = IndexPath.indexForRowInSection(rowIndex, sectionIndex);
                }

                rowIndex++;
            }
        }
    }

    objectAtIndexPath(indexPath:IndexPath){
        let section = this.sections[indexPath.section];
        let object = section.objects[indexPath.row];
        return object;
    }

}
