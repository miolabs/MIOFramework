//
//  MIOFetchedResultsController.swift
//  MIOCoreData
//
//  Created by Javier Segura Perez on 29/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import Foundation


protocol MIOFetchedResultsControllerDelegate:NSObject {
    
}

class MIOFetchedResultsController<ResultType> : NSObject where ResultType : MIOFetchRequestResult
{
    var sections:[MIOFetchSection] = []
    
    var delegate:MIOFetchedResultsControllerDelegate?
    
    init(fetchRequest:MIOFetchRequest<ResultType>, managedObjectContext:MIOManagedObjectContext, sectionNameKeyPath:String?, cacheName:String?) {
    
    }
    
    var fetchedObjects:[MIOManagedObject] = []
    
    func performFetch(){
        
    }
}

class MIOFetchSection:NSObject
{
    var objects:[Any] = []
    
    func numberOfObjects() -> Int {
        return objects.count
    }
}
