/**
 * Created by godshadow on 09/11/2016.
 */

import { IndexPath, NSObject, NSClassFromString, NSCoder } from "foundation";
import { UICollectionViewFlowLayout } from "./UICollectionViewLayout";
import { UIView } from "./UIView";
import { CALayer } from "./CoreAnimation/CALayer";
import { CACollectionLayer } from "./CoreAnimation/CACollectionLayer";
import { MIOCoreClassByName } from "mio-core";
import { UITapGestureRecognizer } from "./UITapGestureRecognizer";
import { UIGestureRecognizer, UIGestureRecognizerState } from "./UIGestureRecognizer";

export interface UICollectionViewDatasource
{
    numberOfSections ( collectionView:UICollectionView ) : number ;
    numberOfItemsInSection ( collectionView: UICollectionView, group: number ) : number ;
    viewForSupplementaryViewAtIndex ( collectionView: UICollectionView, headerName: "header" | "footer", group: number ) : UIView ;
    cellForItemAtIndexPath ( collectionView: UICollectionView, indexPath: IndexPath ) : UICollectionViewCell ;
}

export interface UICollectionViewDelegate
{
    didSelectCellAtIndexPath? ( collectionView: UICollectionView, indexPath: IndexPath ) : void ;
    canSelectCellAtIndexPath? (collectionView: UICollectionView, indexPath: IndexPath) : boolean ;    
    
    willDisplayCellAtIndexPath? ( collectionView: UICollectionView, cell:UICollectionViewCell, indexPath: IndexPath ) : void ;
    didEndDisplayingCellAtIndexPath? ( collectionView: UICollectionView, cell:UICollectionViewCell, indexPath: IndexPath ) : void ;    
}

export class UICollectionViewCell extends UIView
{
    _indexPath:IndexPath;

