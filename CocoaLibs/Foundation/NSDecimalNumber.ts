import { NSNumber } from "./NSNumber";
import { MIOCoreDecimalNumber } from "./platform/web/MIOCoreDecimalNumber";

export class NSDecimalNumber extends NSNumber
{
    static decimalNumberWithString(str:string):NSDecimalNumber{
        let dn = new NSDecimalNumber();
        dn.initWithString(str);
        return dn;
    }

    static one ():NSDecimalNumber {
        return NSDecimalNumber.numberWithInteger(1);
    }

    static zero():NSDecimalNumber {
        return NSDecimalNumber.numberWithInteger(0);
    }

    // static subclasses from NSnumber
    static numberWithBool(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;                
    }

    static numberWithInteger(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;        
    }

    static numberWithFloat(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    }
    
    initWithString(str:string){
        this._initWithValue(str);
    }
    
    initWithDecimal(value){
        super.init();
        if (isNaN(value) || value == null) {
            this.storeValue = new MIOCoreDecimalNumber(0);
        }
        else {
            this.storeValue = value;
        }
    }

    _initWithValue(value){
        super.init();
        this.storeValue = new MIOCoreDecimalNumber(value||0);
    }

    decimalNumberByAdding(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.add(value.storeValue));
        return dv;
    }

    decimalNumberBySubtracting(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.sub(value.storeValue));
        return dv;        
    }

    decimalNumberByMultiplyingBy(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.mul(value.storeValue));
        return dv;        
    }

    decimalNumberByDividingBy(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.div(value.storeValue));
        return dv;        
    }

    get decimalValue(){
        return this.storeValue.toNumber();
    }

    get floatValue(){
        return this.storeValue.toNumber();
    }
}