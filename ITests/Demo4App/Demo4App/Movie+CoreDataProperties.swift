//
//  Movie+CoreDataProperties.swift
//  Demo4App
//
//  Created by Bubulkowa norka on 29/05/2019.
//  Copyright © 2019 Javier Segura Perez. All rights reserved.
//
//

import Foundation
import CoreData


extension Movie {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Movie> {
        return NSFetchRequest<Movie>(entityName: "Movie")
    }

    @NSManaged public var isFavorite: Bool
    @NSManaged public var name: String?

}
