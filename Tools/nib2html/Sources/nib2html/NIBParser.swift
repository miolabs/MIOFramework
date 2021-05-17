//
//  File.swift
//  
//
//  Created by Javier Segura Perez on 1/5/21.
//

import Foundation

class HTMLItem
{
    var identifier:String?
    var templateClass:String?
    var content:String = ""
    var styles:[String] = []
    var classes:[String] = []
    var customClass:String? = nil
    var extraAttributes:[String] = []
    var outlets:[HTMLItemOutlet] = []
    var segues:[HTMLItemSegue] = []
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


class NIBParser : NSObject, XMLParserDelegate
{
    let url:URL
    let parserTemplate:NIBParserTemplate
    var outputFolder:String?
    
    init(contentsOf url:URL, templateURL:URL) {
        self.url = url
        self.parserTemplate = NIBParserTemplate(contentOf: templateURL.standardizedFileURL)
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
    var storyBoardItems:[String:Any] = [:]

    var currentFileName:String? = nil
    var currentFileContent:String? = nil
    var elementsStack:[ HTMLItem ] = []
    var currentElement:HTMLItem? = nil

    
    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String] = [:]) {
        
        if elementName == "document" {
            initialViewControllerID = attributeDict["initialViewController"]
        }
        
        if elementName == "scene" {
//            let id = attributes["sceneID"]
            currentFileContent = "<!DOCTYPE html><html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"base.css\"></head><body>"
        }
        else if elementName == "viewController" || elementName == "navigationController" || elementName == "tableViewController" {
            var item = push_new_element(elementName, attributeDict)
            
            let id = attributeDict["id"]!
            currentFileName = id + ".html"
            
            storyBoardItems[id] = item.customClass

            item.extraAttributes.append("data-root-view-controller=\"true\"")
        }
        else if elementName == "view" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "navigationBar" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "navigationItem" {
            var item = push_new_element(elementName, attributeDict)

            item.classes.append("hidden")
            
            if let key = attributeDict["key"] {
                item.extraAttributes.append("data-navigation-key=\"" +  key + "\"")
            }
            
            if let title = attributeDict["title"] {
                item.extraAttributes.append("data-navigation-title=\"" + title + "\"")
            }
        }
        else if (elementName == "barButtonItem") {
            var item = push_new_element(elementName, attributeDict)

            if let key = attributeDict["key"] {
                item.extraAttributes.append("data-bar-button-item-key=\"" + key + "\"")
            }

            if let title = attributeDict["title"] {
                item.extraAttributes.append("data-bar-button-item-title=\"" + title + "\"")
            }

            if let image = attributeDict["image"] {
                item.extraAttributes.append("data-bar-button-item-image=\"" + image + "\"")
            }

            if let systemItem = attributeDict["systemItem"] {
                item.extraAttributes.append("data-bar-button-item-system=\"" + systemItem + "\"")
            }
        }
        else if elementName == "label" {
            var item = push_new_element(elementName, attributeDict)
            
            if let align = parse_text_alignment(attributeDict["textAlignment"]) {
                item.classes.append(align)
            }

            if let text = attributeDict["text"] {
                item.content = item.content + "<span>" + text + "</span>"
            }
        }
        else if elementName == "button" {
            var item = push_new_element(elementName, attributeDict)

            if let align = parse_text_alignment(attributeDict["textAlignment"]) {
                item.classes.append(align)
            }

            let type = parse_button_type(attributeDict["buttonType"]!)
            item.classes.append(type)
        }
        else if elementName == "textField" {
            var item = push_new_element(elementName, attributeDict)
            
            if let align = parse_text_alignment(attributeDict["textAlignment"]) {
                item.classes.append(align)
            }

            var inputAttrs:[String] = []
            if let attrText = attributeDict["text"] {
                inputAttrs.append("value='" + attrText + "'")
            }
            
            if let attrPlaceholder = attributeDict["placeholder"] {
                inputAttrs.append("placeholder='" + attrPlaceholder + "'")
            }
            
            if let borderStyle = parse_border_style(attributeDict["borderStyle"]) {
                inputAttrs.append(borderStyle)
            }

            item.content = item.content + "<input type=\"text\" " + inputAttrs.joined(separator: " ") + ">"
        }
        else if elementName == "tableView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "tableViewCell" {
            var item = push_new_element(elementName, attributeDict)
                                    
            let reuseIdentifier = attributeDict["reuseIdentifier"]!
            item.extraAttributes.append("data-cell-identifier=\"" + reuseIdentifier + "\"")
            
            if let style = attributeDict["style"] {
                item.extraAttributes.append("data-cell-style=\"" + style + "\"")
            }
            
            if let textLabelID = attributeDict["textLabel"] {
                item.extraAttributes.append("data-cell-textlabel-id=\"" + textLabelID + "\"")
            }
        }
        else if elementName == "tableViewCellContentView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "collectionView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "collectionViewFlowLayout" {
            var item = push_new_element(elementName, attributeDict)
            
            item.extraAttributes.append("data-collection-view-layout=\"true\"")

            let scrollDirection = attributeDict["scrollDirection"]!
            item.extraAttributes.append("data-collection-view-layout-direction=\"" + scrollDirection + "\"")
        }
        else if elementName == "collectionViewCell" {
            var item = push_new_element(elementName, attributeDict)
//            let textLabelID = attributes["textLabel"]

            let reuseIdentifier = attributeDict["reuseIdentifier"]!
            item.extraAttributes.append("data-cell-identifier=\"" + reuseIdentifier + "\"")

            if let style = attributeDict["style"] {
                item.extraAttributes.append("data-cell-style=\"" + style + "\"")
            }
        }
        else if elementName == "segmentedControl" {
            var item = push_new_element(elementName, attributeDict)

            if let style = parse_segment_control_style(attributeDict["segmentControlStyle"]) {
                item.classes.append(style)
            }
        }
        else if elementName == "toolbar" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "imageView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "segment" {
            currentElement!.content = currentElement!.content + "<div class=\"segment\"><span>" + attributeDict["title"]! + "</span></div>"
        }
        else if elementName == "switch" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "slider" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "progressView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "activityIndicatorView" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "pageControl" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "stepper" {
            push_new_element(elementName, attributeDict)
        }
        else if elementName == "size" {
            var item = push_new_element(elementName, attributeDict)

            let key = attributeDict["key"]!
            let width = attributeDict["width"]!
            let height = attributeDict["height"]!

            item.extraAttributes.append("data-key=\"" + key + "\"")
            item.extraAttributes.append("data-type=\"size\"")
            item.extraAttributes.append("data-width=\"" + width + "\"")
            item.extraAttributes.append("data-height=\"" + height + "\"")
        }
        else if (elementName == "rect"){
            // if (currentElement["CustomClass"] != "UITableViewCell") {
            //     styles.push("position:relative;");
            // }
            // else {
            //     styles.push("position:relative;");
            // }

            currentElement!.styles.append("position:absolute;")
            if let x = attributeDict["x"] { currentElement!.styles.append("left:" + x + "px;") }
            if let y = attributeDict["y"] { currentElement!.styles.append("top:" + y + "px;") }
            if let w = attributeDict["width"] { currentElement!.styles.append("width:" + w + "px;") }
            if let h = attributeDict["height"] { currentElement!.styles.append("height:" + h + "px;") }
        }
        else if (elementName == "color"){
//            guard let key = parse_color_key(key: attributeDict["key"]) else { return }
//
//            var r = 0.0
//            var g = 0.0
//            var b = 0.0
//            if (attributeDict["white"] == "1") {
//                r = 255.0
//                g = 255.0
//                b = 255.0
//            }
//            if attributeDict["systemBackgroundColor"] == "1" {
//            }
//            else {
//                r = Double(attributeDict["red"]!)! * 255.0
//                g = Double(attributeDict["green"]!)! * 255.0
//                b = Double(attributeDict["blue"]!)! * 255.0
//            }
//
//            let a = Double(attributeDict["alpha"]!)!
//
//            let value = key + ":rgba(\(r),\(g),\(b),\(a));"
//            currentElement!.styles.append(value)
        }
        else if elementName == "fontDescription" {
            if let size = attributeDict["pointSize"] {
                currentElement!.styles.append("font-size:" + size + "px;")
            }
        }
        else if elementName == "state" {
            if let title = attributeDict["title"] {
                currentElement!.content = currentElement!.content + "<span>" + title + "</span>"
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
    }
    
    func parser(_ parser: XMLParser, didEndElement elementName: String, namespaceURI: String?, qualifiedName qName: String?) {
        
        if elementName == "scene" {
            currentFileContent! += "</body></html>"
            write_html_file()
            currentFileName = nil
            currentFileContent = nil
        }
        else if elementName == "viewController" || elementName == "navigationController" || elementName == "tableViewController" {
            pop_element()
        }
        else if elementName == "view" {
            pop_element()
        }
        else if elementName == "navigationBar" {
            pop_element()
        }
        else if elementName == "navigationItem" {
            pop_element()
        }
        else if elementName == "barButtonItem" {
            pop_element()
        }
        else if elementName == "label" {
            pop_element()
        }
        else if elementName == "button" {
            pop_element()
        }
        else if elementName == "textField" {
            pop_element()
        }
        else if elementName == "tableView" {
            pop_element()
        }
        else if elementName == "tableViewCell" {
            pop_element()
        }
        else if elementName == "tableViewCellContentView" {
            pop_element()
        }
        else if elementName == "collectionView" {
            pop_element()
        }
        else if elementName == "collectionViewFlowLayout" {
            pop_element()
        }
        else if elementName == "collectionViewCell" {
            pop_element()
        }
        else if elementName == "toolbar" {
            pop_element()
        }
        else if elementName == "imageView" {
            pop_element()
        }
        else if elementName == "segmentedControl" {
            pop_element()
        }
        else if elementName == "switch" {
            pop_element()
        }
        else if elementName == "slider" {
            pop_element()
        }
        else if elementName == "progressView" {
            pop_element()
        }
        else if elementName == "activityIndicatorView" {
            pop_element()
        }
        else if elementName == "pageControl" {
            pop_element()
        }
        else if elementName == "stepper" {
            pop_element()
        }
        else if elementName == "size" {
            pop_element()
        }
    }
    
    func parserDidEndDocument(_ parser: XMLParser) {
        write_storyboard_file(name: (url.absoluteString) )
        semaphore.signal()
    }
               
    @discardableResult
    func push_new_element(_ elementName:String, _ attributes:[String : String]) -> HTMLItem {
        let id = attributes["id"]
        let contenMode = parse_content_mode(attributes["contentMode"])
        
        let item = HTMLItem()
        item.identifier = id
        
        if elementName != "size" {
            var customClass = attributes["customClass"]
            if customClass == nil {
                customClass = "UI" + elementName.first!.uppercased() + elementName.dropFirst()
            }
            item.extraAttributes.append("data-class=\"" + customClass! + "\"")
            item.customClass = customClass
            item.templateClass = elementName
            
            item.classes.append(parse_class_type(elementName))
            if contenMode != nil {
                item.classes.append(contenMode!)
            }
        }
        
        if let tag = attributes["tag"] {
            item.extraAttributes.append("data-tag=\"" + tag + "\"")
        }

        elementsStack.append(item)
        currentElement = item

        return item
    }
    
    func pop_element() {
        let item = elementsStack.popLast()!
                
        var parentItem:HTMLItem? = nil
        
        if elementsStack.count > 0 {
            parentItem = elementsStack[elementsStack.count - 1]
            currentElement = parentItem
        }

        let content = parserTemplate.renderContent(classname: item.templateClass!, identifier: item.identifier, options: [], childrens: item.content)
        add_content_to_parent_item(content, &parentItem)
        
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
    
    func add_content_to_parent_item(_ content:String, _ item:inout HTMLItem?) {
        if item == nil {
            currentFileContent! += content
        }
        else {
            item!.content += content;
        }
    }

    
    //
    // - parsers
    //
    
    func parse_class_type(_ classType:String) -> String {
        var formattedString = ""
        
        for c in classType {
            if String(c) == c.uppercased() {
                formattedString += "-" + c.lowercased()
            }
            else {
                formattedString += String(c)
            }
        }
        
        return formattedString
    }

    
    func parse_content_mode(_ contentMode:String?) -> String? {
        if contentMode == nil { return nil }
        
        switch (contentMode){
            case "scaleToFill": return "scale-to-fill"
            default:break
        }

        return nil
    }
    
    func parse_text_alignment(_ align:String?) -> String? {
        if align == nil { return nil }
                
        switch (align) {
            case "natural": return "align-left"
            default: return "align-" + align!
        }
    }
    
    func parse_button_type(_ type:String) -> String {

        switch(type){
            case "roundedRect": return "rounded-rect"
            default: return "default"
        }
    }
    
    func parse_border_style(_ style:String?) -> String? {
        switch(style!) {
            case "roundedRect": return "rounded-rect"
            default: return nil
        }
    }

    func parse_segment_control_style(_ style:String?) -> String? {

        switch(style){
            case "plain": return "plain"
            default: return nil
        }
    }
    
    func parse_color_key(key:String?) -> String? {
        switch (key){
            case "backgroundColor": return "background-color"
            default: return nil
        }
    }
    
    func output_file_path(withFilename filename:String) -> String {
        let path = outputFolder != nil ? "\(outputFolder!)/\(filename)" : filename
        return path
    }
    
    func write_html_file() {
        let path = output_file_path(withFilename: currentFileName!)
        try? currentFileContent!.write(toFile: path, atomically: true, encoding: .utf8)
    }
    
    func write_storyboard_file(name:String) {
        
        var item:[String:Any] = [:]
        item["InitialViewControllerID"] = initialViewControllerID
        item["ClassByID"] = storyBoardItems

        guard let content = try? JSONSerialization.data(withJSONObject: item, options: []) else { return }
        
        let filename = name.replacingOccurrences(of: "storyboard", with: "json")
        let path = output_file_path(withFilename: filename)
        
        try? content.write(to: URL(fileURLWithPath: path))
    }


}
