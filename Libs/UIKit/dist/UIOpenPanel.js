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
var UIWindow_1 = require("./UIWindow");
var MIOUI_CoreLayer_1 = require("./MIOUI_CoreLayer");
var MIOFileHandlingPanel;
(function (MIOFileHandlingPanel) {
    MIOFileHandlingPanel[MIOFileHandlingPanel["OKButton"] = 0] = "OKButton";
})(MIOFileHandlingPanel = exports.MIOFileHandlingPanel || (exports.MIOFileHandlingPanel = {}));
var UIOpenPanel = /** @class */ (function (_super) {
    __extends(UIOpenPanel, _super);
    function UIOpenPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.files = [];
        _this.panelTarget = null;
        _this.panelCompletion = null;
        _this._inputLayer = null;
        return _this;
    }
    UIOpenPanel.openPanel = function () {
        var op = new UIOpenPanel();
        op.init();
        return op;
    };
    UIOpenPanel.prototype.beginSheetModalForWindow = function (window, target, completion) {
        this.panelTarget = target;
        this.panelCompletion = completion;
        //Web hack to open dialog
        var instance = this;
        this._inputLayer = document.createElement("INPUT");
        this._inputLayer.setAttribute("type", "file");
        this._inputLayer.style.display = "none";
        this._inputLayer.addEventListener('change', function (ev) {
            var files = ev.target.files; // FileList object
            instance.filesDidSelect(files);
        }, false);
        MIOUI_CoreLayer_1.UICoreLayerAddSublayer(window.layer, this._inputLayer);
        this._inputLayer.click();
    };
    UIOpenPanel.prototype.filesDidSelect = function (files) {
        this.files = files;
        if (this.panelTarget != null && this.panelCompletion != null) {
            this.panelCompletion.call(this.panelTarget, MIOFileHandlingPanel.OKButton);
        }
    };
    return UIOpenPanel;
}(UIWindow_1.UIWindow));
exports.UIOpenPanel = UIOpenPanel;
//# sourceMappingURL=UIOpenPanel.js.map