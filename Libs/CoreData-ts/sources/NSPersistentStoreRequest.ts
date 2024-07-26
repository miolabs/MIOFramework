import { NSObject } from "foundation";



export enum NSRequestType{
    Fetch,
    Save
}

export class NSPersistentStoreRequest extends NSObject
{    
    requestType:NSRequestType;
}