//
//  UIKitTests.swift
//  
//
//  Created by Javier Segura Perez on 1/5/21.
//

import XCTest

// @testable
// import nib2html

final class UIKitTests: XCTestCase {
    fileprivate let packageRootPath = "/" + (URL(fileURLWithPath: #file).pathComponents.dropFirst().dropLast().joined(separator: "/"))
        
    func testBasicSB() throws {
        
        let file = URL(fileURLWithPath: packageRootPath + "/BasicTest.storyboard" )
        let template = URL(fileURLWithPath: packageRootPath + "/../../Sources/nib2html/html_backend.json" )
        
        let parser = NIBParser(contentsOf: file, template: HTML_BOOTSTRAP5 )
        parser.outputFolder = packageRootPath + "/temp"
        parser.parse()
                
    }
}
