/**
 * Created by godshadow on 30/3/16.
 */

import { Calendar } from "./Calendar";
import { NSObject } from "./NSObject";


let _NS_currentLocale:Locale;

export class Locale extends NSObject
{
    language = "es";
    region = "ES";

    public static currentLocale(){
        if (_NS_currentLocale == null) {
            _NS_currentLocale = new Locale();
            _NS_currentLocale.initIdentifierString("es_ES");
        }
        //return NSWebApplication.sharedInstance().currentLanguage;

        return _NS_currentLocale;
    }

    public static _setCurrentLocale(localeIdentifier:string){
        _NS_currentLocale = new Locale();
        _NS_currentLocale.initIdentifierString(localeIdentifier);
    }

    initIdentifierString(identifer:string) {

        let array = identifer.split("_");
        if (array.length == 1) {
            this.language = array[0];
        }
        else if (array.length == 2) {
            this.language = array[0];
            this.region = array[1];
        }
    }

    get decimalSeparator():string{

        let ds = "";
        
        switch (this.region) {

            case "ES":
                ds =  ",";
                break;

            case "US":
                ds =  ".";
                break;

            case "UK":
                ds =  ".";
                break;     
                
            case "AE":
                ds = ".";
                break;
        }

        return ds;
    }

    get currencySymbol():string {

        let cs = "";

        switch(this.region) {

            case "ES":
            case "DE":
            case "FR":
            case "IT":
            case "NL":
                cs = "€";
                break;

            case "US":
                cs = "$";
                break;

            case "UK":
                cs = "£";
                break;
        }

        return cs;
    }

    get currencyCode(){
        let cc = "";

        switch(this.region){
            case "ES":                
            case "DE":
            case "FR":
            case "IT":
            case "NL":
                cc = "EUR";
                break;

            case "US":
                cc = "USD";
                break;

            case "UK":
                cc = "GBP";
                break;

            case "AE":
                cc = "AED";
        }

        return cc;
    }

    get groupingSeparator():string {

        let gs = "";

        switch(this.region){

            case "ES":
                gs = ".";
                break;

            case "US":
                gs = ",";
                break;

            case "UK":
                gs = ",";
                break;

            case "AE":
                gs = ",";
                break;
        }

        return gs;
    }

    firstWeekday():number {
        return this.calendar.firstWeekday();
    }

    private _calendar:Calendar = null; 
    get calendar() : Calendar {
        if (this._calendar != null) return this._calendar;

        this._calendar = new Calendar();
        this._calendar.init();

        return this._calendar;
    }

}
