//
//  MIOPersistentStoreRequest.swift
//  DLAPIServer
//
//  Created by Javier Segura Perez on 22/05/2019.
//

import Foundation

enum MIORequestType {
    case Fetch
    case Save
}

class MIOPersistentStoreRequest {
    var requestType:MIORequestType!
}
