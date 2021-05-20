//
//  File.swift
//  
//
//  Created by Javier Segura Perez on 1/5/21.
//

import Foundation


public typealias TemplateItemOptionCB = ( _ value: String ) -> String

public struct TemplateItemOption {
    public var target: String
    public var value: TemplateItemOptionCB
    
    public init ( _ target: String, cb: @escaping TemplateItemOptionCB ) {
        self.target = target
        self.value  = cb
    }
}

public struct TemplateItem {
    public var tmpl: String
    public var options: [String: [TemplateItemOption] ]
    
    public init ( _ tmpl: String, _ opts: [ String: [TemplateItemOption] ] = [:] ) {
        self.tmpl = tmpl
        self.options = opts
    }
}

public typealias Template = [String: TemplateItem]





class HTMLItem
{
    var identifier:String?
    var templateClass:String?
    var content:String = ""
    var order:Int = 0
    var styles:[String] = []
    var classes:[String] = []
    var customClass:String? = nil
    var extraAttributes:[String] = []
    var outlets:[HTMLItemOutlet] = []
    var segues:[HTMLItemSegue] = []
    var subviews: [HTMLItem] = []
    var constraints: [Constraint] = []
    var viewAttributes: [String : String] = [:]
}

struct HTMLItemOutlet
{
    var property:String
    var destination:String
}

struct HTMLItemSegue
{
    var destination:String
    var kind:String
    var identifier:String?
    var relationship:String?
}




class Constraint
{
    var target: String? = nil
    var target2: String? = nil

    init ( _ target: String? = nil, _ target2: String? = nil ) {
        self.target = target
        self.target2 = target2
    }

    public func invert ( ) -> Constraint { return self }
}


class MarginConstraint: Constraint
{
    var side: String
    var side2: String
    var value: Int
    
    init ( side: String, side2: String, value: Int, _ target: String? = nil, _ target2: String? = nil ) {
        self.side  = side
        self.side2 = side2
        self.value = value
        
        super.init( target, target2 )
    }
    
    
    public override func invert ( ) -> Constraint {
        side = side2
        return self
    }
}

class SizeConstraint: Constraint
{
    var isHorizontal: Bool
    var isFixed: Bool
    var size: Int
    
    init ( isHorizontal: Bool, isFixed: Bool, size: Int ) {
        self.isHorizontal = isHorizontal
        self.isFixed = isFixed
        self.size = size
        
        super.init( )
    }
}


let g_default_attrs: [ String: [String:String] ] =
[
  "tableViewCell" : [ "rowHeight" : "44" ]
, "stackView": [ "axis": "horizontal" ]
]


class NIBParser : NSObject, XMLParserDelegate
{
    let url:URL
    let parserTemplate:NIBParserTemplate
    var outputFolder:String?
    var root: HTMLItem
    let supported_elements = Set( [ "viewController", "navigationController", "tableViewController", "view", "navigationBar", "navigationItem" , "barButtonItem", "label", "button", "textField", "tableView", "tableViewCell", "tableViewCellContentView", "collectionView", "collectionViewFlowLayout", "collectionViewCell", "toolbar", "imageView", "segmentedControl", "segment", "segments", "switch", "slider", "progressView", "activityIndicatorView", "pageControl", "stepper", "size", "stackView", "scene", "tabBar", "tabBarItem" ] )
    
    init(contentsOf url:URL, template: Template ) {
        self.root = HTMLItem()
        self.url = url
        self.parserTemplate = NIBParserTemplate(contentOf: template )
    }        
        
    let semaphore = DispatchSemaphore(value: 0)
    func parse(){
                                        
        print("Parsing nib file: \(url.absoluteString)")
        guard let parser = XMLParser(contentsOf: url) else {
            print("Error. Invalid NIB or StoryBoard file.")
            return
        }

        parser.delegate = self
        parser.parse()
        _ = semaphore.wait(timeout: .distantFuture)
    }
    
    var initialViewControllerID:String? = nil
   // var storyBoardItems:[String:Any] = [:]

    var currentFileName:String? = nil
//    var currentFileContent:String? = nil
    var elementsStack:[ HTMLItem ] = []
    var currentElement:HTMLItem? = nil

    
    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        
        if elementName == "document" {
            initialViewControllerID = attributeDict["initialViewController"]
        }
        
//        if elementName == "viewController" || elementName == "navigationController" || elementName == "tableViewController" {
//            let item = push_new_element(elementName, attributeDict)
//
//            let id = attributeDict["id"]!
//            currentFileName = id + ".html"
//
//            storyBoardItems[id] = item.customClass
//
//            item.extraAttributes.append("data-root-view-controller=\"true\"")
//        }

