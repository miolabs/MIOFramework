//
//  File.swift
//  
//
//  Created by David Trallero on 16/05/2021.
//

import Foundation


func readBackend ( _ filename: URL ) throws -> [String:Any] {
    let fileData = try Data( contentsOf: filename )
    
    return try JSONSerialization.jsonObject(with: fileData, options: [] ) as! [String : Any]
}
