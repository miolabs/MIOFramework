import { MIOObject, MIOIndexPath } from "../MIOFoundation";
import { UIScrollView } from "./UIScrollView";
import { UIView } from "./UIView";
import { UITableViewCell } from "./UITableViewCell";
/**
 * Created by godshadow on 22/3/16.
 */
export interface UITableViewDataSource {
    viewForHeaderInSection?(tableView: UITableView, section: any): UIView;
    titleForHeaderInSection?(tableView: UITableView, section: any): string;
}
export declare enum UITableViewRowAnimation {
    None = 0,
    Automatic = 1,
    Fade = 2,
    Right = 3,
    Left = 4,
    Top = 5,
    Bottom = 6,
    Middle = 7
}
export declare class UITableViewSection extends MIOObject {
    header: UIView;
    title: string;
    footer: UIView;
    rowCount: number;
    cells: any[];
    rows: any[];
    static headerWithTitle(title: any, height: any): UIView;
}
export declare enum UITableViewRowType {
    Header = 0,
    SectionHeader = 1,
    Cell = 2,
    SectionFooter = 3,
    Footer = 4
}
export declare class UITableViewRow extends MIOObject {
    type: UITableViewRowType;
    view: UIView;
    height: number;
    prevRow: UITableViewRow;
    nextRow: UITableViewRow;
    initWithType(type: UITableViewRowType): void;
}
export declare class UITableViewCellNode extends MIOObject {
    identifier: string;
    section: UITableViewSection;
}
export declare class UITableView extends UIScrollView {
    dataSource: any;
    delegate: any;
    headerView: UIView;
    footerView: UIView;
    headerHeight: number;
    footerHeight: number;
    sectionHeaderHeight: number;
    sectionFooterHeight: number;
    rowHeight: number;
    private defaultRowHeight;
    allowsMultipleSelection: boolean;
    private selectedIndexPath;
    private _indexPathsForSelectedRows;
    private _cellPrototypesCount;
    private _cellPrototypesDownloadedCount;
    private _isDownloadingCells;
    private _needReloadData;
    private _cellPrototypes;
    visibleCells: any[];
    private reusableCellsByID;
    private cellNodesByID;
    private visibleRange;
    private sections;
    private rows;
    private cellRows;
    private rowsCount;
    private contentHeight;
    private lastContentOffsetY;
    private firstVisibleHeader;
    private reloadingData;
    private selectedCellWhileReloadingData;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _addHeaderWithLayer;
    private _addFooterWithLayer;
    private _addCellPrototypeWithLayer;
    addCellPrototypeWithIdentifier(identifier: any, elementID: any, url: any, classname?: any): void;
    dequeueReusableCellWithIdentifier(identifier: string): UITableViewCell;
    setHeaderView(view: any): void;
    reloadData(): void;
    private reloadLayoutSubviews;
    layoutSubviews(): void;
    private lastIndexPath;
    private initialLayoutSubviews;
    private scrollLayoutSubviews;
    private recycleCell;
    private indexPathForRowIndex;
    private addRowsForNewVisibleRange;
    private addRowWithType;
    private addHeader;
    private addSectionHeader;
    private addCell;
    private addSectionFooter;
    private addFooter;
    cellOnClickFn(cell: UITableViewCell): void;
    cellOnDblClickFn(cell: any): void;
    cellOnAccessoryClickFn(cell: UITableViewCell): void;
    cellOnEditingAccessoryClickFn(cell: UITableViewCell): void;
    cellAtIndexPath(indexPath: MIOIndexPath): any;
    indexPathForCell(cell: UITableViewCell): MIOIndexPath;
    selectCellAtIndexPath(indexPath: MIOIndexPath): void;
    deselectCellAtIndexPath(indexPath: MIOIndexPath): void;
    observeValueForKeyPath(keyPath: string, type: string, object: any, ctx: any): void;
    insertRowsAtIndexPaths(indexPaths: any, animation: UITableViewRowAnimation): void;
    private insertCellWithIndexPath;
    private prevIndexPath;
    private prevCellRowAtIndexPath;
    deleteRowsAtIndexPaths(indexPaths: any, animation: UITableViewRowAnimation): void;
    moveRowAtIndexPathToIndexPath(indexPath: MIOIndexPath, newIndexPat: MIOIndexPath): void;
    selectNextIndexPath(): void;
    selectPrevIndexPath(): void;
}
