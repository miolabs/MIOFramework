import { IndexPath, NSObject } from "foundation";
import { UIEdgeInsets } from "./UIEdgeInsets";
import { CGSize } from "./CoreGraphics/CGSize";
import { UICollectionViewLayoutAttributes } from "./UICollectionViewLayoutAttributes";
import { UICollectionViewUpdateItem } from "./UICollectionViewUpdateItem";
import { UICollectionView } from "./UICollectionView";

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

    initWithLayer(layer, owner, options?){
        this.sectionInset = new UIEdgeInsets();
        this.sectionInset.init();

        if (layer.childNodes.length > 0){
            for(var index = 0; index < layer.childNodes.length; index++){
                var subLayer = layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                if (subLayer.getAttribute("data-key") != null) {
                    this.setKeyValueFromLayer(subLayer);
                    subLayer.style.display = "none";
                }
            }
        }                
    }
    
    setKeyValueFromLayer(layer){
        let key = layer.getAttribute("data-key");
        let type = layer.getAttribute("data-type"); 
        
        if (type == "size"){
            let width = layer.getAttribute("data-width"); 
            let heigth = layer.getAttribute("data-height"); 
            let size = new CGSize(parseFloat(width), parseFloat(heigth));
            this[key] = size;
        }
    }

    invalidateLayout() {}

    get collectionViewContentSize() : CGSize { return CGSize.Zero(); }

    layoutAttributesForItemAtIndexPath( indexPath:IndexPath) : UICollectionViewLayoutAttributes { return null };

    prepareForCollectionViewUpdates( updateItems: UICollectionViewUpdateItem[] ) {}
    initialLayoutAttributesForAppearingItemAtIndexPath( itemIndexPath:IndexPath ) : UICollectionViewLayoutAttributes { return null; }
    finalLayoutAttributesForDisappearingItemAtIndexPath( itemIndexPath:IndexPath ) : UICollectionViewLayoutAttributes { return null; }
    finalizeCollectionViewUpdates() {}
}

enum MIOCollectionViewScrollDirection {
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

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        let direction = layer.getAttribute("data-collection-view-layout-direction");
        if (direction == "horizontal") this.scrollDirection = MIOCollectionViewScrollDirection.Horizontal;
        else if (direction == "vertical") this.scrollDirection = MIOCollectionViewScrollDirection.Vertical;
    }
    
}