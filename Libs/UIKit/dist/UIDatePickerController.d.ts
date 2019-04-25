import { UIViewController } from "./UIViewController";
import { UILabel } from "./UILabel";
export declare class UIDatePickerController extends UIViewController {
    delegate: any;
    tag: number;
    private calendarView;
    readonly preferredContentSize: any;
    viewDidLoad(): void;
    viewTitleForHeaderAtMonthForCalendar(calendar: any, currentMonth: any): UILabel;
    didSelectDayCellAtDate(calendarView: any, date: any): void;
}
