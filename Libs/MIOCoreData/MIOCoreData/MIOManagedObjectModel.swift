//
//  MIOManagedObjectModel.swift
//  DLAPIServer
//
//  Created by Javier Segura Perez on 21/05/2019.
//

import Foundation


class MIOManagedObjectModel:NSObject, XMLParserDelegate {
    
    private static var entitiesByName:[String:MIOEntityDescription] = [:]
    
    static func entity(entityName:String, inManagedObjectContext context:MIOManagedObjectContext?) -> MIOEntityDescription? {
        var entity:MIOEntityDescription?
        
        if context == nil {
            entity = MIOManagedObjectModel.entitiesByName[entityName]
        }
        else {
            // TODO: Implement persistent store methods
        }
        
        return entity
    }
    
    let fileURL:URL!
    
    init(url:URL) {
        fileURL = url
        super.init()
        parse()
    }
    
    private func parse(){
        let parser = XMLParser(contentsOf: fileURL)
        parser?.delegate = self
        parser?.parse()
    }
    
    var currentEntity:MIOEntityDescription?
    
    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        
        if elementName == "entity" {
            
            let name = attributeDict["name"]
            //let parentName = attributeDict["parentEntity"]
            //let parentEntity = attributeDict != null ? this._entitiesByName[parentName] : null;
            
            currentEntity = MIOEntityDescription(entityName: name!, parentEntity: nil)
        }
        else if elementName == "attribute" {
            
            let name = attributeDict["name"]
            let type = attributeDict["attributeType"]
            let optional = attributeDict["optional"]
            let syncable = attributeDict["syncable"];
            let defaultValueString = attributeDict["defaultValueString"];
            
            addAttribute(name: name!, type: type!, optional: optional, syncable: syncable, defaultValueString: defaultValueString)
        }
        else if (elementName == "relationship") {
            
            let name = attributeDict["name"];
            let destinationEntityName = attributeDict["destinationEntity"];
            let toMany = attributeDict["toMany"];
            let inverseName = attributeDict["inverseName"];
            let inverseEntityName = attributeDict["inverseEntity"];
            
            addRelationship(name: name!, destinationEntityName: destinationEntityName!, toMany: toMany, inverseName: inverseName, inverseEntityName: inverseEntityName)
        }
//        else if (attributeDict == "configuration") {
//            this.currentConfigName = attributes["name"];
//        }
        else if (elementName == "memberEntity") {
            //let entityName = attributeDict["name"];
            //let entity = this._entitiesByName[entityName];
            //this._setEntityForConfiguration(entity, this.currentConfigName);
        }
    }
    
    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        
        if (elementName == "entity") {
            MIOManagedObjectModel.entitiesByName[currentEntity!.managedObjectClassName.lowercased()] = currentEntity!;
            currentEntity = nil;
        }
        
    }
    
    private func addAttribute(name:String, type:String, optional:String?, syncable:String?, defaultValueString:String?){
    
        var attrType = MIOAttributeType.Undefined
        var defaultValue:Any?
    
        switch(type){
            case "Boolean":
                attrType = MIOAttributeType.Boolean
                if defaultValueString != nil {
                    defaultValue = defaultValueString!.lowercased() == "true" ? true : false;
                }
            
            case "Integer":
                attrType = MIOAttributeType.Integer
                if defaultValueString != nil {
                    defaultValue = Int(defaultValueString!)
                }
            
            case "Integer 8":
                attrType = MIOAttributeType.Int8
                if defaultValueString != nil {
                    defaultValue = Int8(defaultValueString!)
                }
            
            case "Integer 16":
                attrType = MIOAttributeType.Int16
                if defaultValueString != nil {
                    defaultValue = Int16(defaultValueString!)
                }
            
            case "Integer 32":
                attrType = MIOAttributeType.Int32
                if defaultValueString != nil {
                    defaultValue = Int32(defaultValueString!)
                }
            
            case "Integer 64":
                attrType = MIOAttributeType.Int64
                if defaultValueString != nil {
                    defaultValue = Int8(defaultValueString!)
                }
    
            case "Float":
                attrType = MIOAttributeType.Float
                if defaultValueString != nil {
                    defaultValue = Float(defaultValueString!)
                }
    
            case "Number":
                attrType = MIOAttributeType.Number
                if defaultValueString != nil {
                    defaultValue = Float(defaultValueString!)
                }
    
            case "String":
                attrType = MIOAttributeType.String
                if defaultValueString != nil {
                    defaultValue = defaultValueString
                }
    
            case "Date":
                attrType = MIOAttributeType.Date
//                if defaultValueString != nil {
//                    defaultValue = MIODateFromString(defaultValueString)
//                }
    
            default:
                print("MIOManagedObjectModel: Unknown class type: " + type);
                if defaultValueString != nil {
                    defaultValue = defaultValueString
                }
        }
        
        let opt = (optional?.lowercased() == "no" || optional?.lowercased() == "false")  ? false : true
        let sync = (syncable?.lowercased() == "no" || syncable?.lowercased() == "no") ? false : true
    
        currentEntity?.addAttribute(name: name, type: attrType, defaultValue: defaultValue, optional: opt, syncable: sync)
    }
    
    private func addRelationship(name:String, destinationEntityName:String, toMany:String?, inverseName:String?, inverseEntityName:String?){
    
        let isToMany = (toMany?.lowercased() == "yes" || toMany?.lowercased() == "true") ? true : false
        currentEntity?.addRelationship(name: name, destinationEntityName: destinationEntityName, toMany: isToMany, inverseName: inverseName, inverseEntityName: inverseEntityName)
    }
}
