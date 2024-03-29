import { IndexPath, NSClassFromString } from "foundation";
import { UIGestureRecognizer, UIGestureRecognizerState } from "./UIGestureRecognizer";
import { UITableViewCell } from "./UITableViewCell";
import { UIView } from "./UIView";

export class UITableView extends UIView
{
    dataSource = null;
    delegate = null;

    allowsMultipleSelection = false;

    // initWithLayer(layer, owner, options?){
    //     super.initWithLayer(layer, owner, options);
    //     layer.style.width = "100%";
    //     layer.style.overflowY = "scroll";

    //     // Check if we have prototypes
    //     if (this.layer.childNodes.length > 0) {
    //         for (let index = 0; index < this.layer.childNodes.length; index++) {
    //             let subLayer = this.layer.childNodes[index];

    //             if (subLayer.tagName != "DIV")
    //                 continue;

    //             if (subLayer.getAttribute("data-cell-identifier") != null) {
    //                 this.addCellPrototypeWithLayer(subLayer);                    
    //             }
    //             else if (subLayer.getAttribute("data-tableview-header") != null) {
    //                 this.addHeaderWithLayer(subLayer);
    //             }
    //             else if (subLayer.getAttribute("data-tableview-footer") != null) {
    //                 this.addFooterWithLayer(subLayer);
    //             }
    //         }
    //     }        
    // }

    private headerLayer = null;
    private addHeaderWithLayer(layer){    
        layer.style.display = "none";    
        let cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null) cellClassname = "MUIView";
     
