//
//  MIOEntityDescription.swift
//  DLAPIServer
//
//  Created by Javier Segura Perez on 21/05/2019.
//

import Foundation

enum MIOAttributeType {
    case Undefined
    case Boolean
    case Integer
    case Int8
    case Int16
    case Int32
    case Int64
    case Float
    case Number
    case String
    case Date
}

class MIOEntityDescription {
    
    static func entity(entityName:String, context:MIOManagedObjectContext?) -> MIOEntityDescription? {
        let entity = MIOManagedObjectModel.entity(entityName: entityName, inManagedObjectContext: context)
        return entity;
    }

    var name:String!
    var managedObjectClassName:String!
    
    init(entityName:String, parentEntity:MIOEntityDescription?) {
        name = entityName
        managedObjectClassName = entityName;
    }
    
    var properties:[MIOPropertyDescription] = []
    var propertiesByName:[String:MIOPropertyDescription] = [:]
    
    var attributes:[MIOAttributeDescription] = []
    var attributesByName:[String:MIOAttributeDescription] = [:]
    
    func addAttribute(name:String, type:MIOAttributeType, defaultValue:Any?, optional:Bool, syncable:Bool) {
        let attr = MIOAttributeDescription(name: name, type: type, defaultValue: defaultValue, optional: optional, syncable: syncable)
        attributes.append(attr)
        attributesByName[name] = attr;
        properties.append(attr)
        propertiesByName[name] = attr;
    }
    
    var relationships:[MIORelationshipDescription] = []
    var relationshipsByName:[String:MIORelationshipDescription] = [:]
    
    func addRelationship(name:String, destinationEntityName:String, toMany:Bool, inverseName:String?, inverseEntityName:String?) {
    
        let rel = MIORelationshipDescription(name: name, destinationEntityName: destinationEntityName, toMany: toMany, inverseName: inverseName, inverseEntityName: inverseEntityName)
        relationships.append(rel)
        relationshipsByName[name] = rel
        properties.append(rel)
        propertiesByName[name] = rel
    }
}
