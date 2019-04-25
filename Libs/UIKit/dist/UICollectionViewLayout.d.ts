import { MIOObject, MIOSize, MIOIndexPath } from "../MIOFoundation";
import { UICollectionView } from "./UICollectionView";
import { UICollectionViewLayoutAttributes } from "./UICollectionViewLayoutAttributes";
import { UICollectionViewUpdateItem } from "./UICollectionViewUpdateItem";
import { UIEdgeInsets } from "./UIEdgeInsets";
export declare class UICollectionViewLayout extends MIOObject {
    collectionView: UICollectionView;
    minimumLineSpacing: number;
    minimumInteritemSpacing: number;
    itemSize: any;
    estimatedItemSize: any;
    sectionInset: UIEdgeInsets;
    headerReferenceSize: MIOSize;
    footerReferenceSize: MIOSize;
    init(): void;
    invalidateLayout(): void;
    readonly collectionViewContentSize: MIOSize;
    layoutAttributesForItemAtIndexPath(indexPath: MIOIndexPath): UICollectionViewLayoutAttributes;
    prepareForCollectionViewUpdates(updateItems: UICollectionViewUpdateItem[]): void;
    initialLayoutAttributesForAppearingItemAtIndexPath(itemIndexPath: MIOIndexPath): UICollectionViewLayoutAttributes;
    finalLayoutAttributesForDisappearingItemAtIndexPath(itemIndexPath: MIOIndexPath): UICollectionViewLayoutAttributes;
    finalizeCollectionViewUpdates(): void;
}
export declare enum MIOCollectionViewScrollDirection {
    Vertical = 0,
    Horizontal = 1
}
export declare class UICollectionViewFlowLayout extends UICollectionViewLayout {
    scrollDirection: MIOCollectionViewScrollDirection;
    init(): void;
}
