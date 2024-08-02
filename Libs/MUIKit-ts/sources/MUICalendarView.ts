import { CalendarUnit, Locale, NSCoder, NSLocalizeString } from "foundation";
import { UIControl } from "uikit";
import { UIView } from "uikit";
import { UIButton } from "uikit";
import { MUIComboBox } from "./MUIComboBox";
import { CALayerEvent } from "uikit";
import { MCDateGetDateString, MCDateGetMonthFromDate, MCDateGetStringForMonth, MCDateGetYearFromDate, MCDateToday } from "mio-core";
import { CATableBodyLayer, CATableCellLayer, CATableHeadLayer, CATableHeaderLayer, CATableLayer, CATableRowLayer } from "./CustomLayers/CATableLayer";


export interface MUIDatePickerDelegate
{
    canSelectDate( date: Date ) : void;
}

export class MUIDatePicker extends UIControl implements MUIDatePickerHeaderDelegate, MUICalendarDaysViewDelegate
{
    delegate:MUIDatePickerDelegate = null;

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );
        this._setup();
    }    

    private header:MUIDatePickerHeader = null;
    private daysView:MUICalendarDaysView = null;

    private _setup(){
        this.layer.addStyle( "calendar-view" );
        if (this.header == null) {
            this.header = new MUIDatePickerHeader();
            this.header.initWithDelegate(this);              
            this.addSubview(this.header);
        }        

        if (this.daysView == null) {
            this.daysView = new MUICalendarDaysView();
            this.daysView.initWithDelegate(this);   
            this.addSubview(this.daysView);         
        }        

        let today = MCDateToday();
        this.selectedMonth = MCDateGetMonthFromDate(today);
        this.selectedYear = MCDateGetYearFromDate(today);
    }

    private selectedMonth = null;
    private selectedYear = null;    

    private _date:Date = null;
    set date( date:Date ) { this.setDate( date, true ); } 
    get date(): Date { return this._date; }

    setDate( date:Date, animated:boolean ) {
        this._date = date;
        this.selectedMonth = MCDateGetMonthFromDate( date );
        this.selectedYear = MCDateGetYearFromDate( date );
        this.header.setMonth( this.selectedMonth );
        this.header.setYear( this.selectedYear );
        this.daysView.setMonthAndYear( this.selectedMonth, this.selectedYear );
    }

    // Calendar header delegate
    monthAndYearDidChange(month:number, year:number){
        this.selectedMonth = month;
        this.selectedYear = year;
        this.daysView.setMonthAndYear(month, year);
    }
    
    didSelectDate( date:Date ) {
        this._date = date;
        this.sendActions( UIControl.Event.valueChanged );
    }

    selectDate( date:Date ){
        this.selectedMonth = MCDateGetMonthFromDate( date );
        this.selectedYear = MCDateGetYearFromDate( date );
        this.daysView.selectDate( date );
    }

    resetSelection(){
        this.selectedMonth = null;
        this.selectedYear = null;
        this.daysView.resetSelection();
    }

    reloadData() {
        this.daysView.setupDaysLayer();
    }
    
}

interface MUIDatePickerHeaderDelegate 
{
    monthAndYearDidChange( month:number, year:number ) : void;
}

class MUIDatePickerHeader extends UIView
{    
    delegate:MUIDatePickerHeaderDelegate  = null;

