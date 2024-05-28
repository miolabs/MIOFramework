
import { NSPropertyDescription } from "./NSPropertyDescription";

export enum NSAttributeType {

    Undefined,
    Boolean,
    Integer,
    Float,
    Number,
    String,
    Date,
    Transformable   
}

export class NSAttributeDescription extends NSPropertyDescription
{    
    private _attributeType = NSAttributeType.Undefined;
    private _defaultValue:any = null;
    private _serverName:string | null = null; 
    private _syncable = true;

    initWithName(name:string, type:NSAttributeType, defaultValue:any, optional:boolean, serverName:string | null, syncable?:boolean){

        super.init();

        this.name = name;
        this._attributeType = type;
        this._defaultValue = defaultValue;
        this._serverName = serverName;
        this.optional = optional;
        if (syncable == false) this._syncable = false;
    }

    get attributeType(){
        return this._attributeType;
    }

    get defaultValue(){
        return this._defaultValue;
    }

    get serverName(){
        if (this._serverName == null) {    
            return this.name;
        }
        
        return this._serverName;
    }

    get syncable(){
        return this._syncable;
    }
}