    set selected (value: boolean) {
        if ( value == true) {
            this.layer.addStyle( "selected" );
        }
        else {
            this.layer.removeStyle( "selected" );
        }
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
    static get layerClass() : any { return CACollectionLayer }

    dataSource:UICollectionViewDatasource = null;
    delegate:UICollectionViewDelegate = null;

    private _collectionViewLayout:UICollectionViewFlowLayout = null;

    private _cellPrototypes = {};
    // private _supplementaryViews = {};

    private _sections = [];

    selectedIndexPath:IndexPath = null;    

    contentView:UIView = null;

    initWithCoder( coder: NSCoder ): void {
        super.initWithCoder( coder );

        this.contentView = new UIView();
        this.contentView.init();

        this.addSubview( this.contentView );
    }

    public get collectionViewLayout():UICollectionViewFlowLayout{
        if (this._collectionViewLayout == null) {
            this._collectionViewLayout = new UICollectionViewFlowLayout();
            this._collectionViewLayout.init();
        }

        return this._collectionViewLayout;
    }

    public set collectionViewLayout( layout:UICollectionViewFlowLayout ) {
        //TODO: Set animations for changing layout
        layout.collectionView = this;
        this._collectionViewLayout = layout;        
        layout.invalidateLayout();
    }    
    
    registerClassForCellWithReuseIdentifier(classname:string, identifier:string){        
        let item = {};
        item["class"] = classname;
        //item["layer"] = null;
        this._cellPrototypes[identifier] = item;   
    }

    registerClassForSupplementaryViewWithReuseIdentifier( viewClass:string, identifier:string ){
        //TODO:
    }

    dequeueReusableCellWithReuseIdentifierFor( identifier:string, indexPath:IndexPath ){
        
        let view = (this.layer as CACollectionLayer).newCellViewByIdentifier( identifier );

        let tapGesture = new UITapGestureRecognizer();
        tapGesture.initWithTarget(this, this._cellDidTap);
        view.addGestureRecognizer(tapGesture);

        return view;

        // //instance creation here
        // let className = item["class"];
        // let cell = NSClassFromString(className);
        // cell.constructor.apply(cell);

        //cell.init();
        // let layer = item["layer"];
        // if (layer != null) {
        //     let newLayer = layer.cloneNode(true);
        //     newLayer.style.display = "";
        //     let layerID = newLayer.getAttribute("id");
        //     if (layerID != null) cell._outlets[layerID] = cell;    
        //     cell.initWithLayer(newLayer, cell);
        //     cell.awakeFromHTML();
        // }
        // else {
        //     cell.init();
        // }

        // else {
        //     let cells = item["cells"];
        //     if (cells == null) {
        //         cells = [];
        //         item["cells"] = cells;
        //     }
        //     cells.push(cell);
        // }

        // return v;
    }

    dequeueReusableSupplementaryViewWithReuseIdentifier( identifier:string ) : UIView {
        // let item = this._supplementaryViews[identifier];
        let view = (this.layer as CACollectionLayer).newSupplementaryViewByIdentifier( identifier, this );        
        return view;


        // //view.init();
        // var layer = item["layer"];
        // if (layer != null) {
        //     var newLayer = layer.cloneNode(true);
        //     newLayer.style.display = "";
        //     // var size = item["size"];
        //     // if (size != null) {
        //     //     view.setWidth(size.width);
        //     //     view.layer.style.width = "100%";
        //     //     view.setHeight(size.height);
        //     // }
        //     // var bg = item["bg"];
        //     // if (bg != null) {
        //     //     view.layer.style.background = bg;
        //     // }
        //     view.initWithLayer(newLayer);
        //     //view._addLayerToDOM();
        //     view.awakeFromHTML();
        // }
        // else {
        //     var views = item["views"];
        //     if (views == null) {
        //         views = [];
        //         item["views"] = views;
        //     }
        //     views.push(view);
        // }

        // return v;
    }

    cellAtIndexPath(indexPath:IndexPath){
        let s = this._sections[indexPath.section];
        let c = s.cells[indexPath.row];

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

            for (let count = 0; count < sectionView.cells.length; count++){
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

        this.selectedIndexPath = null;
        this._sections = [];

        let sections = 1;
        if (typeof this.dataSource.numberOfSections === "function") sections = this.dataSource.numberOfSections(this);
        for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {

            let section = new UICollectionViewSection();
            section.init();
            this._sections.push(section);

            if (typeof this.dataSource.viewForSupplementaryViewAtIndex === "function"){
                let hv = this.dataSource.viewForSupplementaryViewAtIndex(this, "header", sectionIndex);
                section.header = hv;
                if (hv != null) this.contentView.addSubview(hv);
            }

            let items = this.dataSource.numberOfItemsInSection(this, sectionIndex);
            for (let index = 0; index < items; index++) {

                let ip = IndexPath.indexForRowInSection(index, sectionIndex);
                let cell = this.dataSource.cellForItemAtIndexPath(this, ip);
                section.cells.addObject(cell);
                this.contentView.addSubview(cell);

                // TODO: Don't save in the cell. Find a better way
                cell._indexPath = ip;
            }

            if (typeof this.dataSource.viewForSupplementaryViewAtIndex === "function"){
                let fv = this.dataSource.viewForSupplementaryViewAtIndex(this, "footer", sectionIndex);
                section.footer = fv;
                if (fv != null) this.contentView.addSubview(fv);
            }
        }

        this.collectionViewLayout.invalidateLayout();
        this.setNeedsDisplay();
    }

    _cellDidTap( gestureRecognizer: UIGestureRecognizer ){
        if (gestureRecognizer.state != UIGestureRecognizerState.Ended ) return;

        let cell = gestureRecognizer.view as UICollectionViewCell;
        let ip = cell._indexPath;

        let canSelectCell = true;

        // if (this.selectedCellIndex == index && this.selectedCellSection == section)
        //     return;

        if (this.delegate != null && typeof this.delegate.canSelectCellAtIndexPath === "function"){
            canSelectCell = this.delegate.canSelectCellAtIndexPath(this, ip );
        }

        if (canSelectCell == false)
            return;

        if (this.selectedIndexPath != null ){
            this.deselectCellAtIndexPath( this.selectedIndexPath );
        }

        this.selectCellAtIndexPath( ip );        

        if (this.delegate != null){
            if (typeof this.delegate.didSelectCellAtIndexPath === "function"){
                this.delegate.didSelectCellAtIndexPath(this, ip);
            }
        }

    }

    selectCellAtIndexPath( indexPath:IndexPath ){
        this.selectedIndexPath = indexPath;
        let cell = this._sections[ indexPath.section ].cells[ indexPath.item ];
        cell.selected = true;
    }

    deselectCellAtIndexPath( indexPath:IndexPath ) {
        this.selectedIndexPath = null;
        let cell = this._sections[ indexPath.section ].cells[ indexPath.row ];
        cell.selected = false;
    }

    /*
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
                        this.delegate.willDisplayCellAtIndexPath(this, cell, IndexPath.indexForRowInSection( index, count ) );
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

    */

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