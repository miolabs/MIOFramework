//
//  NIBParserTemplate.swift
//  nib2html
//
//  Created by Javier Segura Perez on 16/5/21.
//

import Foundation


class NIBParserTemplate
{
    var items: [String:Any] = [:]
    
    init(contentOf url: URL) {
        guard let fileData = try? Data( contentsOf: url ) else { return }
        do {
            let items = try JSONSerialization.jsonObject(with: fileData, options: [] ) as? [String : Any]
            self.items = items!
        }
        catch {
            print(error.localizedDescription)
        }
    }
    
    public func renderContent(classname:String, identifier:String?, options:[String]) -> String {
        
        guard let item = items[classname] as? [String:Any] else { return "" }
        
        guard let template = item["tmpl"] as? String else { return ""}
        
        return template
    }
}