    private navBar: UIView;
    private prevButton:UIButton = null;
    private nextButton:UIButton = null;
    private monthComboBox:MUIComboBox = null;
    private yearComboBox:MUIComboBox = null;    

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );
        this._setup();
    }

    initWithDelegate( delegate: MUIDatePickerHeaderDelegate ){
        super.init();      
        this.delegate = delegate;
        this._setup();
    }
    
    private _setup(){        
        this.layer.addStyle( "calendar-header" );

        this.navBar = new UIView();
        this.navBar.init();
        this.navBar.layer.addStyle( "view" );
        this.navBar.layer.addStyle( "calendar-nav" ); 
        this.addSubview(this.navBar);

        if (this.prevButton == null){
            this.prevButton = new UIButton();
            this.prevButton.init();
            this.prevButton.layer.addStyle( "back" );   
            this.prevButton.layer.addStyle( "calendar-prev-btn" ); 
            this.navBar.addSubview(this.prevButton); 
        }
        this.prevButton.addTarget(this, ( control:MUIDatePicker ) => {
            this.addDateOffset(-1);
        }, UIControl.Event.touchUpInside );

        if (this.monthComboBox == null) {
            this.monthComboBox = new MUIComboBox();
            this.monthComboBox.init();
            this.monthComboBox.layer.addStyle( "input-combobox" );
            this.navBar.addSubview(this.monthComboBox); 
        }

        // Add months
        this.monthComboBox.removeAllItems();
        for (let index = 0; index < 12; index++) {
            let name = MCDateGetStringForMonth( index );
            this.monthComboBox.addItem( NSLocalizeString( name, name ) , index );
        }

        this.monthComboBox.addTarget( this, this.date_did_change, UIControl.Event.valueChanged );

        if (this.yearComboBox == null) {
            this.yearComboBox = new MUIComboBox();
            this.yearComboBox.init();            
            this.yearComboBox.layer.addStyle( "input-combobox" );
            this.navBar.addSubview(this.yearComboBox); 
        }

        // Add years
        this.yearComboBox.removeAllItems();        
        // Get 10 years, 5 years before, 5 year after the selected year
        let year = MCDateGetYearFromDate ( MCDateToday() );
        let minYear = year - 5;
        let maxYear = year + 5;
        for (let index = minYear; index < maxYear; index++) {
            this.yearComboBox.addItem( String( index ) );
        }

        this.yearComboBox.addTarget( this, this.date_did_change, UIControl.Event.valueChanged );

        if (this.nextButton == null){
            this.nextButton = new UIButton();
            this.nextButton.init();
            this.nextButton.layer.addStyle( "next" );
            this.nextButton.layer.addStyle( "calendar-next-btn" );
            this.navBar.addSubview(this.nextButton); 
        }
        
        this.nextButton.addTarget(this, () => {
            this.addDateOffset( 1 );
        }, UIControl.Event.touchUpInside );

    }

    private date_did_change() {
        let m = parseInt( this.monthComboBox.selectedItem );
        let y = parseInt( this.yearComboBox.selectedItem );
        this.delegate.monthAndYearDidChange(m, y);
    }

    setMonth(month:number){
        this.monthComboBox.selectItem(month);       
    }

    setYear(year:number){
        this.yearComboBox.selectItem(year);
    }

    private addDateOffset( offset:number ){
        let m =  this.monthComboBox.selectedItem;
        let y = this.yearComboBox.selectedItem;

        m += offset;
        if (m < 0) {
            m = 11;
            y--;
        }
        else if (m > 11) {
            m = 0;
            y++;
        }
        this.monthComboBox.selectItem(m);
        this.yearComboBox.selectItem(y);
        this.delegate.monthAndYearDidChange(m, y);
    }

}

interface MUICalendarDaysViewDelegate
{
    delegate:MUIDatePickerDelegate;
    didSelectDate( date: Date ) : void;
}

class MUICalendarDaysView extends UIView 
{    
    private _month = null;
    get month() {
        return this._month;
    }

    private _year = null;
    get year() {
        return this._year;
    }

    firstDate = null;
    lastDate = null;

    cellSpacingX = 0;
    cellSpacingY = 0;

    private delegate:MUICalendarDaysViewDelegate = null;         

    initWithDelegate( delegate:MUICalendarDaysViewDelegate ) {
        super.init();
        this.delegate = delegate;
        this.layer.addStyle( "ui-calendar-body" );
        this.setupHeaderLayer();
    }

    setMonthAndYear(month:number, year:number) {
        if (month < 0) {
            this._month = 11;
            this._year = year - 1;
        }
        else if (month > 11) {
            this._month = 0;
            this._year = year + 1;
        }
        else {
            this._month = month;
            this._year = year;
        }

        this.setupDaysLayer();
    }

    private tableLayer:CATableLayer = null;
    private setupHeaderLayer(){
        if (this.tableLayer == null) {
            this.tableLayer = new CATableLayer();
            this.tableLayer.addStyle( "calendar-days-view" );
            this.layer.addSublayer( this.tableLayer );
        }
 
        // Setup Header (Days of the week)
        const dayTitle = ["SU", "MO", "TU", "WE", "TH", "FR", "SA", "SU", "MO", "TU", "WE", "TH", "FR", "SA"];
        const firstDay = Locale.currentLocale().firstWeekday();        
        
        const header = new CATableHeadLayer();
        this.tableLayer.addSublayer( header );        

        let row = new CATableRowLayer();
        header.addSublayer( row );

        for (let index = 0; index < 7; index++){
            let dayLayer = new CATableHeaderLayer();
            const dayTitleIndex = index + firstDay ;            
            dayLayer.value = NSLocalizeString(dayTitle[dayTitleIndex], dayTitle[dayTitleIndex]);
            row.addSublayer( dayLayer );
        }
    }

    private cellsByDate = {};
    private bodyLayer:CATableBodyLayer = null;    
    
