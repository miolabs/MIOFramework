import { Formatter } from "./Formatter";
import { Locale } from "./Locale";
import { NSNumber } from "./NSNumber";

enum _NSNumberFormatterType 
{    
    Int,
    Decimal
}

export class NumberFormatter extends Formatter 
{
    numberStyle = NumberFormatter.Style.none;
    locale:Locale = null;
    minimumFractionDigits = 0;
    maximumFractionDigits = 0;
    groupingSeparator = null;
    currencySymbol = null;
    currencyCode = null;
    private currencyHasSpaces = true;
    private currencyIsRight = true;

    static Style = class {
        static get none() {return Object.assign(new NumberFormatter.Style(), {rawValue: 0})}
        static get decimal() {return Object.assign(new NumberFormatter.Style(), {rawValue: 1})}
        static get currency() {return Object.assign(new NumberFormatter.Style(), {rawValue: 2})}
        static get currencyISOCode() {return Object.assign(new NumberFormatter.Style(), {rawValue: 3})}
        static get percent() {return Object.assign(new NumberFormatter.Style(), {rawValue: 4})}
    }

    init(){
        super.init();
        this.locale = Locale.currentLocale();

        this.groupingSeparator = this.locale.groupingSeparator;
        this.currencySymbol = this.locale.currencySymbol;
        this.currencyCode = this.locale.currencyCode;

        switch(this.locale.region){
            case "US":
            this.currencyHasSpaces = false;
            this.currencyIsRight = false;
            break;
        }
    }

    numberFromString(str:string){

        if(str === null) return null;
        
        let result, parseString, numberString, type;
        [result, parseString, numberString, type] = this._parse(str);
        
        if (result == true) {
            let value = null;    
            if (type == _NSNumberFormatterType.Int){
                value =  parseInt(numberString);
            }
            else if (type == _NSNumberFormatterType.Decimal){
                value = parseFloat(numberString);
            }
            
            return isNaN(value) ? null : value;
        }

        return null;
    }

    stringFrom(number:NSNumber):string {
        // return _injectIntoOptional(this.stringForObjectValue(number));//TODO automatically refactor function results
        return this.stringForObjectValue(number);//TODO automatically refactor function results
    }

    stringForObjectValue(value):string {
        
        let number = value as NSNumber;
        if(number == null) number = NSNumber.numberWithFloat(0);
        let str = number.floatValue.toString();
        let intValue = null;
        let floatValue = null;
        let array = str.split(".");
        if (array.length == 1) {
            // Only int
            intValue = array[0];
        }
        else if (array.length == 2) {
            intValue = array[0];
            floatValue = array[1];
        }
        
        // Check the round rules
        if (floatValue != null) {
            [intValue, floatValue] = this.round(intValue, floatValue);
        }

        let res = "";
        let minusOffset = intValue.charAt(0) == "-" ? 1 : 0;
    
        if (intValue.length > (3 + minusOffset)) {

            let offset = Math.floor((intValue.length - minusOffset) / 3);
            if (((intValue.length - minusOffset) % 3) == 0)
                offset--;
            let posArray = [];
            let intLen = intValue.length;
            for (let index = offset; index > 0; index--){
                posArray.push(intLen - (index * 3));
            }

            let posArrayIndex = 0;
            let groupPos = posArray[0];
            for (let index = 0; index < intLen; index++)
            {
                if (index == groupPos) {
                    res += this.groupingSeparator;
                    posArrayIndex++;                    
                    groupPos = posArrayIndex < posArray.length ? posArray[posArrayIndex] : -1;
                }
                let ch = intValue[index];
                res += ch;
            }                        
        }
        else {
            res = intValue;
        }

        if (this.minimumFractionDigits > 0 && floatValue == null)
            floatValue = "";

        if (floatValue != null){            
            res += this.locale.decimalSeparator;            
            if (this.minimumFractionDigits > 0 && floatValue.length < this.minimumFractionDigits){
                for (let index = 0; index < this.minimumFractionDigits; index++){
                    if (index < floatValue.length)
                        res += floatValue[index];
                    else 
                        res += "0";
                }    
            }
            else {
                res += floatValue;
            }
        }
                
        if (this.numberStyle.rawValue == NumberFormatter.Style.percent.rawValue) res += "%";
        res = this.stringByAppendingCurrencyString(res);

        return res;
    }

