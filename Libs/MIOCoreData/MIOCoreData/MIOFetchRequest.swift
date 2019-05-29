//
//  MIOFetchRequest.swift
//  DLAPIServer
//
//  Created by Javier Segura Perez on 22/05/2019.
//

import Foundation

protocol MIOFetchRequestResult {
}

class MIOFetchRequest<ResultType>: MIOPersistentStoreRequest where ResultType : MIOFetchRequestResult
{
    var entityName:String!
    var entity:MIOEntityDescription?
    var predicate:MIOPredicate?
    var sortDescriptors:NSSortDescriptor?
    //resultType = MIOFetchRequestResultType.MIOManagedObject
    var fetchLimit = 0
    var fetchOffset = 0
    var relationshipKeyPathsForPrefetching:[String] = []

    static func fetchRequest(withEntityName entityName:String) -> MIOFetchRequest {
        let fetch = MIOFetchRequest(entityName: entityName)
        return fetch;
    }
    
    init(entityName:String) {
        super.init()
        self.entityName = entityName;
        self.requestType = MIORequestType.Fetch;
    }
}
