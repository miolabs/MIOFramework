import { NSObject } from "mio-foundation-web";
import { CGSize } from "mio-foundation-web";
import { NSIndexPath } from "mio-foundation-web";
import { UICollectionView } from "./UICollectionView";
import { UICollectionViewLayoutAttributes } from "./UICollectionViewLayoutAttributes";
import { UICollectionViewUpdateItem } from "./UICollectionViewUpdateItem";
import { UIEdgeInsets } from "./UIEdgeInsets";

export class UICollectionViewLayout extends NSObject
{    
    collectionView:UICollectionView = null;

    minimumLineSpacing = 0;
    minimumInteritemSpacing = 0;
    itemSize = new CGSize(0,0);
    estimatedItemSize = new CGSize(0,0);
    sectionInset:UIEdgeInsets = null;
    headerReferenceSize:CGSize = new CGSize(0, 0);
    footerReferenceSize:CGSize = new CGSize(0, 0);

    init(){
        super.init();

        this.sectionInset = new UIEdgeInsets();
        this.sectionInset.init();
    }

    invalidateLayout(){}    

    get collectionViewContentSize():CGSize {return CGSize.Zero();}

    layoutAttributesForItemAtIndexPath(indexPath:NSIndexPath):UICollectionViewLayoutAttributes{return null};

    prepareForCollectionViewUpdates(updateItems:UICollectionViewUpdateItem[]){}
    initialLayoutAttributesForAppearingItemAtIndexPath(itemIndexPath:NSIndexPath):UICollectionViewLayoutAttributes {return null;}
    finalLayoutAttributesForDisappearingItemAtIndexPath(itemIndexPath:NSIndexPath):UICollectionViewLayoutAttributes {return null;}
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
        this.itemSize = new CGSize(50, 50);
    }
}