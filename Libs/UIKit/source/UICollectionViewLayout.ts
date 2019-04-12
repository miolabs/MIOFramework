import { MIOObject, MIOSize, MIOIndexPath } from "../MIOFoundation";
import { UICollectionView } from "./UICollectionView";
import { UICollectionViewLayoutAttributes } from "./UICollectionViewLayoutAttributes";
import { UICollectionViewUpdateItem } from "./UICollectionViewUpdateItem";
import { UIEdgeInsets } from "./UIEdgeInsets";

export class UICollectionViewLayout extends MIOObject
{    
    collectionView:UICollectionView = null;

    minimumLineSpacing = 0;
    minimumInteritemSpacing = 0;
    itemSize = new MIOSize(0,0);
    estimatedItemSize = new MIOSize(0,0);
    sectionInset:UIEdgeInsets = null;
    headerReferenceSize:MIOSize = new MIOSize(0, 0);
    footerReferenceSize:MIOSize = new MIOSize(0, 0);

    init(){
        super.init();

        this.sectionInset = new UIEdgeInsets();
        this.sectionInset.init();
    }

    invalidateLayout(){}    

    get collectionViewContentSize():MIOSize {return MIOSize.Zero();}

    layoutAttributesForItemAtIndexPath(indexPath:MIOIndexPath):UICollectionViewLayoutAttributes{return null};

    prepareForCollectionViewUpdates(updateItems:UICollectionViewUpdateItem[]){}
    initialLayoutAttributesForAppearingItemAtIndexPath(itemIndexPath:MIOIndexPath):UICollectionViewLayoutAttributes {return null;}
    finalLayoutAttributesForDisappearingItemAtIndexPath(itemIndexPath:MIOIndexPath):UICollectionViewLayoutAttributes {return null;}
    finalizeCollectionViewUpdates(){}
}

export enum MIOCollectionViewScrollDirection {
    Vertical,
    Horizontal
}

export class UICollectionViewFlowLayout extends UICollectionViewLayout
{
    scrollDirection = MIOCollectionViewScrollDirection.Vertical;

    init(){
        super.init();

        this.minimumLineSpacing = 10;
        this.minimumInteritemSpacing = 10;
        this.itemSize = new MIOSize(50, 50);
    }
}