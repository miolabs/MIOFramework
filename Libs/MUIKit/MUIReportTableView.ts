import { UIView, UILayerGetFirstElementWithTag } from "./UIView";
import { MIOObject, MIOFormatter, MIOIndexPath, MIOSize, MIORange, MIONumberFormatter, MIODateFormatter } from "../MIOFoundation";
import { UILabel } from "./UILabel";
import { UIScrollView } from "./UIScrollView";
import { UITableView } from "./UITableView";

export enum UIReportTableViewCellType {
    Custom,
    Label,
    Combox
}

export class UIReportTableViewCell extends UIView {

    type = UIReportTableViewCellType.Custom;

    label: UILabel = null;

    private _target = null;
    private _onClickFn = null;
    private parentRow = null;

    init(){
        super.init();
        this.setupLayer();
    }

    initWithLayer(layer, owner, options) {
        super.initWithLayer(layer, owner, options);

        //this.layer.style.background = "";
        this.layer.classList.add("tableviewcell_deselected_color");

        if (this.type == UIReportTableViewCellType.Label) {

            let labelLayer = UILayerGetFirstElementWithTag(layer, "LABEL");
            if (labelLayer != null) {
                this.label = new UILabel();
                this.label.initWithLayer(labelLayer, this);
                this.addSubview(this.label);
            }
        }

        var instance = this;
        this.layer.onclick = function () {
            if (instance._onClickFn != null)
                instance._onClickFn.call(instance._target, instance);
        };

        // this.layer.ondblclick = function () {
        //     if (instance._onDblClickFn != null)
        //         instance._onDblClickFn.call(instance._target, instance);
        // };

        this.setupLayer();
    }

    private setupLayer(){
        this.layer.style.position = "absolute";
    }

}

export class UIReportTableViewRow extends MIOObject {
    cells = [];
    y = 0;
    height = 0;

    removeFromSuperview() {
        for (let index = 0; index < this.cells.length; index++) {
            let cell: UIReportTableViewCell = this.cells[index];
            cell.removeFromSuperview();
        }
        //super.removeFromSuperview();
        this.cells = [];
    }
}

export enum UIReportTableViewColumnType {
    String,
    Number,
    Date
}

export class UIReportTableViewColumn extends MIOObject {

    static labelColumnWithTitle(title: string, width, minWidth, alignment, key?, formatter?:MIOFormatter, identifier?: string, formatterString?:string) {
        let col = new UIReportTableViewColumn();
        col.title = title;
        col.identifier = identifier;
        col.width = width;
        col.minWidth = minWidth;
        col.serverName = key;
        col.alignment = alignment;
        col.formatter = formatter;
        if (formatter instanceof MIONumberFormatter) col.type = UIReportTableViewColumnType.Number;
        else if (formatter instanceof MIODateFormatter) col.type = UIReportTableViewColumnType.Date;
        if (formatterString != null) col.formatterString = formatterString;
        return col;
    }

    identifier: string = null;
    title: string = null;
    width:string = "0"; 
    minWidth = 0;
    serverName: string = null;
    pixelWidth = 0;
    alignment = "center";
    formatter:MIOFormatter = null;
    formatterString:string = "string";
    ascending = true;
    type = UIReportTableViewColumnType.String;


    private _colHeader: UIView = null;

    _target = null;
    _onHeaderClickFn = null;

    setColumnHeaderView(header){
        this._colHeader = header;
    }

    columnHeaderView() {
        if (this._colHeader != null)
            return this._colHeader;

        let header = new UIView();
        header.init();
        header.setHeight(30);
        header.layer.style.background = "";        
        header.layer.style.position = "absolute";    
        header.layer.style.margin = "8px 8px";
        header.layer.classList.remove("view");
        header.layer.classList.add("header");

        let titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.layer.style.background = "";
        //titleLabel.layer.style.position = "absolute";  
        titleLabel.layer.classList.remove("title");
        titleLabel.layer.classList.add("title");
        titleLabel.text = this.title;
        titleLabel.setTextAlignment(this.alignment);
        header.addSubview(titleLabel);

        this._colHeader = header;

        let instance = this;
        this._colHeader.layer.onclick = function () {
            if (instance._onHeaderClickFn != null)
                instance._onHeaderClickFn.call(instance._target, instance);
        };
        
        return this._colHeader;
    }

