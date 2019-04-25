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
var UICollectionViewLayoutAttributes = /** @class */ (function (_super) {
    __extends(UICollectionViewLayoutAttributes, _super);
    function UICollectionViewLayoutAttributes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.indexPath = null;
        return _this;
    }
    return UICollectionViewLayoutAttributes;
}(MIOFoundation_1.MIOObject));
exports.UICollectionViewLayoutAttributes = UICollectionViewLayoutAttributes;
//# sourceMappingURL=UICollectionViewLayoutAttributes.js.map