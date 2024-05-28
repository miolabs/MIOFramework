import { NSManagedObjectSet } from "./NSManagedObjectSet";
import { NSPersistentStoreRequest, NSRequestType } from "./NSPersistentStoreRequest";

export class NSSaveChangesRequest extends NSPersistentStoreRequest {
    
    insertedObjects: NSManagedObjectSet = null;
    updatedObjects: NSManagedObjectSet = null;
    deletedObjects: NSManagedObjectSet = null;

    initWithObjects(inserted:NSManagedObjectSet , updated:NSManagedObjectSet, deleted:NSManagedObjectSet) {
        this.insertedObjects = inserted;
        this.updatedObjects = updated;
        this.deletedObjects = deleted;
        
        this.requestType = NSRequestType.Save;
    }
}
