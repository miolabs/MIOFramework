
import { NSObject, NSClassFromString } from "foundation";
import { NSPropertyDescription } from "./NSPropertyDescription";
//import { NSClassFromString } from "../NSCore/platform/Web";
import { NSDeleteRule, NSRelationshipDescription } from "./NSRelationshipDescription";
import { NSManagedObjectModel } from "./NSManagedObjectModel";
import { NSManagedObject } from "./NSManagedObject";
import { NSAttributeType, NSAttributeDescription } from "./NSAttributeDescription";
import { NSManagedObjectContext } from "./NSManagedObjectContext";

export class NSEntityDescription extends NSObject {
    
    name:string|null = null;
    attributes:NSAttributeDescription[] = [];
    //attributesByName = {};
    attributesByName: { [key: string]: NSAttributeDescription } = {};

    relationships:NSRelationshipDescription[] = [];
    //relationshipsByName = {};
    relationshipsByName: { [key: string]: NSRelationshipDescription } = {};

    superentity:NSEntityDescription|null = null;

    isAbstract = false;

    private _properties:NSPropertyDescription[] = [];
    //private _propertiesByName = {};
    private _propertiesByName: { [key: string]: NSPropertyDescription } = {};

    //private serverAttributes = {};
    //private serverRelationships = {};
    private serverAttributes: { [key: string]: string } = {};
    private serverRelationships: { [key: string]: string } = {};

    private _managedObjectClassName = "NSEntityDescription";
    get managedObjectClassName():string {return this._managedObjectClassName;}

    managedObjectModel:NSManagedObjectModel = null;

    public static entityForNameInManagedObjectContext(entityName:string, context:NSManagedObjectContext):NSEntityDescription {
        let entity = NSManagedObjectModel.entityForNameInManagedObjectContext(entityName, context);
        return entity;
    }

    public static insertNewObjectForEntityForName(entityName:string, context:NSManagedObjectContext) {
        if (entityName == null) throw new Error("NSEntityDescription:insertNewObjectForEntityForName: EntityName == null");
        
        let entity = NSManagedObjectModel.entityForNameInManagedObjectContext(entityName, context);        
        let obj:NSManagedObject = NSClassFromString(entity.managedObjectClassName);
        obj.initWithEntityAndInsertIntoManagedObjectContext(entity, context);

        return obj;
    }

    initWithEntityName(entityName:string, superEntity:NSEntityDescription, model:NSManagedObjectModel, classname:string|null = null) {
        super.init();
        this.name = entityName;
        this._managedObjectClassName = classname != null ? classname : entityName;
        this.superentity = superEntity;
        this.managedObjectModel = model;
        
        if (superEntity == null) return;
        
        // Add all attributes and relationshsip from parent
        let properties = superEntity.properties;
        for (let index = 0; index < properties.length; index++){
            let property = properties[index] as NSPropertyDescription;
            if (property instanceof NSAttributeDescription) {
                let attr = property as NSAttributeDescription;
                this.addAttribute(attr.name, attr.attributeType, attr.defaultValue, attr.optional, attr.serverName, attr.syncable);
            }
            else if (property instanceof NSRelationshipDescription){
                let rel = property as NSRelationshipDescription;
                if (rel.inverseRelationship != null) {
                    this.addRelationship(rel.name, rel.destinationEntityName, rel.isToMany, rel.serverName, rel.inverseRelationship.name, rel.inverseRelationship.destinationEntityName);
                }
                else {
                    this.addRelationship(rel.name, rel.destinationEntityName, rel.isToMany, rel.serverName);
                }
            }
        }
    }

    get properties():NSPropertyDescription[]{
        return this._properties;
    }
    
    get propertiesByName(){
        return this._propertiesByName;
    }

    addAttribute(name:string|null, type:NSAttributeType, defaultValue:any, optional:boolean, serverName?:string|null, syncable?:boolean) {
        if (name !== null && this.attributesByName[name] == null) {
            let attr = new NSAttributeDescription();
            attr.initWithName(name, type, defaultValue, optional, serverName ?? null, syncable);
            this.attributes.push(attr);
            this.attributesByName[name] = attr;
            this._propertiesByName[name] = attr;
            this._properties.addObject(attr);
            
            // Cache        
            this.serverAttributes[name] = serverName ? serverName : name;
        }
    }

    addRelationship(name:string|null, destinationEntityName:string|null, toMany:boolean, serverName:string|null, inverseName?:string|null, inverseEntityName?:string|null, optional?:boolean, deletionRule?:NSDeleteRule) {
        if (name !== null && this.relationshipsByName[name] != null) {
            let rel = new NSRelationshipDescription();
            rel.initWithName(name, destinationEntityName, toMany, serverName, inverseName, inverseEntityName);
            if (optional != null) rel.optional = optional;
            if (deletionRule != null) rel.deleteRule = deletionRule;
            this.relationships.push(rel);
            this.relationshipsByName[name] = rel;
            this._propertiesByName[name] = rel;
            this._properties.addObject(rel);

            // Server cache
            this.serverRelationships[name] = serverName ? serverName : name;                
        }
    }

    serverAttributeName(name:string){
        return this.serverAttributes[name];
    }

    serverRelationshipName(name:string){
        return this.serverRelationships[name];
    }

    parentEntityName:string|null = null;
    private isBuilt = false;
    build() {

        if (this.isBuilt) { return; }
        this.isBuilt = true;
        
        if (this.parentEntityName != null) {
            let parentEntity =  this.managedObjectModel.entitiesByName[this.parentEntityName];
            this.superentity = parentEntity;
            //parentEntity.subentities.append(this);
            parentEntity.build();
            
            for (let key in parentEntity.propertiesByName) {
                let prop = parentEntity.propertiesByName[key];
                if (prop instanceof NSAttributeDescription) {
                    let attr = prop as NSAttributeDescription;
                    this.addAttribute(attr.name, attr.attributeType, attr.defaultValue, attr.optional);
                }
                else if (prop instanceof NSRelationshipDescription) {
                    let rel = prop as NSRelationshipDescription;
                    this.addRelationship(rel.name,rel.destinationEntityName, rel.isToMany, null, rel.inverseName, rel.inverseEntityName, rel.optional);
                }
            }
        }
        
        for (let key in this.relationshipsByName) {
            let rel = this.relationshipsByName[key] as NSRelationshipDescription;
            if (rel.destinationEntity == null) {
                rel.destinationEntity = this.managedObjectModel.entitiesByName[rel.destinationEntityName];
            }
            
            if (rel.inverseName != null && rel.inverseEntityName != null) {
                let inverseEntity = this.managedObjectModel.entitiesByName[rel.inverseEntityName];
                if (inverseEntity == null) {
                    throw new Error("KK");
                }

                let inverseRelation = inverseEntity.relationshipsByName[rel.inverseName];
                rel.inverseRelationship = inverseRelation
            }
        }
    }
}
