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
var NSObject_1 = require("./NSObject");
var NSOperation = (function (_super) {
    __extends(NSOperation, _super);
    function NSOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.target = null;
        _this.completion = null;
        _this._dependencies = [];
        _this._isExecuting = false;
        _this._isFinished = false;
        _this._ready = true;
        return _this;
    }
    Object.defineProperty(NSOperation.prototype, "dependencies", {
        get: function () { return this._dependencies; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperation.prototype, "isExecuting", {
        get: function () { return this.executing(); },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.setExecuting = function (value) {
        if (value == this._isExecuting)
            return;
        this.willChangeValue("isExecuting");
        this._isExecuting = value;
        this.didChangeValue("isExecuting");
    };
    Object.defineProperty(NSOperation.prototype, "isFinished", {
        get: function () { return this.finished(); },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.setFinished = function (value) {
        if (value == this._isFinished)
            return;
        this.willChangeValue("isFinished");
        this._isFinished = value;
        this.didChangeValue("isFinished");
    };
    NSOperation.prototype.setReady = function (value) {
        if (value == this._ready)
            return;
        this.willChangeValue("ready");
        this._ready = value;
        this.didChangeValue("ready");
    };
    Object.defineProperty(NSOperation.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.addDependency = function (operation) {
        this._dependencies.push(operation);
        if (operation.isFinished == false) {
            operation.addObserver(this, "isFinished");
            this.setReady(false);
        }
    };
    NSOperation.prototype.main = function () { };
    NSOperation.prototype.start = function () {
        this.setExecuting(true);
        this.main();
        this.setExecuting(false);
        this.setFinished(true);
    };
    NSOperation.prototype.executing = function () {
        return this._isExecuting;
    };
    NSOperation.prototype.finished = function () {
        return this._isFinished;
    };
    NSOperation.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "isFinished") {
            var op = object;
            if (op.isFinished == true) {
                object.removeObserver(this, "isFinished");
                this.checkDependecies();
            }
        }
    };
    NSOperation.prototype.checkDependecies = function () {
        for (var index = 0; index < this._dependencies.length; index++) {
            var op = this._dependencies[index];
            if (op.isFinished == false)
                return;
        }
        this.setReady(true);
    };
    return NSOperation;
}(NSObject_1.NSObject));
exports.NSOperation = NSOperation;
var NSBlockOperation = (function (_super) {
    __extends(NSBlockOperation, _super);
    function NSBlockOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.executionBlocks = [];
        return _this;
    }
    NSBlockOperation.operationWithBlock = function (target, block) {
        var op = new NSBlockOperation();
        op.init();
    };
    NSBlockOperation.prototype.addExecutionBlock = function (target, block) {
        var item = {};
        item["Target"] = target;
        item["Block"] = block;
        this.executionBlocks.push(item);
    };
    NSBlockOperation.prototype.main = function () {
        for (var index = 0; index < this.executionBlocks.length; index++) {
            var item = this.executionBlocks[index];
            var target = item["Target"];
            var block = item["Block"];
            block.call(target);
        }
    };
    return NSBlockOperation;
}(NSOperation));
//# sourceMappingURL=NSOperation.js.map