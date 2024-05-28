import { NSObject, URLConnection, XMLParser, URLRequest, NSLog, NotificationCenter, Bundle, PropertyListSerialization, DateFormatter } from "foundation";
import { NSRelationshipDescription, NSDeleteRule } from "./NSRelationshipDescription";
import { NSEntityDescription } from "./NSEntityDescription";
import { NSAttributeType } from "./NSAttributeDescription";
import { NSManagedObjectContext } from "./NSManagedObjectContext";



let _dateTimeFormatter:DateFormatter = null;
function DateFromString(dateString:string):Date
{
    /*
    if (_dateTimeFormatter == null) {
        _dateTimeFormatter = new DateFormatter();
        _dateTimeFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";
    }

    return _dateTimeFormatter.dateFromString(dateString);
    */
   return new Date(dateString);
}

export class NSManagedObjectModel extends NSObject
{    
    private _entitiesByName:any = {};
    //private _entitiesByConfigName = {};
    private _entitiesByConfigName: { [key: string]: any } = {};
    
    
    static entityForNameInManagedObjectContext(entityName:any, context:NSManagedObjectContext):NSEntityDescription{
        
        let mom = context.persistentStoreCoordinator.managedObjectModel;
        let entity = mom.entitiesByName[entityName];
        
        if (entity == null) {
            throw new Error(`NSManagedObjectModel: Unkown entity (${entityName})`);
        }
        
        return entity;
    }

    private _namespace:string = null;
    initWithContentsOfURL(url:URL){

        // check if we already have it
        let type = url.absoluteString.match(/\.[0-9a-z]+$/i)[0].substring(1);
        let resource = url.absoluteString.substring(0, url.absoluteString.length - type.length - 1);

        if (type == "xcdatamodeld") {
            // Core Data Bundle
            let versionFile = url.absoluteString + "/xccurrentversion";
            let versionData = Bundle.main.pathForResourceOfType(versionFile, null);
            let versionInfo = PropertyListSerialization.propertyListWithData(versionData, 0, 0, null);
            
            resource = url.absoluteString + "/" + versionInfo["_XCCurrentVersionName"] + "/contents";
            type = "xml";

            const components = versionInfo["_XCCurrentVersionName"].split(".");
            this._namespace = components[0];
        }

        let data = Bundle.main.pathForResourceOfType(resource, type);
        if (data != null) {
            this.parseContents(data);
            return;
        }

        // Download the file
        let request = URLRequest.requestWithURL(url);

        let uc = new URLConnection();
        uc.initWithRequest(request, this);
    }

    connectionDidReceiveText(urlConnection:any, data:any){        
        this.parseContents(data)
    }

    private parseContents(contents:any) {
        let parser = new XMLParser();
        parser.initWithString(contents, this);
        parser.parse();                
    }

    // #region XML Parser delegate
    private currentEntity:NSEntityDescription = null;
    private currentConfigName:string = null;

    // XML Parser delegate
    parserDidStartElement(parser:XMLParser, element:string, attributes:any){

        //console.log("XMLParser: Start element (" + element + ")");        
        
        if (element == "entity"){

            let name = attributes["name"];
            let classname = attributes["representedClassName"] || name;
            let parentName = attributes["parentEntity"]; 
            let is_abstract = attributes["isAbstract"] ? attributes["isAbstract"] : "NO";

            this.currentEntity = new NSEntityDescription();
            let cs = this._namespace == null ? classname : this._namespace + "." + classname;
            this.currentEntity.initWithEntityName(name, null, this, cs);
            this.currentEntity.parentEntityName = parentName;
            this.currentEntity.isAbstract = (is_abstract.toLowerCase() == "yes");            

            NSLog("\n\n--- " + name);
        }
        else if (element == "attribute") {

            let name = attributes["name"];
            let type = attributes["attributeType"];
            let serverName = attributes["serverName"];            
            let optional = attributes["optional"] != null ? attributes["optional"] : "YES";            
            let syncable = attributes["syncable"];
            let defaultValueString = attributes["defaultValueString"];
            this._addAttribute(name, type, optional, serverName, syncable, defaultValueString);
        }        
        else if (element == "relationship") {
        
            let name = attributes["name"];
            let destinationEntityName = attributes["destinationEntity"];
            let toMany = attributes["toMany"];
            let serverName = attributes["serverName"]; 
            let optional = attributes["optional"] != null ? attributes["optional"] : "YES";                                   
            let inverseName = attributes["inverseName"];
            let inverseEntity = attributes["inverseEntity"];            
            let deleteRule = attributes["deletionRule"];
            this._addRelationship(name, destinationEntityName, toMany, serverName, inverseName, inverseEntity, optional, deleteRule);
        }
        else if (element == "configuration") {
            this.currentConfigName = attributes["name"];
        }        
        else if (element == "memberEntity") {
            console.log("NSManagedObjectModel::parse: memberEntity not implemented");
            /*
            let entityName = attributes["name"];
            let entity = this._entitiesByName[entityName];
            this._setEntityForConfiguration(entity, this.currentConfigName);
            */
        }        

    }

