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
var NSOperationQueue = (function (_super) {
    __extends(NSOperationQueue, _super);
    function NSOperationQueue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._operations = [];
        _this._suspended = false;
        return _this;
    }
    NSOperationQueue.prototype.addOperation = function (operation) {
        if (operation.isFinished == true) {
            throw new Error("NSOperationQueue: Tying to add an operation already finished");
        }
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.addObject(operation);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
        if (operation.ready == false) {
            operation.addObserver(this, "ready", null);
        }
        else {
            operation.addObserver(this, "isFinished", null);
            if (this.suspended == false)
                operation.start();
        }
    };
    NSOperationQueue.prototype.removeOperation = function (operation) {
        var index = this._operations.indexOf(operation);
        if (index == -1)
            return;
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.splice(index, 1);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
    };
    Object.defineProperty(NSOperationQueue.prototype, "operations", {
        get: function () {
            return this._operations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperationQueue.prototype, "operationCount", {
        get: function () {
            return this._operations.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperationQueue.prototype, "suspended", {
        get: function () {
            return this._suspended;
        },
        set: function (value) {
            this.setSupended(value);
        },
        enumerable: true,
        configurable: true
    });
    NSOperationQueue.prototype.setSupended = function (value) {
        if (this._suspended == value)
            return;
        this._suspended = value;
        if (value == true)
            return;
        for (var index = 0; index < this.operations.length; index++) {
            var op = this.operations[index];
            if (op.ready == true)
                op.start();
        }
    };
    NSOperationQueue.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "ready") {
            var op = object;
            if (op.ready == true) {
                op.removeObserver(this, "ready");
                op.addObserver(this, "isFinished", null);
                if (this.suspended == false)
                    op.start();
            }
        }
        else if (keyPath == "isFinished") {
            var op = object;
            if (op.isFinished == true) {
                op.removeObserver(this, "isFinished");
                this.removeOperation(op);
                if (op.target != null && op.completion != null)
                    op.completion.call(op.target);
            }
        }
    };
    return NSOperationQueue;
}(NSObject_1.NSObject));
exports.NSOperationQueue = NSOperationQueue;
//# sourceMappingURL=NSOperationQueue.js.map