        if elementName == "scene" { root = HTMLItem( ) }

        if supported_elements.contains( elementName ) {
            push_new_element( elementName, attributeDict.merging( g_default_attrs[ elementName ] ?? [:] ){ old, new in old } )
        }
        
//        else if elementName == "view" {
//        }
//        else if elementName == "navigationBar" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "navigationItem" {
//            let item = push_new_element(elementName, attributeDict)
//
//            item.classes.append("hidden")
//
//            if let key = attributeDict["key"] {
//                item.extraAttributes.append("data-navigation-key=\"" +  key + "\"")
//            }
//
//            if let title = attributeDict["title"] {
//                item.extraAttributes.append("data-navigation-title=\"" + title + "\"")
//            }
//        }
//        else if (elementName == "barButtonItem") {
//            let item = push_new_element(elementName, attributeDict)
//
//            if let key = attributeDict["key"] {
//                item.extraAttributes.append("data-bar-button-item-key=\"" + key + "\"")
//            }
//
//            if let title = attributeDict["title"] {
//                item.extraAttributes.append("data-bar-button-item-title=\"" + title + "\"")
//            }
//
//            if let image = attributeDict["image"] {
//                item.extraAttributes.append("data-bar-button-item-image=\"" + image + "\"")
//            }
//
//            if let systemItem = attributeDict["systemItem"] {
//                item.extraAttributes.append("data-bar-button-item-system=\"" + systemItem + "\"")
//            }
//        }
//        else if elementName == "label" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "button" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "textField" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "tableView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "tableViewCell" {
//            let item = push_new_element(elementName, attributeDict)
//
//            let reuseIdentifier = attributeDict["reuseIdentifier"]!
//            item.extraAttributes.append("data-cell-identifier=\"" + reuseIdentifier + "\"")
//
//            if let style = attributeDict["style"] {
//                item.extraAttributes.append("data-cell-style=\"" + style + "\"")
//            }
//
//            if let textLabelID = attributeDict["textLabel"] {
//                item.extraAttributes.append("data-cell-textlabel-id=\"" + textLabelID + "\"")
//            }
//        }
//        else if elementName == "tableViewCellContentView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "collectionView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "collectionViewFlowLayout" {
//            let item = push_new_element(elementName, attributeDict)
//
//            item.extraAttributes.append("data-collection-view-layout=\"true\"")
//
//            let scrollDirection = attributeDict["scrollDirection"]!
//            item.extraAttributes.append("data-collection-view-layout-direction=\"" + scrollDirection + "\"")
//        }
//        else if elementName == "collectionViewCell" {
//            let item = push_new_element(elementName, attributeDict)
////            let textLabelID = attributes["textLabel"]
//
//            let reuseIdentifier = attributeDict["reuseIdentifier"]!
//            item.extraAttributes.append("data-cell-identifier=\"" + reuseIdentifier + "\"")
//
//            if let style = attributeDict["style"] {
//                item.extraAttributes.append("data-cell-style=\"" + style + "\"")
//            }
//        }
//        else if elementName == "segmentedControl" {
//            push_new_element(elementName, attributeDict)
////
////            if let style = parse_segment_control_style(attributeDict["segmentControlStyle"]) {
////                item.classes.append(style)
////            }
//        }
//        else if elementName == "toolbar" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "imageView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "segment" {
//            push_new_element(elementName, attributeDict)
//            // currentElement!.content = currentElement!.content + "<div class=\"segment\"><span>" + attributeDict["title"]! + "</span></div>"
//        }
//        else if elementName == "switch" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "slider" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "progressView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "activityIndicatorView" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "pageControl" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "stepper" {
//            push_new_element(elementName, attributeDict)
//        }
//        else if elementName == "size" {
//            let item = push_new_element(elementName, attributeDict)
//
//            let key = attributeDict["key"]!
//            let width = attributeDict["width"]!
//            let height = attributeDict["height"]!
//
//            item.extraAttributes.append("data-key=\"" + key + "\"")
//            item.extraAttributes.append("data-type=\"size\"")
//            item.extraAttributes.append("data-width=\"" + width + "\"")
//            item.extraAttributes.append("data-height=\"" + height + "\"")
//        }
//        else if (elementName == "rect"){
//            // if (currentElement["CustomClass"] != "UITableViewCell") {
//            //     styles.push("position:relative;");
//            // }
//            // else {
//            //     styles.push("position:relative;");
//            // }
//
////            currentElement!.styles.append("position:absolute;")
////            if let x = attributeDict["x"] { currentElement!.styles.append("left:" + x + "px;") }
////            if let y = attributeDict["y"] { currentElement!.styles.append("top:" + y + "px;") }
////            if let w = attributeDict["width"] { currentElement!.styles.append("width:" + w + "px;") }
////            if let h = attributeDict["height"] { currentElement!.styles.append("height:" + h + "px;") }
//        }
//        else if (elementName == "color"){
////            var r = 0.0
////            var g = 0.0
////            var b = 0.0
////            if (attributeDict["white"] == "1") {
////                r = 255.0
////                g = 255.0
////                b = 255.0
////            } else if attributeDict["systemBackgroundColor"] == "1" {
////            } else {
////                r = Double(attributeDict["red"]!)! * 255.0
////                g = Double(attributeDict["green"]!)! * 255.0
////                b = Double(attributeDict["blue"]!)! * 255.0
////            }
////
////            let a = Double(attributeDict["alpha"]!)!
////
////            currentElement!.viewAttributes[ attributeDict[ "key" ]! ] = "rgba(\(r),\(g),\(b),\(a))"
//        }
        if elementName == "fontDescription" {
            if let size = attributeDict["pointSize"] {
                currentElement!.viewAttributes[ "fontSize" ] = size
            }
        }
        else if elementName == "state" { // this is found in the button
            if let title = attributeDict["title"] {
                currentElement!.viewAttributes[ "state-\(attributeDict["key"]!)" ] = title
            }
        }
        else if elementName == "action" {
            let selector = attributeDict["selector"]!
            
            var actionDiv = "<div class=\"hidden\" data-action-selector=\"" + selector.replacingOccurrences(of: "WithSender:", with: "Sender") + "\""
            if let eventType = attributeDict["eventType"] {
                actionDiv += " data-event-type=\"" + eventType + "\""
            }
            actionDiv += "></div>"
            currentElement!.content = currentElement!.content + actionDiv
        }
        else if elementName == "outlet" {
            let property = attributeDict["property"]!
            let destination = attributeDict["destination"]!

            let o = HTMLItemOutlet(property: property, destination: destination)
            currentElement!.outlets.append(o)
        }
        else if elementName == "segue" {
            
            let destination = attributeDict["destination"]!
            let kind = attributeDict["kind"]!
            let relationship = attributeDict["relationship"]
            let identifier = attributeDict["identifier"]
            
            let segue = HTMLItemSegue(destination: destination, kind: kind, identifier: identifier, relationship: relationship)
            currentElement!.segues.append(segue)
        }
        else if elementName == "constraint" {
            add_constraint( attributeDict )
        }
    }
    
    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        if elementName == "scene" {
            pop_element()
            write_html_file()
//            currentFileName = nil
//            currentFileContent = nil
        }
        else if supported_elements.contains( elementName ) {
            pop_element()
        }
    }
    
    func parserDidEndDocument(_ parser: XMLParser) {
        write_storyboard_file(name: (url.absoluteString) )
        semaphore.signal()
    }
               
    @discardableResult
    func push_new_element ( _ elementName: String, _ attributes: [String : String] ) -> HTMLItem {
        let id = attributes["id"]
        // let contenMode = parse_content_mode(attributes["contentMode"])
        
        let item = HTMLItem()
        item.identifier = id
        item.viewAttributes = attributes
        
        if elementName != "size" {
            var customClass = attributes["customClass"]
            if customClass == nil {
                customClass = "UI" + elementName.first!.uppercased() + elementName.dropFirst()
            }
            item.extraAttributes.append("data-class=\"" + customClass! + "\"")
            item.customClass = customClass
            item.templateClass = elementName
            
//            item.classes.append(parse_class_type(elementName))
//            if contenMode != nil {
//                item.classes.append(contenMode!)
//            }
        }
        
        if let tag = attributes["tag"] {
            item.extraAttributes.append("data-tag=\"" + tag + "\"")
        }

        elementsStack.append(item)
        currentElement = item

        return item
    }
    
    func add_constraint ( _ dict: [String:String] ) {
        // let item = elementsStack.last!

        if let constraint = parse_constraint( dict ) {
            // apply_constraint( &currentElement!, constraint )
            currentElement!.constraints.append( constraint )
        }
    }
    
    func parse_constraint ( _ dict: [String:String] ) -> Constraint? {
        let cte = dict[ "constant" ] != nil ? Int( dict[ "constant" ]! )! : 0
        let target = dict[ "firstItem" ]
        let target2 = dict[ "secondItem" ]

        switch dict[ "firstAttribute" ]! {
            case "leading", "trailing", "top", "bottom"  :
                return MarginConstraint( side:  margin_side( dict[ "firstAttribute"  ]! )
                                       , side2: margin_side( dict[ "secondAttribute" ]! )
                                       , value: cte
                                       , target
                                       , target2 )

            case "height"  : return SizeConstraint( isHorizontal: false, isFixed: true, size: cte )
            case "width"   : return SizeConstraint( isHorizontal: true , isFixed: true, size: cte )

            default:
                return nil
        }
    }
    
    func margin_side ( _ attr: String ) -> String {
        switch attr {
            case "leading" : return "left"
            case "trailing": return "right"
            case "top"     : return "top"
            case "bottom"  : return "bottom"
            default: return ""
        }
    }
    
    func pop_element() {
        let item = elementsStack.popLast()!
                
        var parentItem:HTMLItem? = nil
        
        if elementsStack.count > 0 {
            parentItem = elementsStack.last!
            parentItem!.subviews.append( item )
            currentElement = parentItem
        } else {
            root = item
        }
        
//        let content = parserTemplate.renderContent( classname: item.templateClass!
//                                                  , identifier: item.identifier
//                                                  , options:
//                                                    [ "class": item.classes.joined( separator: " "  )
//                                                    , "style" : item.styles .joined( separator: "; " )
//                                                    ]
//                                                  , childrens: item.content)
//        add_content_to_parent_item(content, &parentItem)
        
//        let classes = item.classes.count > 0 ? "class=\"" + item.classes.joined(separator: " ") + "\"" : ""
//        let styles = item.styles.count > 0 ? "style=\"" + item.styles.joined(separator: " ") + "\"" : ""
//        var content = item.content
//
//        if (item.outlets.count + item.segues.count) > 0 { content += "<div class=\"hidden\" data-connections=\"true\">" }
//
//        // Outlets
//        for o in item.outlets {
//            let prop = o.property
//            let dst = o.destination
//            content += "<div class=\"hidden\" data-connection-type=\"outlet\" data-outlet=\"\(dst)\" data-property=\"\(prop)\"></div>"
//        }
//
//        // Segues
//        for s in item.segues {
//
//            content += "<div class=\"hidden\" data-connection-type=\"segue\""
//            content += " data-segue-destination=\"\(s.destination)\""
//            content += " data-segue-kind=\"\(s.kind)\""
//            if let id = s.identifier { content += " data-segue-identifier=\"\(id)\"" }
//            if let rel = s.relationship { content += " data-segue-relationship=\"\(rel)\"" }
//            content += "></div>"
//        }
//
//        if (item.outlets.count + item.segues.count) > 0 { content += "</div>" }

//        add_content_to_parent_item("<div \(classes)", &parentItem)
//        if item.identifier != nil { add_content_to_parent_item(" id=\"\(item.identifier!)\"", &parentItem) }
//        add_content_to_parent_item(item.extraAttributes.joined(separator: " ") + styles + ">", &parentItem)
//        if item.content.count > 0 { add_content_to_parent_item(content, &parentItem) }
//        add_content_to_parent_item("</div>", &parentItem)
    }

