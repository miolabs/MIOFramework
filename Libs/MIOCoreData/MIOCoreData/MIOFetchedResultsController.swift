//
//  MIOFetchedResultsController.swift
//  MIOCoreData
//
//  Created by Javier Segura Perez on 29/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//

import Foundation


protocol MIOFetchedResultsControllerDelegate:NSObject {
    func controllerWillChangeContent(_ controller: MIOFetchedResultsController<MIOFetchRequest>)
}

class MIOFetchSection:NSObject
{
    var objects:[Any] = []
    
    func numberOfObjects() -> Int {
        return objects.count
    }
}

class MIOFetchedResultsController<Element>:NSObject
{
    var sections:[MIOFetchSection] = []
    
    var delegate:MIOFetchedResultsControllerDelegate?
    
    init(WithFetchRequest request:MIOFetchRequest, managedObjectContext:MIOManagedObjectContext, sectionNameKeyPath:String?){
    
    }
    
    var fetchedObjects:[MIOManagedObject] = []
    
    func performFetch(){
        
    }
}

