//
//  MIOPersistentStore.swift
//  MIOCoreData
//
//  Created by Javier Segura Perez on 31/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import Foundation

class MIOPersistentStore:NSObject
{
    // To override per class
    static var type:String { get { return "MIOPersistentStore" } }
    
    private var _persistentStoreCoordinator:MIOPersistentStoreCoordinator!
    var persistentStoreCoordinato:MIOPersistentStoreCoordinator { get { return _persistentStoreCoordinator } }
    
    private var _configurationName:String!
    var configurationNam:String { get { return _configurationName } }
    
    private var _url:NSURL!
    var ur:NSURL { get { return _url } }
    
    private var _options:NSDictionary?
    var options:NSDictionary?{ get { return _options } }
    
    var readOnly:Bool { get { return false } }
    
    private var _type:String!
    var type:String { get { return _type } }
    
    private var _identifier:String!
    var identifier:String { get { return _identifier } }
    
    private var metadata:NSDictionary?
    
    init(storeCoordinator:MIOPersistentStoreCoordinator, configurationName:String, url:NSURL, options:NSDictionary?){
        _persistentStoreCoordinator = storeCoordinator
        _configurationName = configurationName
        _url = url
        _options = options
        
        loadMetadata();
        _identifier = this.metadata[MIOStoreUUIDKey]
        _type = this.metadata[MIOStoreTypeKey]
        
        _identifier == nil || _type == nil) {
            //throw new Error("MIOPersistentStore: Invalid metada information");
        }
    }
}