    parserDidEndElement(parser:XMLParser, element:string){
        
        //console.log("XMLParser: End element (" + element + ")");

        if (element == "entity") {
            let entity = this.currentEntity;
            this._entitiesByName[entity.name] = entity;
            this.currentEntity = null;
        }
    }

    parserDidEndDocument(parser:XMLParser){

        // Check every relation ship and assign the right destination entity
        for (let entityName in this._entitiesByName) {
            let entity = this._entitiesByName[entityName] as NSEntityDescription;
            entity.build();
            // for (var index = 0; index < e.relationships.length; index++) {
            //     let r:NSRelationshipDescription = e.relationships[index];
                
            //     if (r.destinationEntity == null){
            //         let de = this._entitiesByName[r.destinationEntityName];
            //         r.destinationEntity = de;
            //     }
            // }
        }

        //console.log("datamodel.xml parser finished");
        NotificationCenter.defaultCenter().postNotification("NSManagedObjectModelDidParseDataModel", null);
    }

    // #endregion

    private _addAttribute(name:string, type:string, optional:string, serverName:string, syncable:string, defaultValueString:string){

        NSLog((serverName != null ? serverName : name) + " (" + type + ", optional=" + optional + (defaultValue != null? ", defaultValue: " + defaultValue : "") + "): ");

        var attrType = null;
        var defaultValue = null;
        
        switch(type){
            case "Boolean":
                attrType = NSAttributeType.Boolean;
                if (defaultValueString != null) defaultValue = (defaultValueString.toLocaleLowerCase() == "true" || defaultValueString.toLocaleLowerCase() == "yes") ? true : false;
                break;

            case "Integer":
            case "Integer 8":
            case "Integer 16":
            case "Integer 32":
            case "Integer 64":
                attrType = NSAttributeType.Integer;
                if (defaultValueString != null) defaultValue = parseInt(defaultValueString);
                break;

            case "Float":
            case "Double":
            case "Decimal":
                attrType = NSAttributeType.Float;
                if (defaultValueString != null) defaultValue = parseFloat(defaultValueString);
                break;
        
            case "Number":
                attrType = NSAttributeType.Number;
                if (defaultValueString != null) defaultValue = parseFloat(defaultValueString);
                break;

            case "String":
                attrType = NSAttributeType.String;
                if (defaultValueString != null) defaultValue = defaultValueString;
                break;

            case "Date":
                attrType = NSAttributeType.Date;
                if (defaultValueString != null) defaultValue = DateFromString(defaultValueString); 
                break;

            case "Transformable":
                attrType = NSAttributeType.Transformable;
                if (defaultValueString != null) defaultValue = defaultValueString;
                break;

            default:
                NSLog("NSManagedObjectModel: Unknown class type: " + type);
                if (defaultValueString != null) defaultValue = defaultValueString;
                break;
        }

        let opt = true;
        if (optional != null && (optional.toLocaleLowerCase() == "no" || optional.toLocaleLowerCase() == "false")) opt = false;
        
        let sync = true;
        if (syncable != null && (syncable.toLocaleLowerCase() == "no" || optional.toLocaleLowerCase() == "false")) sync = false;

        this.currentEntity.addAttribute(name, attrType, defaultValue, opt, serverName, sync);
    }

    private _addRelationship(name:string, destinationEntityName:string, toMany:string, serverName:string, inverseName:string, inverseEntity:string, optional:string, deletionRule:string){

        NSLog((serverName != null ? serverName : name) + " (" + destinationEntityName + ", optional=" + optional + ", inverseEntity: " + inverseEntity + ", inverseName: "  + inverseName + ")");

        let isToMany = false;
        if (toMany != null && (toMany.toLocaleLowerCase() == "yes" || toMany.toLocaleLowerCase() == "true")){
            isToMany = true;
        }        

        let opt = true;
        if (optional != null && (optional.toLocaleLowerCase() == "no" || optional.toLocaleLowerCase() == "false")) opt = false;

        let del_rule = NSDeleteRule.noActionDeleteRule;
        switch(deletionRule){
            case "Nullify": del_rule = NSDeleteRule.nullifyDeleteRule; break;
            case "Cascade": del_rule = NSDeleteRule.cascadeDeleteRule; break;
        }

        this.currentEntity.addRelationship(name, destinationEntityName, isToMany, serverName, inverseName, inverseEntity, opt, del_rule);
    }

    /*
    private _setEntityForConfiguration(entity:any, configuration:string) {
        var array = this.entitiesForConfiguration[configuration];
        if (array == null){
            array = [];
            this.entitiesForConfiguration[configuration] = array;
        }     
        array.addObject(entity);
    }

    setEntitiesForConfiguration(entities:any, configuration:string) {
        for (var index = 0; index < entities.length; index++){
            let entity = entities[index];
            this._setEntityForConfiguration(entity, configuration);
        }
    }

    entitiesForConfiguration(configurationName:string){        
        return this.entitiesForConfiguration[configurationName];
    }
    */
    get entitiesByName() {
        return this._entitiesByName;
    }
}
