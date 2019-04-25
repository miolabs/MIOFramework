import { UIView } from "./UIView";
import { MIOObject, MIOIndexPath } from "../MIOFoundation";
import { UICollectionViewFlowLayout } from "./UICollectionViewLayout";
/**
 * Created by godshadow on 09/11/2016.
 */
export declare class UICollectionViewCell extends UIView {
    _target: any;
    _onClickFn: any;
    _index: any;
    _section: any;
    selected: boolean;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    setSelected(value: any): void;
}
export declare class UICollectionViewSection extends MIOObject {
    header: any;
    footer: any;
    cells: any[];
}
export declare class UICollectionView extends UIView {
    dataSource: any;
    delegate: any;
    private _collectionViewLayout;
    private _cellPrototypes;
    private _supplementaryViews;
    private _sections;
    selectedCellIndex: number;
    selectedCellSection: number;
    collectionViewLayout: UICollectionViewFlowLayout;
    initWithLayer(layer: any, options: any): void;
    private _addCellPrototypeWithLayer;
    private _addSupplementaryViewPrototypeWithLayer;
    registerClassForCellWithReuseIdentifier(cellClassname: any, identifier: any): void;
    registerClassForSupplementaryViewWithReuseIdentifier(viewClass: any, identifier: any): void;
    dequeueReusableCellWithIdentifier(identifier: any): any;
    dequeueReusableSupplementaryViewWithReuseIdentifier(identifier: any): any;
    cellAtIndexPath(indexPath: MIOIndexPath): any;
    reloadData(): void;
    cellOnClickFn(cell: any): void;
    _selectCell(cell: any): void;
    selectCellAtIndexPath(index: any, section: any): void;
    _deselectCell(cell: any): void;
    deselectCellAtIndexPath(indexPath: MIOIndexPath): void;
    layoutSubviews(): void;
}
