import { NSPersistentStoreRequest, NSRequestType } from "./NSPersistentStoreRequest";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSPredicate } from "foundation";

export enum NSFetchRequestResultType{
    NSManagedObject,
    NSManagedObjectID,
    Dictionary,
    Count
}

export class NSFetchRequest extends NSPersistentStoreRequest {
    
    entityName:string = null;
    entity:NSEntityDescription = null;
    predicate:NSPredicate = null;
    sortDescriptors = null;
    resultType = NSFetchRequestResultType.NSManagedObject;
    fetchLimit = 0;
    fetchOffset = 0;
    relationshipKeyPathsForPrefetching = [];
    userInfo = {};

    static fetchRequestWithEntityName(entityName:string) {
        var fetch = new NSFetchRequest();
        fetch.initWithEntityName(entityName);

        return fetch;
    }    

    initWithEntityName(entityName:string) {
        this.entityName = entityName;
        this.requestType = NSRequestType.Fetch;
    }

    copy(){
        let request = new NSFetchRequest();
        request.initWithEntityName(this.entityName);

        request.entity = this.entity;
        request.predicate = this.predicate;
        request.sortDescriptors = this.sortDescriptors;
        request.resultType = this.resultType;
        request.fetchLimit = this.fetchLimit;
        request.fetchOffset = this.fetchOffset;
        request.relationshipKeyPathsForPrefetching = this.relationshipKeyPathsForPrefetching;
            
        return request;
    }
}
