//
//  MIOPersistentStoreCoordinator.swift
//  MIOCoreData
//
//  Created by Javier Segura Perez on 31/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import Foundation

class MIOPersistentStoreCoordinator:NSObject
{
    static var _storeClasses:[String:String] = [:]
    static func register(storeClass:String, storeType:String){
        MIOPersistentStoreCoordinator._storeClasses[storeType] = storeClass;
    }

    private var _storesByIdentifier:[String:MIOPersistentStore] = [:]
    private var _stores:[MIOPersistentStore] = [];
    var persistentStore:[MIOPersistentStore]{
        get {
            return _stores
        }
    }
    
    private var _managedObjectModel:MIOManagedObjectModel!
    var managedObjectModel:MIOManagedObjectModel{
        get {
            return _managedObjectModel
        }
    }
    
    init(managedObjectModel:MIOManagedObjectModel) {
        super.init()
        _managedObjectModel = managedObjectModel
    }
    
    func addPersistentStore(type:String, configuration:String, url:NSURL, options:NSDictionary?){
        
        guard let className = MIOPersistentStoreCoordinator._storeClasses[type] else {
            
        }
        //if (className == null) throw new Error("MIOPersistentStoreCoordinator: Unkown persistent store type.");
        
        let ps = persistentStore(className)
        ps.initWithPersistentStoreCoordinator(this, configuration, url, options);
        
        this._storesByIdentifier[ps.identifier] = ps;
        this._stores.addObject(ps);
        ps.didAddToPersistentStoreCoordinator(this);
        
        return ps;
    }
    
    removePersistentStore(store:MIOPersistentStore){
    store.willRemoveFromPersistentStoreCoordinator(this);
    delete this._storesByIdentifier[store.identifier];
    this._stores.removeObject(store);
    }
    
    managedObjectIDForURIRepresentation(url:MIOURL):MIOManagedObjectID{
    let scheme:string = url.scheme;
    let host:string = url.host;
    let path:string = url.path;
    let reference:string = path.lastPathComponent();
    let entityName:string = path.stringByDeletingLastPathComponent().lastPathComponent();
    let model:MIOManagedObjectModel = this.managedObjectModel;
    let entity:MIOEntityDescription = model.entitiesByName[entityName];
    
    return this._persistentStoreWithIdentifier(host)._objectIDForEntity(entity, reference);
    }
    
    _persistentStoreWithIdentifier(identifier:string) {
    if (identifier == null) return null;
    return this._storesByIdentifier[identifier];
    }
    
    _persistentStoreForObjectID(objectID:MIOManagedObjectID):MIOPersistentStore{
    
    if (this._stores.length == 0) throw new Error("MIOPersistentStoreCoordinator: There's no stores!");
    
    let entity = objectID.entity;
    var storeIdentifier = objectID._getStoreIdentifier();
    let store = this._persistentStoreWithIdentifier(storeIdentifier);
    
    if (store != null) return store;
    
    let model = this.managedObjectModel;
    
    for (var index = 0; index < this._stores.length; index++){
    let store:MIOPersistentStore = this._stores[index];
    let configurationName = store.configurationName;
    
    if (configurationName != null){
    let entities = model.entitiesForConfiguration(configurationName);
    for (var name in entities) {
    var checkEntity = entities[name];
    if (checkEntity === entity) return checkEntity;
    }
    }
    }
    
    return this._stores[0];
    
    }
    
    _persistentStoreForObject(object:MIOManagedObject):MIOPersistentStore{
    return this._persistentStoreForObjectID(object.objectID);
    }
}
