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
var UIViewController_1 = require("./UIViewController");
var MIOFoundation_1 = require("../MIOFoundation");
var UILabel_1 = require("./UILabel");
var MUICalendarView_1 = require("./MUICalendarView");
var UIDatePickerController = /** @class */ (function (_super) {
    __extends(UIDatePickerController, _super);
    function UIDatePickerController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delegate = null;
        _this.tag = 0;
        _this.calendarView = null;
        return _this;
    }
    Object.defineProperty(UIDatePickerController.prototype, "preferredContentSize", {
        get: function () {
            return new MIOFoundation_1.MIOSize(320, 329);
        },
        enumerable: true,
        configurable: true
    });
    UIDatePickerController.prototype.viewDidLoad = function () {
        this.view.setBackgroundRGBColor(255, 255, 255);
        this.calendarView = new MUICalendarView_1.UICalendarView();
        this.calendarView.init();
        this.calendarView.dataSource = this;
        this.calendarView.delegate = this;
        this.view.addSubview(this.calendarView);
        this.calendarView.reloadData();
    };
    UIDatePickerController.prototype.viewTitleForHeaderAtMonthForCalendar = function (calendar, currentMonth) {
        var title = MIOFoundation_1.MIODateGetStringForMonth(currentMonth);
        var header = new UILabel_1.UILabel();
        header.init();
        header.setText(title);
        header.setTextAlignment("center");
        header.setHeight(30);
        header.setTextRGBColor(101, 100, 106);
        header.setBackgroundRGBColor(255, 255, 255);
        header.setFontSize(20);
        header.setFontStyle("bold");
        header.setFontFamily("SourceSansPro-Semibold, Source Sans Pro, sans-serif");
        return header;
    };
    // dayCellAtDate(calendar, date){
    //     var cell = calendar.dequeueReusableDayCellWithIdentifier(null);
    //     return cell;
    // }
    // Calendar Delegate methods
    UIDatePickerController.prototype.didSelectDayCellAtDate = function (calendarView, date) {
        if (this.delegate != null && typeof this.delegate.didSelectDate === "function")
            this.delegate.didSelectDate(this, date);
        this.dismissViewController(true);
    };
    return UIDatePickerController;
}(UIViewController_1.UIViewController));
exports.UIDatePickerController = UIDatePickerController;
//# sourceMappingURL=UIDatePickerController.js.map