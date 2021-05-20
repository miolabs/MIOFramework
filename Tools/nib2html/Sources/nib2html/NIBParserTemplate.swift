//
//  NIBParserTemplate.swift
//  nib2html
//
//  Created by Javier Segura Perez on 16/5/21.
//

import Foundation


class NIBParserTemplate
{
    var items: Template
    
    init(contentOf items: Template ) {
        //guard let fileData = try? Data( contentsOf: url ) else { return }
        //do {
//            let items = try JSONSerialization.jsonObject(with: fileData, options: [] ) as? [String : Any]
            self.items = items
//        }
//        catch {
//            print(error.localizedDescription)
//        }
    }
    
    public func renderContent(classname:String, identifier:String?, options opts_arg:[String:String], childrens:String?) -> String {
        
        guard let item = items[classname] else { return "" }
        
        var template  = item.tmpl
        var options   = opts_arg
        let tmpl_opts = item.options

        render_options( &template, tmpl_opts, &options )
        insert_html_attribte( &template, "class" , " " , options )
        insert_html_attribte( &template, "style", "; ", options )

        return template.replacingOccurrences(of: "{children}", with: childrens ?? "")
    }
    
    func insert_html_attribte ( _ tmpl: inout String, _ attr: String, _ separator: String, _ options: [String:String] ) {
        let value = options[ attr ]?.trimmingCharacters(in: .whitespaces) ?? ""
        
        if value.count == 0 { return }
        
        if let attr_range = regex( tmpl, "\(attr)=\"[^\"]*\"" ) {
           tmpl.insert( contentsOf: value + separator
                          , at: tmpl.index( tmpl.startIndex
                                          , offsetBy: attr_range.location + "\(attr)=\"".count ))
        } else {
            tmpl.insert( contentsOf: " \(attr)=\"\(value)\" "
                       , at:   tmpl.range(of: " ")?.lowerBound
                            ?? tmpl.range(of: "/>")?.lowerBound
                            ?? tmpl.range(of: ">")!.lowerBound
                       )
        }
    }
    
    
    func regex ( _ str: String, _ pattern: String ) -> NSRange? {
        let range = NSRange(location: 0, length: str.count)
        let regex = try! NSRegularExpression( pattern: pattern )
        
        return regex.firstMatch(in: str, options: [], range: range)?.range
    }
    
    
    func render_options ( _ tmpl: inout String, _ tmpl_opts: [String:[TemplateItemOption]], _ options: inout [String:String] ) {
        var target_value: [ String: String ] = [:]
        
        for name in tmpl_opts.keys {
            if let value = options[ name ] {
                for action in tmpl_opts[ name ]! {
                    let target = action.target
                    
                    if target_value[ target ] == nil { target_value[ target ] = "" }
                    
                    target_value[ target ]! += action.value( value ) + " "
                }
            }
        }
        
        for target in target_value.keys {
            if target == "class" {
                if options[ "class" ] == nil { options[ "class" ] = "" }
                
                options[ "class" ]! += " " + target_value[ target ]!
            } else if target == "style" {
                if options[ "style" ] == nil { options[ "style" ] = "" }
                
                options[ "style" ]! += target_value[ target ]! + "; "
            } else {
                tmpl = tmpl.replacingOccurrences( of: "{\(target)}", with: target_value[ target ]! )
            }
        }
    }
}
