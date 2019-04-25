"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = require("./UIView");
var MIOFoundation_1 = require("../MIOFoundation");
var UICollectionViewLayout_1 = require("./UICollectionViewLayout");
/**
 * Created by godshadow on 09/11/2016.
 */
var UICollectionViewCell = /** @class */ (function (_super) {
    __extends(UICollectionViewCell, _super);
    function UICollectionViewCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._target = null;
        _this._onClickFn = null;
        _this._index = null;
        _this._section = null;
        _this.selected = false;
        return _this;
    }
    UICollectionViewCell.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setupLayers();
    };
    UICollectionViewCell.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setupLayers();
    };
    UICollectionViewCell.prototype.setupLayers = function () {
        this.layer.style.position = "absolute";
        var instance = this;
        this.layer.addEventListener("click", function (e) {
            e.stopPropagation();
            if (instance._onClickFn != null)
                instance._onClickFn.call(instance._target, instance);
        });
    };
    UICollectionViewCell.prototype.setSelected = function (value) {
        this.willChangeValue("selected");
        this.selected = value;
        this.didChangeValue("selected");
    };
    return UICollectionViewCell;
}(UIView_1.UIView));
exports.UICollectionViewCell = UICollectionViewCell;
var UICollectionViewSection = /** @class */ (function (_super) {
    __extends(UICollectionViewSection, _super);
    function UICollectionViewSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.header = null;
        _this.footer = null;
        _this.cells = [];
        return _this;
    }
    return UICollectionViewSection;
}(MIOFoundation_1.MIOObject));
exports.UICollectionViewSection = UICollectionViewSection;
var UICollectionView = /** @class */ (function (_super) {
    __extends(UICollectionView, _super);
    function UICollectionView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = null;
        _this.delegate = null;
        _this._collectionViewLayout = null;
        _this._cellPrototypes = {};
        _this._supplementaryViews = {};
        _this._sections = [];
        _this.selectedCellIndex = -1;
        _this.selectedCellSection = -1;
        return _this;
    }
    Object.defineProperty(UICollectionView.prototype, "collectionViewLayout", {
        get: function () {
            if (this._collectionViewLayout == null) {
                this._collectionViewLayout = new UICollectionViewLayout_1.UICollectionViewFlowLayout();
                this._collectionViewLayout.init();
            }
            return this._collectionViewLayout;
        },
        set: function (layout) {
            //TODO: Set animations for changing layout
            layout.collectionView = this;
            this._collectionViewLayout = layout;
            layout.invalidateLayout();
        },
        enumerable: true,
        configurable: true
    });
    UICollectionView.prototype.initWithLayer = function (layer, options) {
        _super.prototype.initWithLayer.call(this, layer, options);
        // Check if we have prototypes
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this._addCellPrototypeWithLayer(subLayer);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-supplementary-view-identifier") != null) {
                    this._addSupplementaryViewPrototypeWithLayer(subLayer);
                    subLayer.style.display = "none";
                }
            }
        }
    };
    UICollectionView.prototype._addCellPrototypeWithLayer = function (subLayer) {
        var cellIdentifier = subLayer.getAttribute("data-cell-identifier");
        var cellClassname = subLayer.getAttribute("data-class");
        if (cellClassname == null)
            cellClassname = "MIOCollectionViewCell";
        var item = {};
        item["class"] = cellClassname;
        item["layer"] = subLayer;
        var size = new MIOFoundation_1.MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null)
            item["size"] = size;
        var bg = window.getComputedStyle(subLayer, null).getPropertyValue('background-color');
        if (bg != null)
            item["bg"] = bg;
        this._cellPrototypes[cellIdentifier] = item;
    };
    UICollectionView.prototype._addSupplementaryViewPrototypeWithLayer = function (subLayer) {
        var viewIdentifier = subLayer.getAttribute("data-supplementary-view-identifier");
        var viewClassname = subLayer.getAttribute("data-class");
        if (viewClassname == null)
            viewClassname = "MIOView";
        var item = {};
        item["class"] = viewClassname;
        item["layer"] = subLayer;
        var size = new MIOFoundation_1.MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null)
            item["size"] = size;
        var bg = window.getComputedStyle(subLayer, null).getPropertyValue('background-color');
        if (bg != null)
            item["bg"] = bg;
        this._supplementaryViews[viewIdentifier] = item;
    };
    UICollectionView.prototype.registerClassForCellWithReuseIdentifier = function (cellClassname, identifier) {
        var item = {};
        item["class"] = cellClassname;
        //item["layer"] = null;
        this._cellPrototypes[identifier] = item;
    };
    UICollectionView.prototype.registerClassForSupplementaryViewWithReuseIdentifier = function (viewClass, identifier) {
        //TODO:
    };
    UICollectionView.prototype.dequeueReusableCellWithIdentifier = function (identifier) {
        var item = this._cellPrototypes[identifier];
        //instance creation here
        var className = item["class"];
        var cell = Object.create(window[className].prototype);
        cell.constructor.apply(cell);
        //cell.init();
        var layer = item["layer"];
        if (layer != null) {
            var newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            cell.initWithLayer(newLayer);
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
    };
    UICollectionView.prototype.dequeueReusableSupplementaryViewWithReuseIdentifier = function (identifier) {
        var item = this._supplementaryViews[identifier];
        //instance creation here
        var className = item["class"];
        var view = Object.create(window[className].prototype);
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
    };
    UICollectionView.prototype.cellAtIndexPath = function (indexPath) {
        var s = this._sections[indexPath.section];
        var c = s.cells[indexPath.row];
        return c;
    };
    UICollectionView.prototype.reloadData = function () {
        if (this.dataSource == null)
            return;
        // Remove all subviews
        for (var index = 0; index < this._sections.length; index++) {
            var sectionView = this._sections[index];
            if (sectionView.header != null)
                sectionView.header.removeFromSuperview();
            if (sectionView.footer != null)
                sectionView.footer.removeFromSuperview();
            for (var count = 0; count < sectionView.cells.length; count++) {
                var cell = sectionView.cells[count];
                cell.removeFromSuperview();
                if (this.delegate != null) {
                    if (typeof this.delegate.didEndDisplayingCellAtIndexPath === "function") {
                        var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(count, index);
                        this.delegate.didEndDisplayingCellAtIndexPath(this, cell, ip);
                    }
                }
            }
            sectionView.cells = [];
        }
        this.selectedCellIndex = -1;
        this.selectedCellSection = -1;
        this._sections = [];
        var sections = this.dataSource.numberOfSections(this);
        for (var sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
            var section = new UICollectionViewSection();
            section.init();
            this._sections.push(section);
            if (typeof this.dataSource.viewForSupplementaryViewAtIndex === "function") {
                var hv = this.dataSource.viewForSupplementaryViewAtIndex(this, "header", sectionIndex);
                section.header = hv;
                if (hv != null)
                    this.addSubview(hv);
            }
            var items = this.dataSource.numberOfItemsInSection(this, sectionIndex);
            for (var index = 0; index < items; index++) {
                var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(index, sectionIndex);
                var cell = this.dataSource.cellForItemAtIndexPath(this, ip);
                section.cells.push(cell);
                this.addSubview(cell);
                // events
                cell._target = this;
                cell._onClickFn = this.cellOnClickFn;
                cell._index = index;
                cell._section = sectionIndex;
            }
            if (typeof this.dataSource.viewForSupplementaryViewAtIndex === "function") {
                var fv = this.dataSource.viewForSupplementaryViewAtIndex(this, "footer", sectionIndex);
                section.footer = fv;
                if (fv != null)
                    this.addSubview(fv);
            }
        }
        this.collectionViewLayout.invalidateLayout();
        this.setNeedsDisplay();
    };
    UICollectionView.prototype.cellOnClickFn = function (cell) {
        var index = cell._index;
        var section = cell._section;
        var canSelectCell = true;
        // if (this.selectedCellIndex == index && this.selectedCellSection == section)
        //     return;
        if (this.delegate != null && typeof this.delegate.canSelectCellAtIndexPath === "function") {
            canSelectCell = this.delegate.canSelectCellAtIndexPath(this, index, section);
        }
        if (canSelectCell == false)
            return;
        if (this.selectedCellIndex > -1 && this.selectedCellSection > -1) {
            var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(this.selectedCellIndex, this.selectedCellSection);
            this.deselectCellAtIndexPath(ip);
        }
        this.selectedCellIndex = index;
        this.selectedCellSection = section;
        this._selectCell(cell);
        if (this.delegate != null) {
            if (typeof this.delegate.didSelectCellAtIndexPath === "function") {
                var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(index, section);
                this.delegate.didSelectCellAtIndexPath(this, ip);
            }
        }
    };
    UICollectionView.prototype._selectCell = function (cell) {
        cell.setSelected(true);
    };
    UICollectionView.prototype.selectCellAtIndexPath = function (index, section) {
        this.selectedCellIndex = index;
        this.selectedCellSection = section;
        var cell = this._sections[section].cells[index];
        this._selectCell(cell);
    };
    UICollectionView.prototype._deselectCell = function (cell) {
        cell.setSelected(false);
    };
    UICollectionView.prototype.deselectCellAtIndexPath = function (indexPath) {
        this.selectedCellIndex = -1;
        this.selectedCellSection = -1;
        var cell = this._sections[indexPath.section].cells[indexPath.row];
        this._deselectCell(cell);
    };
    UICollectionView.prototype.layoutSubviews = function () {
        if (this.hidden == true)
            return;
        // if (this._needDisplay == false) return;
        // this._needDisplay = false;
        if (this._sections == null)
            return;
        // var x = this.collectionViewLayout.sectionInset.left;
        // var y = this.collectionViewLayout.sectionInset.top;
        // TODO: Check margins
        var x = 0;
        var y = 0;
        for (var count = 0; count < this._sections.length; count++) {
            var section = this._sections[count];
            x = this.collectionViewLayout.sectionInset.left;
            // Add header view
            if (section.header != null) {
                section.header.setY(y);
                var offsetY = section.header.getHeight();
                if (offsetY <= 0)
                    offsetY = 23;
                y += offsetY + this.collectionViewLayout.headerReferenceSize.height;
            }
            // Add cells
            var maxX = this.getWidth() - this.collectionViewLayout.sectionInset.right;
            for (var index = 0; index < section.cells.length; index++) {
                var cell = section.cells[index];
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
                if (x >= maxX) {
                    x = this.collectionViewLayout.sectionInset.left;
                    y += this.collectionViewLayout.itemSize.height;
                    y += this.collectionViewLayout.minimumLineSpacing;
                }
            }
            y += this.collectionViewLayout.minimumLineSpacing;
            // Add footer view
            if (section.footer != null) {
                section.footer.setY(y);
                var offsetY = section.footer.getHeight();
                if (offsetY <= 0)
                    offsetY = 23;
                y += offsetY + this.collectionViewLayout.footerReferenceSize.height;
            }
        }
    };
    return UICollectionView;
}(UIView_1.UIView));
exports.UICollectionView = UICollectionView;
//# sourceMappingURL=UICollectionView.js.map