//    func add_content_to_parent_item(_ content:String, _ item:inout HTMLItem?) {
//        if item == nil {
//            currentFileContent! += content
//        }
//        else {
//            item!.content += content;
//        }
//    }

    
    //
    // - parsers
    //
    
//    func parse_class_type(_ classType:String) -> String {
//        var formattedString = ""
//
//        for c in classType {
//            if String(c) == c.uppercased() {
//                formattedString += "-" + c.lowercased()
//            }
//            else {
//                formattedString += String(c)
//            }
//        }
//
//        return formattedString
//    }

    
    func parse_content_mode(_ contentMode:String?) -> String? {
        if contentMode == nil { return nil }
        
        switch (contentMode){
            case "scaleToFill": return "scale-to-fill"
            default:break
        }

        return nil
    }
    
//    func parse_text_alignment(_ align:String?) -> String? {
//        if align == nil { return nil }
//
//        switch (align) {
//            case "natural": return "align-left"
//            default: return "align-" + align!
//        }
//    }
//
//    func parse_button_type(_ type:String) -> String {
//
//        switch(type){
//            case "roundedRect": return "rounded-rect"
//            default: return "default"
//        }
//    }
//
//    func parse_border_style(_ style:String?) -> String? {
//        switch(style!) {
//            case "roundedRect": return "rounded-rect"
//            default: return nil
//        }
//    }
//
//    func parse_segment_control_style(_ style:String?) -> String? {
//
//        switch(style){
//            case "plain": return "plain"
//            default: return nil
//        }
//    }
//
//    func parse_color_key(key:String?) -> String? {
//        switch (key){
//            case "backgroundColor": return "background-color"
//            default: return nil
//        }
//    }
    
    func output_file_path(withFilename filename:String) -> String {
        let path = outputFolder != nil ? "\(outputFolder!)/\(filename)" : filename
        return path
    }
    
    func write_html_file() {
        let content = generate_html( root )
        let path = output_file_path(withFilename: root.viewAttributes[ "sceneID" ]! + ".html" )
        try? content.write(toFile: path, atomically: true, encoding: .utf8)
    }
    
    func generate_html ( _ view: HTMLItem ) -> String {
        func join_non_empty ( _ arr: [String], _ separator: String ) -> String {
            return arr.filter{ $0.trimmingCharacters(in: .whitespaces ).count > 0 }.joined( separator: separator )
        }
        
        var view = view
        
        sort_subviews( &view )
        
        for c in view.constraints {
            if let target = c.target {
                var sub_view = view.subviews.first{ $0.identifier == target }
                
                if sub_view != nil {
                    apply_constraint( &sub_view!, c )
                } else {
                    sub_view = view.subviews.first{ $0.identifier == c.target2! }
                    
                    if sub_view != nil {
                        apply_constraint( &sub_view!, c.invert( ) )
                    }
                }
            } else {
                apply_constraint( &view, c )
            }
        }
        
        return parserTemplate.renderContent( classname: view.templateClass!
                                           , identifier: view.identifier
                                           , options:
                                            [ "class": join_non_empty( view.classes, " "  )
                                            , "style": join_non_empty( view.styles , "; " )
                                            ].merging( view.viewAttributes ){ old, new in old }
                                           , childrens: view.subviews.map{ generate_html( $0 ) }.joined( )
                                           )
    }

    
    func apply_constraint ( _ item: inout HTMLItem, _ c: Any ) {
        if let margin = c as? MarginConstraint {
            if margin.value != 0 {
                item.styles.append( "margin-\(margin.side): \(margin.value)px" )
            }
        } else if let size = c as? SizeConstraint {
            if size.isHorizontal {
                if size.isFixed {
                    item.styles.append( "width: \(size.size)px" )
                } else {
                    // item.classes.append( "d-flex" )
                }
            } else {
                if size.isFixed {
                    item.styles.append( "height: \(size.size)px" )
                } else {
                    // item.classes.append( "d-flex" )
                }
            }
        }
    }

    
    func sort_subviews ( _ view: inout HTMLItem ) {
        var on_top: [ String: String ] = [:]
        
        if view.constraints.count == 0 { return }
        
        for c in view.constraints {
            if let margin = c as? MarginConstraint {
                if margin.side == "top" {
                    on_top[ margin.target! ] = margin.target2!
                }
            }
        }
        
        for sv in view.subviews {
            if sv.order > 0 { continue }
            
            if on_top[ sv.identifier! ] == nil {
                sv.order = 1
            } else {
                var order = 1
                var visited: Set<String> = Set( )
                
                var current = on_top[ sv.identifier! ]
                
                while current != nil && !visited.contains( current! ) {
                    visited.insert( current! )
                    order += 1
                    current = on_top[ current! ]
                }
                
                sv.order = order
            }
        }
        
        view.subviews.sort{ $0.order < $1.order }
    }

    
    func write_storyboard_file(name:String) {
        
        var item:[String:Any] = [:]
        item["InitialViewControllerID"] = initialViewControllerID
        // item["ClassByID"] = storyBoardItems

        guard let content = try? JSONSerialization.data(withJSONObject: item, options: []) else { return }
        
        let filename = name.replacingOccurrences(of: "storyboard", with: "json")
        let path = output_file_path(withFilename: filename)
        
        try? content.write(to: URL(fileURLWithPath: path))
    }


}
