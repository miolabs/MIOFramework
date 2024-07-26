
import { NSObject, NSClassFromString } from "foundation";
import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSManagedObject } from "./NSManagedObject";
import { NSManagedObjectModel } from "./NSManagedObjectModel";
import { NSPersistentStore } from "./NSPersistentStore";

export class NSPersistentStoreCoordinator extends NSObject
{
    private _managedObjectModel:NSManagedObjectModel = null;
    get managedObjectModel() { return this._managedObjectModel;}

    private _storesByIdentifier: { [key:string] : NSPersistentStore } = {};
    private _stores: NSPersistentStore[] = [];    
    get persistentStores() {return this._stores;}
    static _storeClasses: { [key:string] : string } = {};

    static registerStoreClassForStoreType(storeClass:string, storeType:string){
        NSPersistentStoreCoordinator._storeClasses[storeType] = storeClass;
    }

    initWithManagedObjectModel(model:NSManagedObjectModel) {
        super.init();
        this._managedObjectModel = model;
    }

    addPersistentStoreWithType(type:string, configuration:string, url:URL, options:any){
    
        if (type == null) {
            //TODO: Check the configuration type from store metada
            throw new Error("NSPersistentStoreCoordinator: Unimplemeted method with type null");
        }

        let className = NSPersistentStoreCoordinator._storeClasses[type];
        if (className == null) throw new Error("NSPersistentStoreCoordinator: Unkown persistent store type.");
        
        var ps:NSPersistentStore = NSClassFromString(className);
        ps.initWithPersistentStoreCoordinator(this, configuration, url, options);
        
        this._storesByIdentifier[ps.identifier] = ps;
        this._stores.addObject(ps);
        ps.didAddToPersistentStoreCoordinator(this);

        return ps;
    }

    removePersistentStore(store:NSPersistentStore){
        store.willRemoveFromPersistentStoreCoordinator(this);
        delete this._storesByIdentifier[store.identifier];
        this._stores.removeObject(store);
    }

    managedObjectIDForURIRepresentation(url:URL):NSManagedObjectID{
        let scheme:string = url.protocol; // url.scheme;
        let host:string = url.host;
        let path:string = url.pathname; // url.path;
        let reference:string = path.lastPathComponent();
        let entityName:string = path.stringByDeletingLastPathComponent().lastPathComponent();
        let model:NSManagedObjectModel = this.managedObjectModel;
        let entity:NSEntityDescription = model.entitiesByName[entityName];

        return this._persistentStoreWithIdentifier(host)._objectIDForEntity(entity, reference);
    }

    _persistentStoreWithIdentifier(identifier:string) {
        if (identifier == null) return null;
        return this._storesByIdentifier[identifier];
    }

    _persistentStoreForObjectID(objectID:NSManagedObjectID):NSPersistentStore{
        
        if (this._stores.length == 0) throw new Error("NSPersistentStoreCoordinator: There's no stores!");
        
        let entity = objectID.entity;
        var storeIdentifier = objectID._getStoreIdentifier();
        let store = this._persistentStoreWithIdentifier(storeIdentifier);
        
        if (store != null) return store;        

        let model = this.managedObjectModel;

        for (var index = 0; index < this._stores.length; index++){
            let store:NSPersistentStore = this._stores[index];
            let configurationName = store.configurationName;

            if (configurationName != null){
                console.log("NSPersistentStoreCoordinator: Configuration name not implemented");
                let entities = []; //model.entitiesForConfiguration(configurationName);
                for (var name in entities) {
                    var checkEntity = entities[name];
                    if (checkEntity === entity) return checkEntity;
                }
            }
        }

        return this._stores[0];
        
    }

    _persistentStoreForObject(object:NSManagedObject):NSPersistentStore{
        return this._persistentStoreForObjectID(object.objectID);    
    }
}
