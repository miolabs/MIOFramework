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
var MIOFoundation_1 = require("../MIOFoundation");
var UIScrollView_1 = require("./UIScrollView");
var UIView_1 = require("./UIView");
var UITableViewCell_1 = require("./UITableViewCell");
var platform_1 = require("../MIOCore/platform");
var UILabel_1 = require("./UILabel");
var _1 = require(".");
var UITableViewRowAnimation;
(function (UITableViewRowAnimation) {
    UITableViewRowAnimation[UITableViewRowAnimation["None"] = 0] = "None";
    UITableViewRowAnimation[UITableViewRowAnimation["Automatic"] = 1] = "Automatic";
    UITableViewRowAnimation[UITableViewRowAnimation["Fade"] = 2] = "Fade";
    UITableViewRowAnimation[UITableViewRowAnimation["Right"] = 3] = "Right";
    UITableViewRowAnimation[UITableViewRowAnimation["Left"] = 4] = "Left";
    UITableViewRowAnimation[UITableViewRowAnimation["Top"] = 5] = "Top";
    UITableViewRowAnimation[UITableViewRowAnimation["Bottom"] = 6] = "Bottom";
    UITableViewRowAnimation[UITableViewRowAnimation["Middle"] = 7] = "Middle";
})(UITableViewRowAnimation = exports.UITableViewRowAnimation || (exports.UITableViewRowAnimation = {}));
var UITableViewSection = /** @class */ (function (_super) {
    __extends(UITableViewSection, _super);
    function UITableViewSection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.header = null;
        _this.title = null;
        _this.footer = null;
        _this.rowCount = 0;
        _this.cells = [];
        _this.rows = [];
        return _this;
    }
    UITableViewSection.headerWithTitle = function (title, height) {
        var header = new UIView_1.UIView();
        header.init();
        header.setHeight(height);
        //header.layer.style.background = "";
        //header.layer.style.margin = "4px 8px";
        _1.UICoreLayerRemoveStyle(header.layer, "view");
        _1.UICoreLayerAddStyle(header.layer, "header");
        var titleLabel = new UILabel_1.UILabel();
        titleLabel.init();
        // titleLabel.layer.style.background = "";
        _1.UICoreLayerRemoveStyle(titleLabel.layer, "lbl");
        _1.UICoreLayerAddStyle(titleLabel.layer, "title");
        titleLabel.text = title;
        header.addSubview(titleLabel);
        return header;
    };
    return UITableViewSection;
}(MIOFoundation_1.MIOObject));
exports.UITableViewSection = UITableViewSection;
var UITableViewRowType;
(function (UITableViewRowType) {
    UITableViewRowType[UITableViewRowType["Header"] = 0] = "Header";
    UITableViewRowType[UITableViewRowType["SectionHeader"] = 1] = "SectionHeader";
    UITableViewRowType[UITableViewRowType["Cell"] = 2] = "Cell";
    UITableViewRowType[UITableViewRowType["SectionFooter"] = 3] = "SectionFooter";
    UITableViewRowType[UITableViewRowType["Footer"] = 4] = "Footer";
})(UITableViewRowType = exports.UITableViewRowType || (exports.UITableViewRowType = {}));
var UITableViewRow = /** @class */ (function (_super) {
    __extends(UITableViewRow, _super);
    function UITableViewRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = null;
        _this.height = 0;
        _this.prevRow = null;
        _this.nextRow = null;
        return _this;
    }
    UITableViewRow.prototype.initWithType = function (type) {
        this.type = type;
    };
    return UITableViewRow;
}(MIOFoundation_1.MIOObject));
exports.UITableViewRow = UITableViewRow;
var UITableViewCellNode = /** @class */ (function (_super) {
    __extends(UITableViewCellNode, _super);
    function UITableViewCellNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.identifier = null;
        _this.section = null;
        return _this;
    }
    return UITableViewCellNode;
}(MIOFoundation_1.MIOObject));
exports.UITableViewCellNode = UITableViewCellNode;
var UITableView = /** @class */ (function (_super) {
    __extends(UITableView, _super);
    function UITableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = null;
        _this.delegate = null;
        _this.headerView = null;
        _this.footerView = null;
        _this.headerHeight = 0;
        _this.footerHeight = 0;
        _this.sectionHeaderHeight = 23;
        _this.sectionFooterHeight = 23;
        _this.rowHeight = 0;
        _this.defaultRowHeight = 44;
        _this.allowsMultipleSelection = false;
        _this.selectedIndexPath = null;
        _this._indexPathsForSelectedRows = [];
        _this._cellPrototypesCount = 0;
        _this._cellPrototypesDownloadedCount = 0;
        _this._isDownloadingCells = false;
        _this._needReloadData = false;
        _this._cellPrototypes = {};
        _this.visibleCells = [];
        _this.reusableCellsByID = {};
        _this.cellNodesByID = {};
        _this.visibleRange = new MIOFoundation_1.MIORange(-1, -1);
        _this.sections = [];
        _this.rows = [];
        _this.cellRows = [];
        _this.rowsCount = 0;
        _this.contentHeight = 0;
        _this.lastContentOffsetY = -_this.defaultRowHeight;
        _this.firstVisibleHeader = null;
        _this.reloadingData = false;
        _this.selectedCellWhileReloadingData = null;
        _this.reloadLayoutSubviews = false;
        _this.lastIndexPath = null;
        return _this;
    }
    UITableView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check if we have prototypes
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this._addCellPrototypeWithLayer(subLayer, owner);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-tableview-header") != null) {
                    this._addHeaderWithLayer(subLayer, owner);
                }
                else if (subLayer.getAttribute("data-tableview-footer") != null) {
                    this._addFooterWithLayer(subLayer, owner);
                }
            }
        }
    };
    UITableView.prototype._addHeaderWithLayer = function (subLayer, owner) {
        this.headerView = new UIView_1.UIView();
        this.headerView.initWithLayer(subLayer, owner);
        // var h = this.headerView.getHeight();
        // var size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        // this.headerView.setFrame(MIOFrame.frameWithRect(0, 0, size.width, size.height));
    };
    UITableView.prototype._addFooterWithLayer = function (subLayer, owner) {
        this.footerView = new UIView_1.UIView();
        this.footerView.initWithLayer(subLayer, owner);
        // var size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        // this.footerView.setFrame(MIOFrame.frameWithRect(0, 0, size.width, size.height));
    };
    UITableView.prototype._addCellPrototypeWithLayer = function (subLayer, owner) {
        var cellIdentifier = subLayer.getAttribute("data-cell-identifier");
        var cellClassname = subLayer.getAttribute("data-class");
        if (cellClassname == null)
            cellClassname = "UITableViewCell";
        var item = {};
        item["class"] = cellClassname;
        item["layer"] = subLayer;
        var size = new MIOFoundation_1.MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null)
            item["size"] = size;
        // var bg = window.getComputedStyle( subLayer ,null).getPropertyValue('background-color');
        // if (bg != null) item["bg"] = bg;
        this._cellPrototypes[cellIdentifier] = item;
    };
    UITableView.prototype.addCellPrototypeWithIdentifier = function (identifier, elementID, url, classname) {
        var item = {};
        this._isDownloadingCells = true;
        this._cellPrototypesCount++;
        item["url"] = url;
        item["id"] = elementID;
        if (classname != null)
            item["class"] = classname;
        this._cellPrototypes[identifier] = item;
        var mainBundle = MIOFoundation_1.MIOBundle.mainBundle();
        mainBundle.loadHTMLNamed(url, elementID, this, function (layer) {
            item["layer"] = layer;
            this._cellPrototypes[identifier] = item;
            this._cellPrototypesDownloadedCount++;
            if (this._cellPrototypesDownloadedCount == this._cellPrototypesCount) {
                this._isDownloadingCells = false;
                if (this._needReloadData)
                    this.reloadData();
            }
        });
    };
    UITableView.prototype.dequeueReusableCellWithIdentifier = function (identifier) {
        var cell = null;
        var array = this.reusableCellsByID[identifier];
        if (array != null) {
            if (array.length > 0) {
                cell = array[0];
                array.splice(0, 1);
                cell.addObserver(this, "selected");
                return cell;
            }
        }
        var item = this._cellPrototypes[identifier];
        //instance creation here
        var className = item["class"];
        cell = platform_1.MIOClassFromString(className);
        cell.nodeID = MIOFoundation_1.MIOUUID.UUID().UUIDString;
        cell.reuseIdentifier = identifier;
        var layer = item["layer"];
        if (layer != null) {
            var newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            cell.initWithLayer(newLayer, this);
            cell.awakeFromHTML();
        }
        // else {
        //     let cells = item["cells"];
        //     if (cells == null) {
        //         cells = [];
        //         item["cells"] = cells;
        //     }
        //     cells.push(cell);
        // }        
        cell.addObserver(this, "selected");
        return cell;
    };
    UITableView.prototype.setHeaderView = function (view) {
        this.headerView = view;
        this.addSubview(this.headerView);
    };
    UITableView.prototype.reloadData = function () {
        this.reloadingData = true;
        // Remove all subviews
        for (var index = 0; index < this.rows.length; index++) {
            var row = this.rows[index];
            if (row.view != null) {
                switch (row.type) {
                    case UITableViewRowType.Header:
                    case UITableViewRowType.Footer:
                        break;
                    case UITableViewRowType.Cell:
                        this.recycleCell(row.view);
                        row.view.removeFromSuperview();
                        break;
                    default:
                        row.view.removeFromSuperview();
                }
            }
        }
        this.rows = [];
        this.sections = [];
        this.rowsCount = 0;
        this.selectedIndexPath = null;
        this.visibleRange = new MIOFoundation_1.MIORange(-1, -1);
        //this.lastContentOffsetY = -this.defaultRowHeight;
        this.lastContentOffsetY = 0;
        this.contentHeight = 0;
        // Is ready to reaload or the are still donwloading
        if (this._isDownloadingCells == true) {
            this._needReloadData = true;
            return;
        }
        if (this.dataSource == null)
            return;
        var sections = 1;
        if (typeof this.dataSource.numberOfSections === "function")
            sections = this.dataSource.numberOfSections(this);
        for (var sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
            var section = new UITableViewSection();
            section.init();
            this.sections.push(section);
            var rows = this.dataSource.numberOfRowsInSection(this, sectionIndex);
            section.rowCount = rows;
            this.rowsCount += rows;
            this.contentHeight += rows * this.defaultRowHeight;
        }
        var size = new MIOFoundation_1.MIOSize(0, this.contentHeight);
        this.contentSize = size;
        this.scrollToTop();
        this.reloadLayoutSubviews = true;
        if (this.rowsCount > 0)
            this.setNeedsDisplay();
        this.reloadingData = false;
        if (this.selectedCellWhileReloadingData != null) {
            var ip = this.indexPathForCell(this.selectedCellWhileReloadingData);
            this.selectedIndexPath = ip;
            this.selectedCellWhileReloadingData = null;
        }
    };
    UITableView.prototype.layoutSubviews = function () {
        if (this.reloadLayoutSubviews == true) {
            this.reloadLayoutSubviews = false;
            this.initialLayoutSubviews();
        }
        else {
            this.scrollLayoutSubviews();
        }
    };
    UITableView.prototype.initialLayoutSubviews = function () {
        // Add Header
        var posY = this.addHeader();
        var maxY = this.getHeight() + (this.defaultRowHeight * 4);
        var exit = false;
        var lastRow = null;
        for (var sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {
            if (exit == true)
                break;
            var section = this.sections[sectionIndex];
            if (section.rowCount > 0)
                posY += this.addSectionHeader(section, posY, null);
            for (var cellIndex = 0; cellIndex < section.rowCount; cellIndex++) {
                var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(cellIndex, sectionIndex);
                posY += this.addCell(ip, posY, null, lastRow);
                lastRow = this.rows[this.rows.length - 1];
                this.lastIndexPath = ip;
                if (cellIndex == section.rowCount - 1)
                    posY += this.addSectionFooter(section, posY, null);
                if (posY >= maxY) {
                    exit = true;
                    break;
                }
            }
        }
        // Add Footer
        if (posY < maxY)
            posY += this.addFooter();
        this.visibleRange = new MIOFoundation_1.MIORange(0, this.rows.length);
        var size = new MIOFoundation_1.MIOSize(0, this.contentHeight);
        this.contentSize = size;
        this.lastContentOffsetY = 0;
    };
    UITableView.prototype.scrollLayoutSubviews = function () {
        if (this.rowsCount == 0)
            return;
        var scrollDown = false;
        var offsetY = 0;
        if (this.contentOffset.y == this.lastContentOffsetY)
            return;
        if (this.contentOffset.y > this.lastContentOffsetY) {
            offsetY = this.contentOffset.y - this.lastContentOffsetY;
            scrollDown = true;
        }
        else if (this.contentOffset.y < this.lastContentOffsetY) {
            offsetY = this.lastContentOffsetY - this.contentOffset.y;
            scrollDown = false;
        }
        if (offsetY < (this.defaultRowHeight / 2))
            return;
        this.lastContentOffsetY = this.contentOffset.y;
        if (scrollDown == true) {
            var start = this.visibleRange.location;
            var end = this.visibleRange.location + this.visibleRange.length - 1;
            var row = this.rows[end];
            var posY = row.view.getY() + row.height;
            var maxY = this.contentOffset.y + this.getHeight() + (this.defaultRowHeight * 4);
            var startSectionIndex = this.lastIndexPath.section;
            var startRowIndex = this.lastIndexPath.row + 1;
            var lastRow = row;
            var nextRow = end + 1;
            var h = 0;
            var exit = false;
            for (var sectionIndex = startSectionIndex; sectionIndex < this.sections.length; sectionIndex++) {
                if (exit == true)
                    break;
                var section = this.sections[sectionIndex];
                for (var cellIndex = startRowIndex; cellIndex < section.rowCount; cellIndex++) {
                    if (cellIndex == 0) {
                        h = this.addSectionHeader(section, posY, this.rows[nextRow]);
                        posY += h;
                        if (h > 0) {
                            nextRow++;
                            start++;
                        }
                    }
                    var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(cellIndex, sectionIndex);
                    posY += this.addCell(ip, posY, this.rows[nextRow], lastRow);
                    lastRow = this.rows[nextRow];
                    nextRow++;
                    start++;
                    // let recycleRow:UITableViewRow = this.rows[start];
                    // if (recycleRow.type == UITableViewRowType.Cell) {
                    //     this.recycleCell(recycleRow.view as UITableViewCell);                            
                    // }                        
                    this.lastIndexPath = ip;
                    if (section.rowCount - 1 == cellIndex) {
                        h = this.addSectionFooter(section, posY, this.rows[nextRow]);
                        posY += h;
                        if (h > 0) {
                            nextRow++;
                            start++;
                        }
                    }
                    if (posY >= maxY) {
                        exit = true;
                        break;
                    }
                }
                startRowIndex = 0;
            }
            // Add Footer
            // if (posY < maxY) {
            //     posY += this.addFooter();
            // }
            this.visibleRange = new MIOFoundation_1.MIORange(start, nextRow - start);
        }
        var size = new MIOFoundation_1.MIOSize(0, this.contentHeight);
        this.contentSize = size;
    };
    UITableView.prototype.recycleCell = function (cell) {
        if (cell == null)
            return;
        var ip = this.indexPathForCell(cell);
        if (ip.row == -1)
            return;
        var section = this.sections[ip.section];
        section.cells[ip.row] = null;
        //cell.selected = false;
        cell.removeObserver(this, "selected");
        var array = this.reusableCellsByID[cell.reuseIdentifier];
        if (array == null) {
            array = [];
            this.reusableCellsByID[cell.reuseIdentifier] = array;
        }
        array.push(cell);
        if (this.delegate != null) {
            if (typeof this.delegate.didEndDisplayingCellAtIndexPath === "function")
                this.delegate.didEndDisplayingCellAtIndexPath(this, cell, ip);
        }
    };
    UITableView.prototype.indexPathForRowIndex = function (index, sectionIndex) {
        var section = this.sections[sectionIndex];
        if (index < section.rows) {
            return MIOFoundation_1.MIOIndexPath.indexForRowInSection(index, sectionIndex);
        }
        else {
            var nextIndex = index - section.rows;
            return this.indexPathForRowIndex(nextIndex, sectionIndex + 1);
        }
    };
    UITableView.prototype.addRowsForNewVisibleRange = function (range, scrollDown) {
        var row;
        var start;
        var end;
        var posY = 0;
        if (this.visibleRange.location == -1) {
            start = range.location;
            end = range.length;
            posY = 0;
        }
        else if (scrollDown == true) {
            start = this.visibleRange.location + this.visibleRange.length - 1;
            end = range.location + range.length;
        }
        else {
            start = range.location;
            end = this.visibleRange.location;
            row = this.rows[end];
            posY = row.view.getY();
        }
        if (scrollDown == true) {
            row = this.rows[start];
            posY = row.view.getY();
            for (var index = start; index < end; index++) {
                row = this.rows[index];
                if (MIOFoundation_1.MIOLocationInRange(index, this.visibleRange) == true) {
                    posY += row.height;
                }
                else {
                    // if (ip.row == 0) {
                    //     let section = this.sections[ip.section];
                    //     posY += this.addSectionHeader(section, posY, index);
                    // }
                    var ip = this.indexPathForRowIndex(index, 0);
                    posY += this.addCell(ip, posY, index, null);
                }
            }
        }
        else {
            for (var index = end; index >= start; index--) {
                if (MIOFoundation_1.MIOLocationInRange(index, this.visibleRange) == false) {
                    // if (rowIndex == section.rows - 1) {
                    //     section.header = this.addSectionHeader(sectionIndex);
                    // }
                    row = this.rows[index];
                    var h = row.height;
                    row = this.rows[index + 1];
                    posY = row.view.getY() - h;
                    var ip = this.indexPathForRowIndex(index, 0);
                    this.addCell(ip, posY, index, null, row);
                }
            }
        }
    };
    UITableView.prototype.addRowWithType = function (type, view) {
        var row = new UITableViewRow();
        row.initWithType(type);
        this.rows.push(row);
        this.cellRows.addObject(row);
        row.view = view;
        return row;
    };
    UITableView.prototype.addHeader = function () {
        var header = null;
        if (this.headerView != null)
            header = this.headerView;
        if (header == null)
            return 0;
        header.setX(0);
        header.setY(0);
        header.setWidth(this.getWidth());
        this.addSubview(header);
        var row = this.addRowWithType(UITableViewRowType.Header, header);
        if (row.height == 0) {
            row.height = header.getHeight() + 1;
            this.contentHeight += row.height;
        }
        return row.height;
    };
    UITableView.prototype.addSectionHeader = function (section, posY, row) {
        if (row != null && row.view != null)
            return row.height;
        var sectionIndex = this.sections.indexOf(section);
        if (typeof this.dataSource.viewForHeaderInSection === "function") {
            var view = this.dataSource.viewForHeaderInSection(this, sectionIndex);
            if (view == null)
                return 0;
            view.setX(0);
            view.setY(posY);
            section.header = view;
            this.addSubview(view);
            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionHeader, section.header);
            }
            row.view = view;
            if (row.height == 0) {
                row.height = view.getHeight();
                ;
                this.contentHeight += row.height;
            }
            return row.height;
        }
        else if (typeof this.dataSource.titleForHeaderInSection === "function") {
            var title = this.dataSource.titleForHeaderInSection(this, sectionIndex);
            if (title == null)
                return null;
            var header = UITableViewSection.headerWithTitle(title, this.sectionHeaderHeight);
            header.setX(0);
            header.setY(posY);
            section.header = header;
            this.addSubview(header);
            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionHeader, section.header);
            }
            row.view = header;
            if (row.height == 0) {
                row.height = header.getHeight();
                ;
                this.contentHeight += row.height;
            }
            return row.height;
        }
        return 0;
    };
    UITableView.prototype.addCell = function (indexPath, posY, row, prevRow, currentRow) {
        var cell = this.dataSource.cellAtIndexPath(this, indexPath);
        if (row != null && row.view != null)
            return row.height;
        var r = row;
        if (r == null) {
            r = this.addRowWithType(UITableViewRowType.Cell, cell);
        }
        if (currentRow != null && prevRow != null) {
            prevRow.nextRow = r;
            currentRow.prevRow = r;
            r.prevRow = prevRow;
            r.nextRow = currentRow;
        }
        else if (currentRow != null) {
            r.nextRow = currentRow;
            r.prevRow = currentRow.prevRow;
            currentRow.prevRow = r;
        }
        else if (prevRow != null) {
            r.prevRow = prevRow;
            prevRow.nextRow = r;
        }
        var nodeID = cell.nodeID;
        var node = this.cellNodesByID[nodeID];
        if (node == null) {
            node = new UITableViewCellNode();
            node.identifier = nodeID;
            this.cellNodesByID[nodeID] = node;
        }
        var section = this.sections[indexPath.section];
        node.section = section;
        section.cells[indexPath.row] = cell;
        section.rows[indexPath.row] = r;
        cell.setX(0);
        cell.setY(posY);
        // TODO: Here we don't have to use the css. Encapsulate that in a Core Layer funciton
        //cell.layer.style.width = "100%";
        if (this.delegate != null && typeof this.delegate.willDisplayCellAtIndexPath === "function") {
            this.delegate.willDisplayCellAtIndexPath(this, cell, indexPath);
        }
        if (prevRow == null) {
            this.addSubview(cell);
        }
        else {
            var index = this.contentView.subviews.indexOf(prevRow.view);
            this.addSubview(cell, index);
        }
        r.view = cell;
        cell.setNeedsDisplay();
        //TODO: these are private properties, can not be used from outside
        cell._target = this;
        cell._onClickFn = this.cellOnClickFn;
        cell._onDblClickFn = this.cellOnDblClickFn;
        cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;
        var h = this.rowHeight;
        if (this.delegate != null && typeof this.delegate.heightForRowAtIndexPath === "function") {
            h = this.delegate.heightForRowAtIndexPath(this, indexPath);
            if (r.height != h) {
                if (r.height == 0) {
                    this.contentHeight -= this.defaultRowHeight;
                    this.contentHeight += h;
                }
                else {
                    this.contentHeight -= r.height;
                    this.contentHeight += h;
                }
                r.height = h;
            }
        }
        if (h > 0) {
            cell.setHeight(h);
        }
        else {
            h = cell.getHeight();
            if (r.height == 0) {
                r.height = h;
                this.contentHeight -= this.defaultRowHeight;
                this.contentHeight += h;
            }
        }
        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            var editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
            cell.setEditingAccessoryType(editingStyle);
        }
        return r.height;
    };
    UITableView.prototype.addSectionFooter = function (section, posY, row) {
        if (row != null && row.type != UITableViewRowType.SectionFooter)
            return 0;
        if (row != null && row.view != null)
            return row.height;
        var sectionIndex = this.sections.indexOf(section);
        if (typeof this.dataSource.viewForFooterInSection === "function") {
            var view = this.dataSource.viewForFooterInSection(this, sectionIndex);
            if (view == null)
                return 0;
            view.setX(0);
            view.setY(posY);
            section.footer = view;
            this.addSubview(view);
            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionFooter, section.footer);
            }
            row.view = view;
            if (row.height == 0) {
                row.height = view.getHeight();
                this.contentHeight += row.height;
            }
            return row.height;
        }
        return 0;
    };
    UITableView.prototype.addFooter = function () {
        return 0;
    };
    UITableView.prototype.cellOnClickFn = function (cell) {
        var indexPath = this.indexPathForCell(cell);
        var canSelectCell = true;
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
    };
    UITableView.prototype.cellOnDblClickFn = function (cell) {
        /*        let indexPath: MIOIndexPath = this.indexPathForCell(cell);
        
                let canSelectCell = true;
        
                if (this.delegate != null) {
                    if (typeof this.delegate.canSelectCellAtIndexPath === "function")
                        canSelectCell = this.delegate.canSelectCellAtIndexPath(this, indexPath);
                }
        
                if (canSelectCell == false)
                    return;
        
                if (this.delegate != null) {
                    if (typeof this.delegate.didMakeDoubleClick === "function")
                        this.delegate.didMakeDoubleClick(this, indexPath);
                }
        
                if (this.selectedIndexPath.isEqualToIndexPath(indexPath) == false) {
        
                    if (this.allowsMultipleSelection == false) {
                        if (this.selectedIndexPath != null)
                            this.deselectCellAtIndexPath(this.selectedIndexPath);
                    }
        
                    this.selectedIndexPath = indexPath;
                    cell.selected = true;
                }
        
                if (this.delegate != null) {
                    if (typeof this.delegate.didSelectCellAtIndexPath === "function")
                        this.delegate.didSelectCellAtIndexPath(this, indexPath);
                }*/
    };
    UITableView.prototype.cellOnAccessoryClickFn = function (cell) {
        if (cell.accessoryType != UITableViewCell_1.UITableViewCellAccessoryType.None)
            return;
        var indexPath = this.indexPathForCell(cell);
        if (this.delegate != null && typeof this.delegate.accessoryButtonTappedForRowWithIndexPath === "function") {
            this.delegate.accessoryButtonTappedForRowWithIndexPath(this, indexPath);
        }
    };
    UITableView.prototype.cellOnEditingAccessoryClickFn = function (cell) {
        var indexPath = this.indexPathForCell(cell);
        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            var editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
            if (this.delegate != null && typeof this.delegate.commitEditingStyleForRowAtIndexPath === "function") {
                this.delegate.commitEditingStyleForRowAtIndexPath(this, editingStyle, indexPath);
            }
        }
    };
    UITableView.prototype.cellAtIndexPath = function (indexPath) {
        var s = this.sections[indexPath.section];
        var c = s.cells[indexPath.row];
        return c;
    };
    UITableView.prototype.indexPathForCell = function (cell) {
        var node = this.cellNodesByID[cell.nodeID];
        if (node == null)
            return null;
        var section = node.section;
        var sectionIndex = this.sections.indexOf(section);
        var rowIndex = section.cells.indexOf(cell);
        return MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
    };
    UITableView.prototype.selectCellAtIndexPath = function (indexPath) {
        if (this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == true)
            return;
        //if (this.selectedIndexPath != null) this.deselectCellAtIndexPath(this.selectedIndexPath);
        //this.selectedIndexPath = indexPath;
        var cell = this.sections[indexPath.section].cells[indexPath.row];
        if (cell != null)
            cell.selected = true;
    };
    UITableView.prototype.deselectCellAtIndexPath = function (indexPath) {
        if (this.selectedIndexPath == null)
            return;
        if (this.selectedIndexPath.isEqualToIndexPath(indexPath) == false)
            return;
        //this.selectedIndexPath = null;
        var cell = this.sections[indexPath.section].cells[indexPath.row];
        if (cell != null)
            cell.selected = false;
    };
    UITableView.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "selected") {
            var cell = object;
            var indexPath = this.indexPathForCell(object);
            if (cell.selected == false && this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == true) {
                this.selectedIndexPath = null;
            }
            else if (cell.selected == true) {
                //TODO: Support multiple selection
                if (this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == false) {
                    var oldCell = this.cellAtIndexPath(this.selectedIndexPath);
                    if (oldCell != null)
                        oldCell.selected = false;
                }
                if (this.reloadingData == true)
                    this.selectedCellWhileReloadingData = cell;
                this.selectedIndexPath = indexPath;
            }
        }
    };
    UITableView.prototype.insertRowsAtIndexPaths = function (indexPaths, animation) {
        var rows = indexPaths.count;
        this.rowsCount += rows;
        this.contentHeight += rows * this.defaultRowHeight;
        var maxY = this.contentOffset.y + this.getHeight() + (this.defaultRowHeight * 4);
        for (var index = 0; index < rows; index++) {
            var ip = indexPaths[index];
            this.insertCellWithIndexPath(ip);
            // if (posY >= maxY) {
            //     break;
            // }      
            this.lastIndexPath = ip;
        }
        //this.visibleRange = new MIORange(start, nextRow - start);
        var size = new MIOFoundation_1.MIOSize(0, this.contentHeight);
        this.contentSize = size;
    };
    UITableView.prototype.insertCellWithIndexPath = function (indexPath) {
        var section = this.sections[indexPath.section];
        var prevRow = this.prevCellRowAtIndexPath(indexPath);
        var posY = 0;
        if (prevRow == null) {
            this.addCell(indexPath, posY, null, null);
        }
        else {
            posY = prevRow.view.getY() + prevRow.view.getHeight();
            posY += this.addCell(indexPath, posY, null, prevRow, prevRow.nextRow);
        }
        // recalculate top of the cells
        if (prevRow == null)
            return;
        var nextRow = prevRow.nextRow.nextRow;
        while (nextRow != null) {
            nextRow.view.setY(posY);
            posY += nextRow.view.getHeight();
            nextRow = nextRow.nextRow;
        }
    };
    UITableView.prototype.prevIndexPath = function (indexPath) {
        var sectionIndex = indexPath.section;
        var rowIndex = indexPath.row - 1;
        if (rowIndex > -1) {
            return MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
        }
        else {
            sectionIndex--;
            if (sectionIndex > -1) {
                var section = this.sections[sectionIndex];
                rowIndex = section.cells.length - 1;
                return MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            }
        }
        return null;
    };
    UITableView.prototype.prevCellRowAtIndexPath = function (indexPath) {
        if (indexPath == null)
            return null;
        var ip = this.prevIndexPath(indexPath);
        if (ip == null)
            return null;
        var section = this.sections[ip.section];
        var row = section.rows[ip.row];
        return row;
    };
    UITableView.prototype.deleteRowsAtIndexPaths = function (indexPaths, animation) {
    };
    UITableView.prototype.moveRowAtIndexPathToIndexPath = function (indexPath, newIndexPat) {
    };
    UITableView.prototype.selectNextIndexPath = function () {
        var sectionIndex = 0;
        var rowIndex = 0;
        if (this.selectedIndexPath != null) {
            sectionIndex = this.selectedIndexPath.section;
            rowIndex = this.selectedIndexPath.row;
            var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.deselectCellAtIndexPath(ip);
            rowIndex++;
        }
        if (this.sections.length == 0)
            return;
        var section = this.sections[sectionIndex];
        if (rowIndex < section.cells.length) {
            var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.selectCellAtIndexPath(ip);
        }
        else {
            rowIndex = 0;
            sectionIndex++;
            if (sectionIndex < this.sections.length) {
                var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
                this.selectCellAtIndexPath(ip);
            }
        }
    };
    UITableView.prototype.selectPrevIndexPath = function () {
        if (this.selectedIndexPath == null)
            return;
        var sectionIndex = this.selectedIndexPath.section;
        var rowIndex = this.selectedIndexPath.row - 1;
        if (rowIndex > -1) {
            var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex + 1, sectionIndex);
            this.deselectCellAtIndexPath(ip);
            var ip2 = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.selectCellAtIndexPath(ip2);
        }
        else {
            sectionIndex--;
            if (sectionIndex > -1) {
                var ip = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex + 1, sectionIndex + 1);
                this.deselectCellAtIndexPath(ip);
                var section = this.sections[sectionIndex];
                rowIndex = section.cells.length - 1;
                var ip2 = MIOFoundation_1.MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
                this.selectCellAtIndexPath(ip2);
            }
        }
    };
    return UITableView;
}(UIScrollView_1.UIScrollView));
exports.UITableView = UITableView;
//# sourceMappingURL=UITableView.js.map