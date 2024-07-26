import { NSObject, UUID, NSLog } from "foundation";
import { NSPersistentStore } from "./NSPersistentStore";
import { NSEntityDescription } from "./NSEntityDescription";

export class NSManagedObjectID extends NSObject {
        
    private _entity:NSEntityDescription = null;
    get entity():NSEntityDescription{return this._entity;}

    private _isTemporaryID = false;
    get isTemporaryID():boolean {return this._isTemporaryID;}
    
    private _persistentStore:NSPersistentStore = null;
    get persistentStore():NSPersistentStore{return this._persistentStore;}
    
    get URIRepresentation():URL {
        let path = this.entity.name.stringByAppendingPathComponent(this._referenceObject);
        let host = this._isTemporaryID ? "" : this._storeIdentifier;
        
        var url = new URL("x-coredata://" + host + "/" + path);
        //url.initWithScheme("x-coredata", host, path);
        
        return url;
    }

    // #region Private methods    

    static _objectIDWithEntity(entity:NSEntityDescription, referenceObject?:string) {
        let objID = new NSManagedObjectID();
        objID._initWithEntity(entity, referenceObject);
        return objID;
    }

    static _objectIDWithURIRepresentation(url:URL){
        let objID = new NSManagedObjectID();
        objID._initWithURIRepresentation(url);
        return objID;
    }
    
    _initWithEntity(entity:NSEntityDescription, referenceObject?:string){
        super.init();
        this._entity = entity;
        if (referenceObject == null) {
            this._isTemporaryID = true;
            this._referenceObject = UUID.UUID().UUIDString;
        }
        else {
            this._setReferenceObject(referenceObject);
            NSLog("ManagedObjectID create " + entity.name + "/" + referenceObject);
        }
    }

    _initWithURIRepresentation(url:URL){
        super.init();
        //TODO:
    }

    private _storeIdentifier:string = null;
    _getStoreIdentifier(){return this._storeIdentifier;}
    _setStoreIdentifier(identifier:string){ this._storeIdentifier = identifier;}
    
    _setPersistentStore(persistentStore:NSPersistentStore){this._persistentStore = persistentStore;}
    
    private _referenceObject:any = null;
    _getReferenceObject(){return this._referenceObject;}
    _setReferenceObject(object:any){
        this._isTemporaryID = false;
        this._referenceObject = object;

        if (typeof(object) != "string") {
            NSLog("kkk");
        }
    }
    
    // #endregion
}