    setupDaysLayer(){ 
        this.firstDate = new Date(this._year, this._month, 1); 
        this.lastDate = new Date(this._year, this._month + 1, 0);
        let currentDate = new Date(this._year, this._month, 1);

        const calendar = Locale.currentLocale().calendar;
        let startIndex = calendar.componentFromDate( CalendarUnit.weekday, currentDate );

        this.cellsByDate = {};
        if ( this.bodyLayer != null) this.bodyLayer.removeFromSuperlayer();
        this.bodyLayer = new CATableBodyLayer();
        this.tableLayer.addSublayer( this.bodyLayer );

        let row = new CATableRowLayer();
        this.bodyLayer.addSublayer( row );

        for (let colIndex = 0; colIndex < startIndex; colIndex++) {
            let cell = new CATableCellLayer();
            cell.addStyle( "empty-cell" );
            row.addSublayer( cell );
        }
        
        let lastColIndex = 0;
        let lastRow = null;
        for (let rowIndex = 0; currentDate <= this.lastDate && rowIndex < 6; rowIndex++) {
            
            if (row == null) {
                row = new CATableRowLayer();
                this.bodyLayer.addSublayer( row );
            }            
            
            for (let colIndex = startIndex; colIndex < 7; colIndex++){

                // Add day cell
                let cellLayer = new CADatePickerCellLayer();                
                row.addSublayer( cellLayer );
                
                cellLayer.addStyle( "day-cell" );
                cellLayer.addStyle( "day-" + currentDate.getDay() );
                
                cellLayer.date = currentDate ; 
                this.cellsByDate[ MCDateGetDateString( currentDate ) ] = cellLayer;
        
                if (this.selectedDate == currentDate ) cellLayer.selected = true;

                let canSelect = true;
                if (this.delegate != null && this.delegate.delegate != null && typeof this.delegate.delegate.canSelectDate === "function"){            
                    canSelect = this.delegate.delegate.canSelectDate.call(this.delegate.delegate, this, currentDate);
                }
        
                if ( canSelect ) {
                    cellLayer.setEnableBlock( canSelect, this, this.didSelectedCell );
                    cellLayer.addStyle( "disabled" );
                }

                currentDate.setDate( currentDate.getDate() + 1 );
                lastColIndex = colIndex;

                if (currentDate > this.lastDate) break;
            }

            startIndex = 0;
            lastRow = row;
            row = null;
        }
        

        // Fill last column with empty cells
        for (let colIndex = lastColIndex+1; colIndex < 7; colIndex++){
            let cell = new CATableCellLayer();
            cell.addStyle( "empty-cell" );
            lastRow.addSublayer( cell );            
        }
    }
    
    private lastSelectedCell: CADatePickerCellLayer =  null;
    private didSelectedCell ( cell: CADatePickerCellLayer ) {
        if ( this.lastSelectedCell == cell ) return;        
        if ( this.lastSelectedCell != null ) this.lastSelectedCell.selected = false;

        this.selectedDate = cell.date;
        this.lastSelectedCell = cell;
        this.delegate.didSelectDate( cell.date );
    }

    private selectedDate:Date = null;

    selectDate( date: Date ) {
        let d = MCDateGetDateString( date );
        this.selectedDate = date;

        let cell = this.cellsByDate[ d ];
        if ( cell == this.lastSelectedCell ) return;
        
        if (this.lastSelectedCell != null ) this.lastSelectedCell.selected = false;
        if ( cell != null ) { 
            this.lastSelectedCell = cell;
            cell.selected = true;
        }        
    }

    resetSelection(){
        if (this.lastSelectedCell != null ) this.lastSelectedCell.selected = false;
    }

}

class CADatePickerCellLayer extends CATableCellLayer
{
    private _date: Date = null;
    get date(): Date {
        return this._date;
    }

    private _day = null;
    private _month = null;
    private _year = null;    

    private _isToday = false;
    get isToday() { return this._isToday; }

    set date( date: Date) {
        this._date = new Date(date.getTime());

        this._day = date.getDate();
        this._month = date.getMonth();
        this._year = date.getFullYear();

        let today = new Date();
        let d = today.getDate();
        let m = today.getMonth();
        let y = today.getFullYear();

        this.value = date.getDate().toString();        

        this._isToday = (this._day == d && this._month == m && this._year == y);
        if (this._isToday) this.addStyle( "today" );
    }

    private _on_click_target:any = null;
    private _on_click_action:any = null;

    setEnableBlock( value:boolean, target:any, action:any) {
        if (value == true ) {
            this._on_click_target = target;
            this._on_click_action = action;
            this.registerEventAction( this, this.on_click_event );
        }
        else {
            this._on_click_target = null;
            this._on_click_action = null;
            this.addStyle( "disabled" );
        }
        
    }

    private on_click_event( event:CALayerEvent ) {
        if (event != CALayerEvent.mouseUp ) return;
        
        this.selected = true;
        if ( this._on_click_action != null ) this._on_click_action.call( this._on_click_target, this );
    } 
    
    set selected( value: boolean ){
        if (value == true) this.addStyle( "selected" );
        else this.removeStyle( "selected" );
    }

}
