import { UIView } from "./UIView";
import { NSObject } from "mio-foundation-web";
import { NSClassFromString } from "mio-foundation-web";
import { CGSize } from "mio-foundation-web";
import { IndexPath } from "mio-foundation-web";
import { UICollectionViewFlowLayout } from "./UICollectionViewLayout";
import "mio-foundation-web/extensions"

/**
 * Created by godshadow on 09/11/2016.
 */

export class UICollectionViewCell extends UIView
{
    _target = null;
    _onClickFn = null;
    _index = null;
    _section = null;

    selected = false;

    init(){
        super.init();
        this.setupLayers();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        layer.style.width = "100%";
        this.setupLayers();
    }

    private setupLayers(){
        this.layer.style.position = "absolute";
        let instance = this;

        this.layer.addEventListener("click", function(e) {
            e.stopPropagation();
            if (instance._onClickFn != null)
                instance._onClickFn.call(instance._target, instance);
        });
    }

    setSelected(value) {
        this.willChangeValue("selected");
        this.selected = value;
        this.didChangeValue("selected");
    }
}

export class UICollectionViewSection extends NSObject
{
    header = null;
    footer = null;
    cells = [];
}

export class UICollectionView extends UIView
{
    dataSource = null;
    delegate = null;

    private _collectionViewLayout:UICollectionViewFlowLayout = null;

    private _cellPrototypes = {};
    private _supplementaryViews = {};

    private _sections = [];

    selectedCellIndex = -1;
    selectedCellSection = -1;

    public get collectionViewLayout():UICollectionViewFlowLayout{
        if (this._collectionViewLayout == null) {
            this._collectionViewLayout = new UICollectionViewFlowLayout();
            this._collectionViewLayout.init();
        }

        return this._collectionViewLayout;
    }

    public set collectionViewLayout(layout:UICollectionViewFlowLayout){
        //TODO: Set animations for changing layout
        layout.collectionView = this;
        this._collectionViewLayout = layout;        
        layout.invalidateLayout();
    }