    removeFromSuperview(){
        if (this._colHeader != null) this._colHeader.removeFromSuperview();
    }
}

export class UIReportTableView extends UIScrollView {
    dataSource = null;
    delegate = null;

    private cellPrototypes = {};
    private cells = [];
    private rows = [];
    private rowsCount = 0;
    columns = [];    

    private defaultRowHeight = 44;
    private contentHeight = 0;
    private rowByCell = {};

    selectedIndexPath = null;

    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);


        // Check if we have prototypes
        if (this.layer.childNodes.length > 0) {
            for (let index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this._addCellPrototypeWithLayer(subLayer);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-tableview-header") != null) {
                    this._addHeaderWithLayer(subLayer);
                }
                // else if (subLayer.getAttribute("data-tableview-footer") != null) {
                //     this._addFooterWithLayer(subLayer);
                // }
            }
        }
    }

    private _addCellPrototypeWithLayer(subLayer) {
        let cellIdentifier = subLayer.getAttribute("data-cell-identifier");
        let cellClassname = subLayer.getAttribute("data-class");
        let type = subLayer.getAttribute("data-report-cell-type");
        if (cellClassname == null) cellClassname = "UIReportTableViewCell";
        if (type == null) type = UIReportTableViewCellType.Custom;
        else if (type.toLocaleLowerCase() == "label") type = UIReportTableViewCellType.Label;
        else if (type.toLocaleLowerCase() == "combobox") type = UIReportTableViewCellType.Combox;

        let item = {};
        item["class"] = cellClassname;
        item["layer"] = subLayer;
        item["type"] = type;
        let size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null) item["size"] = size;

        this.cellPrototypes[cellIdentifier] = item;
    }

    private columnHeaderPrototype = null;
    private _addHeaderWithLayer(layer){        
        let cellClassname = layer.getAttribute("data-class");        
        if (cellClassname == null) cellClassname = "UIView";        

        let item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        
        // var size = new MIOSize(layer.clientWidth, layer.clientHeight);
        // if (size != null) item["size"] = size;

        this.columnHeaderPrototype = item;
        layer.style.display = "none";
    }

    addColumn(column: UIReportTableViewColumn) {

        if (this.columnHeaderPrototype != null) {
            let className = this.columnHeaderPrototype["class"];
            let header = Object.create(window[className].prototype);
            header.constructor.apply(header);
    
            //cell.init();
            let layer = this.columnHeaderPrototype["layer"];
            if (layer != null) {
                let newLayer = layer.cloneNode(true);
                newLayer.style.display = "";
                header.initWithLayer(newLayer);
                header.awakeFromHTML();
            }
            else {
                header.init();
            }    
            header.title = column.title;
            column.setColumnHeaderView(header);
        }
        
        this.columns.push(column);

        return column;
    }

    removeAllColumns() {
        for (let index = 0; index < this.columns.length; index++) {

            let col: UIReportTableViewColumn = this.columns[index];
            let header = col.columnHeaderView();
            header.removeFromSuperview();
        }

        this.columns = [];
    }

    dequeueReusableCellWithIdentifier(identifier: string) {

        let item = this.cellPrototypes[identifier];

        //instance creation here
        let className = item["class"];
        let cell = Object.create(window[className].prototype);
        cell.constructor.apply(cell);

        //cell.init();
        let layer = item["layer"];
        if (layer != null) {
            var newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            var size = item["size"];
            cell.type = item["type"];
            cell.initWithLayer(newLayer);
            cell.awakeFromHTML();
        }
        else {
            let cells = item["cells"];
            if (cells == null) {
                cells = [];
                item["cells"] = cells;
            }
            cells.push(cell);
        }

        return cell;
    }

    reloadData() {

        // Remove all subviews
        for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
            let col: UIReportTableViewColumn = this.columns[colIndex];            
            col.removeFromSuperview();
        }

        for (let index = 0; index < this.rows.length; index++) {
            let row = this.rows[index];
            row.removeFromSuperview();
        }
        this.rows = [];

        this.contentHeight = 30;
        let rows = this.dataSource.numberOfRows(this);
        this.contentHeight += rows * this.defaultRowHeight;
        this.rowsCount = rows;

        let size = new MIOSize(0, this.contentHeight);
        this.contentSize = size;        
        this.scrollToTop();

        this.reloadLayoutSubviews = true;

        this.setNeedsDisplay();
    }

    private reloadLayoutSubviews = false;
    layoutSubviews() {
 
        if (this.reloadLayoutSubviews == true) {
            this.reloadLayoutSubviews = false;
            this.initialLayoutSubviews();
        }
        else {
            this.scrollLayoutSubviews();
        }
    }

    private initialLayoutSubviews() {

        //if (this.rowsCount == 0) return;
        
        //let posY = this.addHeader();
        let maxY = this.getHeight() + (this.defaultRowHeight * 2);

        let x = 0;
        let y = 0;
        let w = this.getWidth();
        let offsetX = 0;

        for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
            let col: UIReportTableViewColumn = this.columns[colIndex];            
            let header: UIView = col.columnHeaderView();
            
            header.setX(x); 
            if ((typeof col.width) == "string") {
                let pi = col.width.indexOf("%");
                if (pi > 0){
                    let width = parseInt(col.width.substr(0, pi));
                    col.pixelWidth = (width * this.getWidth()) / 100;
                }    
                else {
                    col.pixelWidth = parseInt(col.width);
                }
            }
            else 
                col.pixelWidth = parseInt(col.width);
                
            if (col.minWidth > 0 && col.pixelWidth < col.minWidth) col.pixelWidth = col.minWidth;
            header.setWidth(col.pixelWidth);            
            x += col.pixelWidth;
            offsetX += col.pixelWidth;

            col._onHeaderClickFn = this.onHeaderClickFn;                        
            col._target = this;
            this.addSubview(header);
            //header.layer.style.position = "sticky";
            //header.layer.style.top = "0px";
        }    

        x = 0;
        if (offsetX < this.getWidth()){
            // Total columns width are less than total widt of the viewport
            let extra = (this.getWidth() - offsetX) / this.columns.length;
            for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
                let col: UIReportTableViewColumn = this.columns[colIndex];                                               
                col.pixelWidth += extra;
                
                let header: UIView = col.columnHeaderView();
                header.setX(x);
                header.setWidth(col.pixelWidth);  
                x += col.pixelWidth;          
            }
            offsetX = this.getWidth();
        }

        y += 30;
        x = 0;

        if (this.rowsCount == 0) return;

        let exit = false;

        let currentRow = 0;
        while (exit == false){
            
            if (currentRow == this.rowsCount) break;

            // New row
            let row = new UIReportTableViewRow();
            row.init();

            let offsetY = 0;
            for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
                let col = this.columns[colIndex];
                let indexPath = MIOIndexPath.indexForColumnInRowAndSection(colIndex, currentRow, 0);
                let cell = this.dataSource.cellAtIndexPath(this, col, indexPath);
                
                //TODO: Review why is not absoute
                cell.layer.style.postion = "absolute";

                cell._target = this;
                cell._onClickFn = this.cellOnClickFn;                
                this.addSubview(cell);
                
                cell.setX(x);
                cell.setY(y);
                cell.setWidth(col.pixelWidth);
                x += col.pixelWidth;

                let h = cell.getHeight();
                if (offsetY < h) offsetY = h;

                cell.parentRow = row;
                row.cells.push(cell); 
            }            
            this.lastIndexPath = MIOIndexPath.indexForRowInSection(currentRow, 0);
            this.rows.push(row);
            currentRow++;
            x = 0;

            if (offsetY == 0) offsetY = this.defaultRowHeight;            
            row.y = y;
            row.height = offsetY;
            y += offsetY;
            
            if (offsetY != this.defaultRowHeight) {
                this.contentHeight -= this.defaultRowHeight;
                this.contentHeight += offsetY;
            }

            if (y >= maxY) {                
                exit = true;
            }
        }

        this.visibleRange = new MIORange(0, this.rows.length);

        let size = new MIOSize(offsetX, this.contentHeight);
        this.contentSize = size;
        this.lastContentOffsetY = 0;
    }

    private lastIndexPath:MIOIndexPath = null;
    private visibleRange:MIORange = null;
    private lastContentOffsetY = 0;
    private scrollLayoutSubviews() {

        if (this.rowsCount == 0) return;

        var scrollDown = false;
        var offsetY = 0;
        if (this.contentOffset.y == this.lastContentOffsetY) return;
        if (this.contentOffset.y > this.lastContentOffsetY) {
            offsetY = this.contentOffset.y - this.lastContentOffsetY;
            scrollDown = true;
        }
        else if (this.contentOffset.y < this.lastContentOffsetY) {
            offsetY = this.lastContentOffsetY - this.contentOffset.y;
            scrollDown = false;
        }

        if (offsetY < (this.defaultRowHeight / 2)) return;
        this.lastContentOffsetY = this.contentOffset.y;

        if (scrollDown == true) {

            var start = this.visibleRange.location;
            var end = this.visibleRange.location + this.visibleRange.length - 1;
            var row = this.rows[end];
            var posY = row.y + row.height;
            let maxY = this.contentOffset.y + this.getHeight() + (this.defaultRowHeight * 2);
            var startRowIndex = this.lastIndexPath.row + 1;

            var nextRow = end + 1;
            var exit = false;

            let x = 0;
            let y = posY;

            var currentRow = startRowIndex;
            while (exit == false){
                
                if (currentRow >= this.rowsCount) break;

                // New row
                row = new UIReportTableViewRow();
                row.init();
    
                offsetY = 0;
                for (let colIndex = 0; colIndex < this.columns.length; colIndex++) {
                    let col = this.columns[colIndex];
                    let indexPath = MIOIndexPath.indexForColumnInRowAndSection(colIndex, currentRow, 0);
                    let cell = this.dataSource.cellAtIndexPath(this, col, indexPath);
                    
                    //TODO: Review why is not absoute
                    cell.layer.style.postion = "absolute";
    
                    cell._target = this;
                    cell._onClickFn = this.cellOnClickFn;                
                    this.addSubview(cell);
                    
                    cell.setX(x);
                    cell.setY(y);
                    cell.setWidth(col.pixelWidth);
                    x += col.pixelWidth;
    
                    let h = cell.getHeight();
                    if (offsetY < h) offsetY = h;
    
                    cell.parentRow = row;
                    row.cells.push(cell); 
                }            
                this.lastIndexPath = MIOIndexPath.indexForRowInSection(currentRow, 0);
                this.rows.push(row);
                currentRow++;
                x = 0;
    
                if (offsetY == 0) offsetY = this.defaultRowHeight;
                row.y = y;
                row.height = offsetY;
                y += offsetY;
                    
                if (offsetY != this.defaultRowHeight) {
                    this.contentHeight -= this.defaultRowHeight;
                    this.contentHeight += offsetY;
                }
    
                if (y >= maxY) {                
                    exit = true;
                }
            }
    
            this.visibleRange = new MIORange(0, this.rows.length);
    
            let size = new MIOSize(0, this.contentHeight);
            this.contentSize = size;
            this.lastContentOffsetY = 0;
        }
        else {
            // TODO
        }
            
    }

    onHeaderClickFn(col:UIReportTableViewColumn){

        if (this.delegate != null) {
            if (typeof this.delegate.sortDescriptorsDidChange === "function")
                this.delegate.sortDescriptorsDidChange(this, col);
        }
    }

    cellOnClickFn(cell) {
                
        let row:UIReportTableViewRow = cell.parentRow;
        let colIndex = row.cells.indexOf(cell);
        let rowIndex = this.rows.indexOf(row);
        let ip = MIOIndexPath.indexForColumnInRowAndSection(colIndex, rowIndex, 0);

        if (this.delegate != null) {
            if (typeof this.delegate.didSelectCellAtIndexPath === "function")
                this.delegate.didSelectCellAtIndexPath(this, ip);
        }
    }
    
}