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
var UIEdgeInsets_1 = require("./UIEdgeInsets");
var UICollectionViewLayout = /** @class */ (function (_super) {
    __extends(UICollectionViewLayout, _super);
    function UICollectionViewLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collectionView = null;
        _this.minimumLineSpacing = 0;
        _this.minimumInteritemSpacing = 0;
        _this.itemSize = new MIOFoundation_1.MIOSize(0, 0);
        _this.estimatedItemSize = new MIOFoundation_1.MIOSize(0, 0);
        _this.sectionInset = null;
        _this.headerReferenceSize = new MIOFoundation_1.MIOSize(0, 0);
        _this.footerReferenceSize = new MIOFoundation_1.MIOSize(0, 0);
        return _this;
    }
    UICollectionViewLayout.prototype.init = function () {
        _super.prototype.init.call(this);
        this.sectionInset = new UIEdgeInsets_1.UIEdgeInsets();
        this.sectionInset.init();
    };
    UICollectionViewLayout.prototype.invalidateLayout = function () { };
    Object.defineProperty(UICollectionViewLayout.prototype, "collectionViewContentSize", {
        get: function () { return MIOFoundation_1.MIOSize.Zero(); },
        enumerable: true,
        configurable: true
    });
    UICollectionViewLayout.prototype.layoutAttributesForItemAtIndexPath = function (indexPath) { return null; };
    ;
    UICollectionViewLayout.prototype.prepareForCollectionViewUpdates = function (updateItems) { };
    UICollectionViewLayout.prototype.initialLayoutAttributesForAppearingItemAtIndexPath = function (itemIndexPath) { return null; };
    UICollectionViewLayout.prototype.finalLayoutAttributesForDisappearingItemAtIndexPath = function (itemIndexPath) { return null; };
    UICollectionViewLayout.prototype.finalizeCollectionViewUpdates = function () { };
    return UICollectionViewLayout;
}(MIOFoundation_1.MIOObject));
exports.UICollectionViewLayout = UICollectionViewLayout;
var MIOCollectionViewScrollDirection;
(function (MIOCollectionViewScrollDirection) {
    MIOCollectionViewScrollDirection[MIOCollectionViewScrollDirection["Vertical"] = 0] = "Vertical";
    MIOCollectionViewScrollDirection[MIOCollectionViewScrollDirection["Horizontal"] = 1] = "Horizontal";
})(MIOCollectionViewScrollDirection = exports.MIOCollectionViewScrollDirection || (exports.MIOCollectionViewScrollDirection = {}));
var UICollectionViewFlowLayout = /** @class */ (function (_super) {
    __extends(UICollectionViewFlowLayout, _super);
    function UICollectionViewFlowLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollDirection = MIOCollectionViewScrollDirection.Vertical;
        return _this;
    }
    UICollectionViewFlowLayout.prototype.init = function () {
        _super.prototype.init.call(this);
        this.minimumLineSpacing = 10;
        this.minimumInteritemSpacing = 10;
        this.itemSize = new MIOFoundation_1.MIOSize(50, 50);
    };
    return UICollectionViewFlowLayout;
}(UICollectionViewLayout));
exports.UICollectionViewFlowLayout = UICollectionViewFlowLayout;
//# sourceMappingURL=UICollectionViewLayout.js.map