        let item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        this.headerLayer = item;
    }

    private cellPrototypes = {};
    private addCellPrototypeWithLayer(layer){
        layer.style.display = "none";
        let cellIdentifier = layer.getAttribute("data-cell-identifier");
        let cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null) cellClassname = "MUITableViewCell";

        let item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;

        this.cellPrototypes[cellIdentifier] = item;
    }

    private footerLayer = null;
    private addFooterWithLayer(layer){
        layer.style.display = "none";
        let cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null) cellClassname = "MUIView";
     
        let item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        this.footerLayer = item;
    } 
    
    dequeueReusableCellWithIdentifier(identifier:string): UITableViewCell {
        let item = this.cellPrototypes[identifier];

        let cell: UITableViewCell = null;        
        let className = item["class"];
        cell = NSClassFromString(className);
        //cell.reuseIdentifier = identifier;

        let layer = item["layer"];
        if (layer != null) {
            let newLayer = layer.cloneNode(true);
            newLayer.style.display = "";   
            let layerID = newLayer.getAttribute("id");
            if (layerID != null) cell._outlets[layerID] = cell;    
            cell.initWithLayer(newLayer, cell);         
            cell.awakeFromNib();            
        }

        // let tapGesture = new MUITapGestureRecognizer();
        // tapGesture.initWithTarget(this, this.cellDidTap);
        // cell.addGestureRecognizer(tapGesture);

        // cell._target = this;
        // cell._onClickFn = this.cellOnClickFn;
        //cell._onDblClickFn = this.cellOnDblClickFn;
        //cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        // cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;

        // return _injectIntoOptional(cell);
        return cell;
    }


    private rows = [];    
    private sections = [];
    private cells = [];

    private addSectionHeader(section){
        let header = null;
        if (typeof this.dataSource[0].viewForHeaderInSection === "function") header = this.dataSource[0].viewForHeaderInSection(this, section) as UIView;        
        if (header == null) return;
        header.hidden = false;
        this.addSubview(header);
    }

    private addCell(indexPath:IndexPath){
        let cell = this.dataSource[0].tableViewCellForRowAt(this, indexPath) as UITableViewCell;
        let section = this.sections[indexPath.section];                
                
        let nextIP = this.nextIndexPath(indexPath);
        let currentCell = this.cellAtIndexPath(indexPath);
        if (currentCell != null) {
            let index = this.rows.indexOf(currentCell);
            this.insertSubviewAboveSubview(cell, currentCell);
            this.rows.splice(index, 0, cell);
        }
        else if (nextIP != null){
            let nextCell = this.cellAtIndexPath(nextIP);
            let index = this.rows.indexOf(nextCell);
            this.insertSubviewAboveSubview(cell, nextCell);
            this.rows.splice(index, 0, cell);
        }
        else {
            this.addSubview(cell);
            this.rows.push(cell);
        }

        // Update section
        cell._section = section;        
        if (indexPath.row < section.length - 1) {
            section.splice(indexPath.row, 0, cell);
        }
        else {
            section.addObject(cell);
        }        

        cell._target = this;
        cell._onClickFn = this.cellOnClickFn;
        //cell._onDblClickFn = this.cellOnDblClickFn;
        //cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;
    }

    private removeCell(indexPath){        
        let section = this.sections[indexPath.section];
        let cell = section[indexPath.row];
        
        section.removeObjectAtIndex(indexPath.row);
        this.rows.removeObject(cell);

        cell.removeFromSuperview();
    }

    private nextIndexPath(indexPath:IndexPath){        
        let sectionIndex = indexPath.section;
        let rowIndex = indexPath.row + 1;

        if (sectionIndex >= this.sections.length) return null;
        let section = this.sections[sectionIndex];
        if (rowIndex < section.length) return IndexPath.indexForRowInSection(rowIndex, sectionIndex);

        sectionIndex++;        
        if (sectionIndex >= this.sections.length) return null;
        section = this.sections[sectionIndex];
        if (section.length == 0) return null;

        return IndexPath.indexForRowInSection(0, sectionIndex);
    }

    private addSectionFooter(section){

    }

    reloadData(){
        // Remove all subviews
        for (let index = 0; index < this.rows.length; index++) {
            let row = this.rows[index];
            row.removeFromSuperview();                            
        }

        this.rows = [];        
        this.sections = [];
        this.cells = [];
    
        if (this.dataSource == null) return;

        let sections = 1;
        if (typeof this.dataSource[0].numberOfSectionsIn === "function") sections = this.dataSource[0].numberOfSectionsIn(this);
        
        for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {            
            let section = [];                                    
            this.sections.push(section);
            
            let rows = this.dataSource[0].tableViewNumberOfRowsInSection(this, sectionIndex);
            if (rows == 0) continue;
            
            this.addSectionHeader(sectionIndex);
            
            for (let cellIndex = 0; cellIndex < rows; cellIndex++) {
                let ip = IndexPath.indexForRowInSection(cellIndex, sectionIndex);
                this.addCell(ip);
            }

            this.addSectionFooter(sectionIndex);                        
        }
    }

    insertRowsAtIndexPaths(indexPaths, rowAnimation){
        for (let index = 0; index < indexPaths.length; index++){
            let ip = indexPaths[index];
            this.addCell(ip);
        }        
    }

    deleteRowsAtIndexPaths(indexPaths, rowAnimation){
        for (let index = 0; index < indexPaths.length; index++){
            let ip = indexPaths[index];
            this.removeCell(ip);
        }
    }

    cellAtIndexPath(indexPath:IndexPath){
        if (indexPath.section >= this.sections.length) return null;
        let section = this.sections[indexPath.section];
        if (indexPath.row >= section.length) return null;
        return section[indexPath.row];
    }

    indexPathForCell(cell: UITableViewCell): IndexPath {
        let section = cell._section;
        let sectionIndex = this.sections.indexOf(section);
        let rowIndex = section.indexOf(cell);

        return IndexPath.indexForRowInSection(rowIndex, sectionIndex);
    }


    private cellDidTap(gesture:UIGestureRecognizer){
        if (gesture.state != UIGestureRecognizerState.Ended) return;
        let cell = gesture.view as UITableViewCell;
        let section = cell._section;
        let sectionIndex = this.sections.indexOf(section);
        let rowIndex = section.indexOfObject(cell);
        
        if (this.delegate != null && typeof this.delegate.didSelectCellAtIndexPath === "function") {
            this.delegate.didSelectCellAtIndexPath(this, IndexPath.indexForRowInSection(rowIndex, sectionIndex));
        }                

    }

    private cellOnClickFn(cell: UITableViewCell) {

        let indexPath = this.indexPathForCell(cell);

        let canSelectCell = true;

        if (this.delegate != null) {
            if (typeof this.delegate.canSelectCellAtIndexPath === "function")
                canSelectCell = this.delegate.canSelectCellAtIndexPath(this, indexPath);
        }

        if (canSelectCell == false)
            return;

        if (this.allowsMultipleSelection == false) {                        
            cell.selected = true;
            if (this.delegate != null && typeof this.delegate.didSelectCellAtIndexPath === "function") {
                this.delegate.didSelectCellAtIndexPath(this, indexPath);
            }                                        
        }
        else {
            //TODO:
        }

    }

    private cellOnEditingAccessoryClickFn(cell:UITableViewCell) {
        let indexPath = this.indexPathForCell(cell);

        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            let editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
        
            if (this.delegate != null && typeof this.delegate.commitEditingStyleForRowAtIndexPath === "function") {
                this.delegate.commitEditingStyleForRowAtIndexPath(this, editingStyle, indexPath);
            }
        }
    }

}


class UITableViewSection extends UIView 
{
    static section(){

    }
}

class UITableViewRow extends UIView 
{
    static rowWithSectionAndCell(section, cell){
        let row = new UITableViewRow();
        row.init();
        row.section = section;
        row.cell = cell;
    }

    section = null;
    cell = null;
}

export class UITableViewCellContentView extends UIView
{

}