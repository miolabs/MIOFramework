import { NSObject, UUID } from "foundation";
import { NSPersistentStoreRequest } from "./NSPersistentStoreRequest";
import { NSManagedObject } from "./NSManagedObject";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSPersistentStoreCoordinator } from "./NSPersistentStoreCoordinator";
import { NSManagedObjectContext } from "./NSManagedObjectContext";
import { NSManagedObjectID } from "./NSManagedObjectID";

export let NSStoreUUIDKey = "NSStoreUUIDKey";
export let NSStoreTypeKey = "NSStoreTypeKey";

export class NSPersistentStore extends NSObject
{    
    // To override per class
    static get type ():string { return "NSPersistentStore";}

    private _persistentStoreCoordinator:NSPersistentStoreCoordinator = null;
    get persistentStoreCoordinator():NSPersistentStoreCoordinator{return this._persistentStoreCoordinator;}

    private _configurationName:string = null;
    get configurationName():string{return this._configurationName;}
    
    private _url:URL = null;
    get url():URL{return this._url;}
    
    private _options:any = null;    
    get options(){return this._options;}

    get readOnly():boolean{return false;}
    
    private _type:string = null;
    get type():string {return this._type;}

    private _identifier:string = null;
    get identifier(){return this._identifier;}

    protected metadata:any = null;

    initWithPersistentStoreCoordinator(root:NSPersistentStoreCoordinator, configurationName:string, url:URL, options:any=null) {

        this._persistentStoreCoordinator = root;
        this._configurationName = configurationName;
        this._url = url;
        this._options = options;        

        this.loadMetadata();
        this._identifier = this.metadata[NSStoreUUIDKey];
        this._type = this.metadata[NSStoreTypeKey];

        if (this._identifier == null || this._type == null) {
            throw new Error("NSPersistentStore: Invalid metada information");
        }
    }    

    didAddToPersistentStoreCoordinator(psc:NSPersistentStoreCoordinator){}
    willRemoveFromPersistentStoreCoordinator(psc:NSPersistentStoreCoordinator){}

    loadMetadata(){
        let uuid = UUID.UUID().UUIDString;
        let metadata = { NSStoreUUIDKey: uuid, NSStoreTypeKey: "NSPersistentStore" };
        this.metadata = metadata;        
    }

    _obtainPermanentIDForObject(object:NSManagedObject):NSManagedObjectID {
        return object.objectID;
    }        

    _executeRequest(request: NSPersistentStoreRequest, context: NSManagedObjectContext) : any[] {
        return [];
    }

    _objectIDForEntity(entity:NSEntityDescription, referenceObject:string) : any{
        return null;
    }
}