import { IndexPath, NSCoder } from "foundation";
import { UIGestureRecognizer, UIGestureRecognizerState } from "./UIGestureRecognizer";
import { UITapGestureRecognizer } from "./UITapGestureRecognizer";
import { UITableViewCell, UITableViewCellSelectionStyle } from "./UITableViewCell";
import { UIView } from "./UIView";
import { CATableLayer } from "./CoreAnimation/CATableLayer";


export interface UITableViewDatasource
{
    numberOfSections ( tableView:UITableView ) : number ;
    numberOfRowsInSection ( tableView:UITableView, section:number ) : number ;    
    cellForRowAt ( tableView: UITableView, indexPath: IndexPath ) : UITableViewCell ;

    viewForHeaderInSection? ( tableView:UITableView, section:number ) : UIView ;
}

export interface UITableViewDelegate
{
    didSelectCellAtIndexPath? ( tableView: UITableView, indexPath: IndexPath ) : void ;
    canSelectCellAtIndexPath? (collectionView: UITableView, indexPath: IndexPath) : boolean ;    
    
    willDisplayCellAtIndexPath? ( tableView: UITableView, cell:UITableViewCell, indexPath: IndexPath ) : void ;
    didEndDisplayingCellAtIndexPath? ( tableView: UITableView, cell:UITableViewCell, indexPath: IndexPath ) : void ;
}

export class UITableView extends UIView
{
    static get layerClass() : any { return CATableLayer }

    dataSource:UITableViewDatasource = null;
    delegate:UITableViewDelegate = null;

    allowsMultipleSelection = false;
    
    contentView:UIView = null;

    initWithCoder( coder: NSCoder ): void {
        super.initWithCoder( coder );

        this.contentView = (this.layer as CATableLayer).newContentView() as UIView;
        this.addSubview( this.contentView );
    }

    dequeueReusableCellWithIdentifier(identifier:string): UITableViewCell {
        let cell = (this.layer as CATableLayer).newCellViewByIdentifier( identifier );

        return cell;
    }


    private rows = [];    
    private sections = [];
    private cells = [];

    private addSectionHeader(section:number){
        let header = null;
        if (typeof this.dataSource.viewForHeaderInSection === "function") header = this.dataSource.viewForHeaderInSection(this, section) as UIView;
        if (header == null) return;
        header.hidden = false;
        this.contentView.addSubview(header);
    }

    private addCell(indexPath:IndexPath){
        let cell = this.dataSource.cellForRowAt(this, indexPath) as UITableViewCell;
        let section = this.sections[indexPath.section];                
                
        let nextIP = this.nextIndexPath(indexPath);
        let currentCell = this.cellAtIndexPath(indexPath);
        if (currentCell != null) {
            let index = this.rows.indexOf(currentCell);
            this.contentView.insertSubviewAboveSubview(cell, currentCell);
            this.rows.splice(index, 0, cell);
        }
        else if (nextIP != null){
            let nextCell = this.cellAtIndexPath(nextIP);
            let index = this.rows.indexOf(nextCell);
            this.contentView.insertSubviewAboveSubview(cell, nextCell);
            this.rows.splice(index, 0, cell);
        }
        else {
            this.contentView.addSubview(cell);
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

        if (cell.selectionStyle != UITableViewCellSelectionStyle.none) {
            let tapGesture = new UITapGestureRecognizer();
            tapGesture.initWithTarget(this, this.cellDidTap.bind(this));
            cell.addGestureRecognizer( tapGesture );
        }
        //cell._onDblClickFn = this.cellOnDblClickFn;
        //cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;
    }

    private removeCell(indexPath:IndexPath){        
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

    private addSectionFooter(section:number){

    }

    reloadData(){
        // // Remove all subviews
        // for (let index = 0; index < this.rows.length; index++) {
        //     let row = this.rows[index];
        //     row.removeFromSuperview();                            
        // }

        for (let i = this.contentView.subviews.length - 1; i >= 0; i--) {
            let subview = this.contentView.subviews[i];
            subview.removeFromSuperview();
        }

        this.rows = [];        
        this.sections = [];
        this.cells = [];
    
        if (this.dataSource == null) return;

        let sections = 1;
        if (typeof this.dataSource.numberOfSections === "function") sections = this.dataSource.numberOfSections(this);
        
        for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
            let section = [];                                    
            this.sections.push(section);
            
            let rows = this.dataSource.numberOfRowsInSection(this, sectionIndex);
            if (rows == 0) continue;
            
            this.addSectionHeader(sectionIndex);
            
            for (let cellIndex = 0; cellIndex < rows; cellIndex++) {
                let ip = IndexPath.indexForRowInSection(cellIndex, sectionIndex);
                this.addCell(ip);
            }

            this.addSectionFooter(sectionIndex);                        
        }
    }

    insertRowsAtIndexPaths(indexPaths:IndexPath[], rowAnimation){
        for (let index = 0; index < indexPaths.length; index++){
            let ip = indexPaths[index];
            this.addCell(ip);
        }        
    }

    deleteRowsAtIndexPaths(indexPaths:IndexPath[], rowAnimation){
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
        
        let indexPath = IndexPath.indexForRowInSection(rowIndex, sectionIndex);

        let canSelectCell = true;

        if (this.delegate != null) {
            if (typeof this.delegate.canSelectCellAtIndexPath === "function")
                canSelectCell = this.delegate.canSelectCellAtIndexPath(this, indexPath);
        }

        if (canSelectCell == false) return;

        // TODO: Add support for multiple selection

        cell.setSelected(true, true);
        if (this.delegate != null && typeof this.delegate.didSelectCellAtIndexPath === "function") {
            this.delegate.didSelectCellAtIndexPath(this, indexPath);
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
            cell.setSelected(true, true);
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

        // if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
        //     let editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
        
        //     if (this.delegate != null && typeof this.delegate.commitEditingStyleForRowAtIndexPath === "function") {
        //         this.delegate.commitEditingStyleForRowAtIndexPath(this, editingStyle, indexPath);
        //     }
        // }
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