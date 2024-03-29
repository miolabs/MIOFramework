import { UIViewController } from "./UIViewController";
import { CGSize } from "./CoreGraphics/CGSize";
import { UILabel } from "./UILabel";
import { UIColor } from "./UIColor";

export class UIDatePickerController extends UIViewController
{
    delegate = null;
    tag = 0;
    
    private calendarView = null;    
    
    public get preferredContentSize() : CGSize {
        return new CGSize( 320, 329 );
    }

    viewDidLoad(){        
        this.view.backgroundColor = UIColor.white;

        // this.calendarView = new UICalendarView();
        // this.calendarView.init();
        // this.calendarView.dataSource = this;        
        // this.calendarView.delegate = this;        
        // this.view.addSubview(this.calendarView);

        this.calendarView.reloadData();
    }

    viewTitleForHeaderAtMonthForCalendar(calendar, currentMonth){
        // let title = MIODateGetStringForMonth(currentMonth);
        let header = new UILabel();
        header.init();
        // header.setText(title);
        header.setTextAlignment("center");
        header.setHeight(30);
        header.setTextRGBColor(101, 100, 106);
        header.backgroundColor = UIColor.white;
        header.setFontSize(20);
        header.setFontStyle("bold");
        header.setFontFamily("SourceSansPro-Semibold, Source Sans Pro, sans-serif");

        return header;
    }

    // dayCellAtDate(calendar, date){
    //     var cell = calendar.dequeueReusableDayCellWithIdentifier(null);

    //     return cell;
    // }

    // Calendar Delegate methods
    didSelectDayCellAtDate(calendarView, date) {
        
        if (this.delegate != null && typeof this.delegate.didSelectDate === "function")
            this.delegate.didSelectDate(this, date);

        this.dismissViewController(true);
    }
}