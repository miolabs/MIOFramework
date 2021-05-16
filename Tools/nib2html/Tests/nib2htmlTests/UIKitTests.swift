//
//  UIKitTests.swift
//  
//
//  Created by Javier Segura Perez on 1/5/21.
//

import XCTest

final class UIKitTests: XCTestCase {
    fileprivate let packageRootPath = "/" + (URL(fileURLWithPath: #file).pathComponents.dropFirst().dropLast().joined(separator: "/"))
        
    func testBasicSB() throws {
        
        let file = packageRootPath + "/BasicTest.storyboard"
        
        let parser = NIBParser(contentsOf: URL(fileURLWithPath: file ) )
        parser.parse()
    }
}