    private round(intValue:string, floatValue:string):[string, string]{                
        if (floatValue.length <= this.maximumFractionDigits) return[intValue, floatValue];

        // Check float first        
        let roundedFloat = "";
        let d = parseInt(floatValue.substr(this.maximumFractionDigits, 1));
        let inc =  d < 5 ? 0 : 1;
        
        for (let index = this.maximumFractionDigits - 1; index >= 0; index--){
            if (inc == 0) {
                roundedFloat = floatValue.substring(0, index + 1) + roundedFloat;
                break;
            }
            let digit = parseInt(floatValue.substr(index, 1));            
            if (digit == 9) {
                inc = 1;
                roundedFloat = "0" + roundedFloat;                
            }
            else {
                inc = 0;
                let newDigit = digit + 1;
                roundedFloat = newDigit + roundedFloat;                
            }
        }

        // Removes Zeros
        let removeIndex = null;
        for (let index = roundedFloat.length - 1; index >= this.minimumFractionDigits; index--){
            let digit = roundedFloat.substr(index, 1);
            if (digit != "0") break;
            removeIndex = index;
        }
        if (removeIndex != null) roundedFloat = roundedFloat.substring(0, removeIndex);

        if (inc == 0) return [intValue, roundedFloat];
        
        let roundedInt = "";
        for (let index = intValue.length - 1; index >= 0; index--){
            let digit = parseInt(intValue.substr(index, 1));
            let newDigit = digit + inc;
            if (newDigit == 10) {
                inc = 1;                
                roundedInt = "0" + roundedInt;                
            }
            else {
                inc = 0;                
                roundedInt = intValue.substring(0, index) + newDigit.toString() + roundedInt;
                break;
            }
        }

        return [roundedInt, roundedFloat];        
    }

    private stringByAppendingCurrencyString(text:string):string {
        let currency = "";        
        if (this.numberStyle.rawValue == NumberFormatter.Style.currency.rawValue) {
            currency = this.currencySymbol;
            if (currency.length == 0) currency = this.currencyCode; // If there's no symbol, add the code instead.
        }
        else if (this.numberStyle.rawValue == NumberFormatter.Style.currencyISOCode.rawValue) currency = this.currencyCode;
        else {
            return text;
        }        

        if (currency.length == 0) return text;

        let result = "";        
        if (this.currencyIsRight == true) {
            result = text + (this.currencyHasSpaces ? " ":"") + currency;
        }
        else {
            result = currency + (this.currencyHasSpaces ? " ":"") + text;
        }

        return result;
    }

    isPartialStringValid(str:string):[boolean, string]{

        if (str.length == 0) return [true, str];

        let result, newStr;
        [result, newStr] = this._parse(str);

        return [result, newStr];
    }

    private _parse(str:string):[boolean, string, string, _NSNumberFormatterType]{

        let number = 0;
        let parseString = "";
        let numberString = "";
        let type = _NSNumberFormatterType.Int;
        let minusSymbol = false;
        let percentSymbol = false;

        for (let index = 0; index < str.length; index++) {
         
            let ch = str[index];
            if (ch == this.locale.decimalSeparator && type != _NSNumberFormatterType.Decimal){
                parseString += ch;
                numberString += ".";
                type = _NSNumberFormatterType.Decimal;
            }
            else if (ch == "-" && minusSymbol == false) {
                parseString += ch;
                numberString += ch;
                minusSymbol = true;                
            }
            else if (ch == "%"
                     && this.numberStyle.rawValue == NumberFormatter.Style.percent.rawValue
                     && percentSymbol == false){
                
                percentSymbol = true;
                parseString += ch;                
            }
            else if (ch == " "){
                continue;
            }
            else if (!isNaN(parseInt(ch))) {
                parseString += ch;
                numberString += ch;
            }
            else 
                return [(parseString.length > 0 ? true : false), parseString, numberString, type];
        }

        return [true, parseString, numberString, type];
    }
}