    initWithLayer(layer, owner, options){
        super.initWithLayer(layer, owner, options);
        layer.style.width = "100%";
        layer.style.overflowX = "scroll";

        // Check if we have prototypes
        if (layer.childNodes.length > 0){
            for(var index = 0; index < layer.childNodes.length; index++){
                var subLayer = layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this._addCellPrototypeWithLayer(subLayer);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-supplementary-view-identifier") != null){
                    this._addSupplementaryViewPrototypeWithLayer(subLayer);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-collection-view-layout") != null){
                    let classname = subLayer.getAttribute("data-class");
                    this._collectionViewLayout = NSClassFromString(classname);
                    this._collectionViewLayout.initWithLayer(subLayer, owner);
                }
            }            
        }
    }

    private _addCellPrototypeWithLayer(subLayer){
        let cellIdentifier = subLayer.getAttribute("data-cell-identifier");
        let cellClassname = subLayer.getAttribute("data-class");
        if (cellClassname == null) cellClassname = "MIOCollectionViewCell";

        let item = {};
        item["class"] = cellClassname;
        item["layer"] = subLayer;
        let size = new CGSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null) item["size"] = size;
        let bg = window.getComputedStyle(subLayer ,null).getPropertyValue('background-color');
        if (bg != null) item["bg"] = bg;

        this._cellPrototypes[cellIdentifier] = item;
    }

    private _addSupplementaryViewPrototypeWithLayer(subLayer){
        var viewIdentifier = subLayer.getAttribute("data-supplementary-view-identifier");
        var viewClassname = subLayer.getAttribute("data-class");
        if (viewClassname == null) viewClassname = "MIOView";

        var item = {};
        item["class"] = viewClassname;
        item["layer"] = subLayer;
        var size = new CGSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null) item["size"] = size;
        var bg = window.getComputedStyle(subLayer ,null).getPropertyValue('background-color');
        if (bg != null) item["bg"] = bg;

        this._supplementaryViews[viewIdentifier] = item;
    }

    registerClassForCellWithReuseIdentifier(cellClassname, identifier){        
        let item = {};
        item["class"] = cellClassname;
        //item["layer"] = null;
        this._cellPrototypes[identifier] = item;   
    }

    registerClassForSupplementaryViewWithReuseIdentifier(viewClass,identifier){
        //TODO:
    }

    dequeueReusableCellWithReuseIdentifierFor(identifier:string, indexPath:IndexPath){
        let item = this._cellPrototypes[identifier];

        //instance creation here
        let className = item["class"];
        let cell = NSClassFromString(className);
        cell.constructor.apply(cell);

        //cell.init();
        let layer = item["layer"];
        if (layer != null) {
            let newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            let layerID = newLayer.getAttribute("id");
            if (layerID != null) cell._outlets[layerID] = cell;    
            cell.initWithLayer(newLayer, cell);
            cell.awakeFromHTML();
        }
        else {
            cell.init();
        }

        // else {
        //     let cells = item["cells"];
        //     if (cells == null) {
        //         cells = [];
        //         item["cells"] = cells;
        //     }
        //     cells.push(cell);
        // }

        return cell;
    }

    dequeueReusableSupplementaryViewWithReuseIdentifier(identifier){
        var item = this._supplementaryViews[identifier];

        //instance creation here
        var className = item["class"];
        var view = NSClassFromString(className);
        view.constructor.apply(view);

        //view.init();
        var layer = item["layer"];
        if (layer != null) {
            var newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            // var size = item["size"];
            // if (size != null) {
            //     view.setWidth(size.width);
            //     view.layer.style.width = "100%";
            //     view.setHeight(size.height);
            // }
            // var bg = item["bg"];
            // if (bg != null) {
            //     view.layer.style.background = bg;
            // }
            view.initWithLayer(newLayer);
            //view._addLayerToDOM();
            view.awakeFromHTML();
        }
        else {
            var views = item["views"];
            if (views == null) {
                views = [];
                item["views"] = views;
            }
            views.push(view);
        }

        return view;
    }

    cellAtIndexPath(indexPath:IndexPath){
        var s = this._sections[indexPath.section];
        var c = s.cells[indexPath.row];

        return c;
    }

    public reloadData(){
        
        if (this.dataSource == null) return;

        // Remove all subviews
        for (let index = 0; index < this._sections.length; index++)
        {
            let sectionView = this._sections[index];
            if (sectionView.header != null)
                sectionView.header.removeFromSuperview();

            if (sectionView.footer != null)
                sectionView.footer.removeFromSuperview();

            for (var count = 0; count < sectionView.cells.length; count++){
                let cell = sectionView.cells[count];
                cell.removeFromSuperview();
                if (this.delegate != null) {
                    if (typeof this.delegate.didEndDisplayingCellAtIndexPath === "function"){
                        let ip = IndexPath.indexForRowInSection(count, index);
                        this.delegate.didEndDisplayingCellAtIndexPath(this, cell, ip);
                    }
                }                
            }
            sectionView.cells = [];
        }

        this.selectedCellIndex = -1;
        this.selectedCellSection = -1;    
        this._sections = [];

        let sections = 1;
        if (typeof this.dataSource[0].numberOfSectionsIn === "function") sections = this.dataSource[0].numberOfSectionsIn(this);
        for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {

            let section = new UICollectionViewSection();
            section.init();
            this._sections.push(section);

            if (typeof this.dataSource[0].viewForSupplementaryViewAtIndex === "function"){
                let hv = this.dataSource[0].viewForSupplementaryViewAtIndex(this, "header", sectionIndex);
                section.header = hv;
                if (hv != null) this.addSubview(hv);
            }

            let items = this.dataSource[0].collectionViewNumberOfItemsInSection(this, sectionIndex);
            for (let index = 0; index < items; index++) {

                let ip = IndexPath.indexForRowInSection(index, sectionIndex);
                let cell = this.dataSource[0].collectionViewCellForItemAt(this, ip);
                section.cells.push(cell);
                this.addSubview(cell);

                // events
                cell._target = this;
                cell._onClickFn = this.cellOnClickFn;
                cell._index = index;
                cell._section = sectionIndex;
            }

            if (typeof this.dataSource[0].viewForSupplementaryViewAtIndex === "function"){
                let fv = this.dataSource[0].viewForSupplementaryViewAtIndex(this, "footer", sectionIndex);
                section.footer = fv;
                if (fv != null) this.addSubview(fv);
            }
        }

        this.collectionViewLayout.invalidateLayout();
        this.setNeedsDisplay();
    }

    cellOnClickFn(cell){
        let index = cell._index;
        let section = cell._section;

        let canSelectCell = true;

        // if (this.selectedCellIndex == index && this.selectedCellSection == section)
        //     return;

        if (this.delegate != null && typeof this.delegate.canSelectCellAtIndexPath === "function"){
            canSelectCell = this.delegate.canSelectCellAtIndexPath(this, index, section);
        }

        if (canSelectCell == false)
            return;

        if (this.selectedCellIndex > -1 && this.selectedCellSection > -1){
            let ip = IndexPath.indexForRowInSection(this.selectedCellIndex, this.selectedCellSection);
            this.deselectCellAtIndexPath(ip);
        }

        this.selectedCellIndex = index;
        this.selectedCellSection = section;

        this._selectCell(cell);

        if (this.delegate != null){
            if (typeof this.delegate.didSelectCellAtIndexPath === "function"){
                let ip = IndexPath.indexForRowInSection(index, section);
                this.delegate.didSelectCellAtIndexPath(this, ip);
            }
        }

    }

    _selectCell(cell){
        cell.setSelected(true);
    }

    selectCellAtIndexPath(index, section){
        this.selectedCellIndex = index;
        this.selectedCellSection = section;
        var cell = this._sections[section].cells[index];
        this._selectCell(cell);
    }

    _deselectCell(cell){
        cell.setSelected(false);
    }

    deselectCellAtIndexPath(indexPath:IndexPath)
    {
        this.selectedCellIndex = -1;
        this.selectedCellSection = -1;
        var cell = this._sections[indexPath.section].cells[indexPath.row];
        this._deselectCell(cell);
    }

    layoutSubviews() {                

        if (this.hidden == true) return;
        // if (this._needDisplay == false) return;
        // this._needDisplay = false;

        if (this._sections == null)
            return;        

        // var x = this.collectionViewLayout.sectionInset.left;
        // var y = this.collectionViewLayout.sectionInset.top;

        // TODO: Check margins
        let x = 0;
        let y = 0;

        for (let count = 0; count < this._sections.length; count++)
        {
            let section = this._sections[count];
            x = this.collectionViewLayout.sectionInset.left;

            // Add header view
            if (section.header != null)
            {
                section.header.setY(y);
                let offsetY = section.header.getHeight();
                if (offsetY <= 0) offsetY = 23;
                y += offsetY + this.collectionViewLayout.headerReferenceSize.height;
            }

            // Add cells
            let maxX = this.getWidth() - this.collectionViewLayout.sectionInset.right;
            for (let index = 0; index < section.cells.length; index++) {

                let cell = section.cells[index] as UICollectionViewCell;
                if (this.delegate != null) {
                    if (typeof this.delegate.willDisplayCellAtIndexPath === "function")
                        this.delegate.willDisplayCellAtIndexPath(this, cell, index, count);
                }

                cell.setWidth(this.collectionViewLayout.itemSize.width);
                cell.setHeight(this.collectionViewLayout.itemSize.height);

                cell.setX(x);
                cell.setY(y);

                cell.setNeedsDisplay();

                x += this.collectionViewLayout.itemSize.width + this.collectionViewLayout.minimumInteritemSpacing;                
                // if (x >= maxX) {
                //     x = this.collectionViewLayout.sectionInset.left;
                //     y += this.collectionViewLayout.itemSize.height;
                //     y += this.collectionViewLayout.minimumLineSpacing;
                // }
            }

            //y += this.collectionViewLayout.minimumLineSpacing;

            // Add footer view
            if (section.footer != null)
            {
                section.footer.setY(y);
                let offsetY = section.footer.getHeight();
                if (offsetY <= 0) offsetY = 23;
                y += offsetY + this.collectionViewLayout.footerReferenceSize.height;
            }
        }
    }

    scrollToItemAtAtAnimated(indexPath:IndexPath, scrollPosition:any, animated:boolean){
        
    }

    static ScrollPosition = class {
        static top = 1 <<  0
        static centeredVertically = 1 <<  1
        static bottom = 1 <<  2
        static left = 1 <<  3
        static centeredHorizontally = 1 <<  4
        static right = 1 <<  5
    }

}