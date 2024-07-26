import { NSObject, ISO8601DateFormatter } from "foundation";
import { NSManagedObjectID } from "./NSManagedObjectID";
import { NSPropertyDescription } from "./NSPropertyDescription";
import { NSRelationshipDescription } from "./NSRelationshipDescription";
import { NSAttributeDescription, NSAttributeType } from "./NSAttributeDescription";



export class _NSIncrementalStoreNodeDateTransformer {
    static sdf:ISO8601DateFormatter = ISO8601DateFormatter.iso8601DateFormatter();
}

export class NSIncrementalStoreNode extends NSObject {

    private _objectID:NSManagedObjectID = null;
    get objectID():NSManagedObjectID {return this._objectID;}
    
    private _version = 0;
    get version(){return this._version;}

    initWithObjectID(objectID:NSManagedObjectID, values: any, version: number){
        this._objectID = objectID;
        this._values = values;
        this._version = version;
    }

    updateWithValues(values:any, version:number) {
        for (let property of Object.keys(values))
            this._values[property] = values[property]
        this._version = version;
    }

    private _values: any = null;
    valueForPropertyDescription(property:NSPropertyDescription) {

        let value = this._values[property.name];

        if (property instanceof NSRelationshipDescription) {
            let rel = property as NSRelationshipDescription;
            if (value == null) {
                value = this._values[rel.serverName];
            }
            return value;
        }
        else if (property instanceof NSAttributeDescription) {
            let attr = property as NSAttributeDescription;
            let type = attr.attributeType;

            if (value == null){
                value = this._values[attr.serverName];
            }        
    
            if (type == NSAttributeType.Boolean) {
                if (typeof (value) === "boolean") {
                    return value;
                }
                else if (typeof (value) === "string") {
                    let lwValue = value.toLocaleLowerCase();
                    if (lwValue == "yes" || lwValue == "true" || lwValue == "1")
                        return true;
                    else
                        return false;
                }
                else {
                    let v = value > 0 ? true : false;
                    return v;
                }
            }
            else if (type == NSAttributeType.Integer) {
                let v = parseInt(value);
                return isNaN(v) ? null : v;
            }
            else if (type == NSAttributeType.Float || type == NSAttributeType.Number) {
                let v = parseFloat(value); 
                return isNaN(v) ? null : v;
            }
            else if (type == NSAttributeType.String) {
                return value;
            }
            else if (type == NSAttributeType.Date) {                
                let date = _NSIncrementalStoreNodeDateTransformer.sdf.dateFromString(value);
                return date;
            }
            else if (type == NSAttributeType.Transformable) {                
                let v = value != null ? JSON.parse(value) : null;
                return v;
            }

        }
        
        return value;
    }
    
}