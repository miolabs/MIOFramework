import { NSObject } from "./NSObject";

export class NSNumber extends NSObject
{    
    static numberWithBool(value:boolean):NSNumber {
        let n = new NSNumber();
        n.initWithBool(value);
        return n;                
    }

    static numberWithInteger(value:number):NSNumber {
        let n = new NSNumber();
        n.initValueInt(value);
        return n;        
    }

    static numberWithFloat(value:number):NSNumber {
        let n = new NSNumber();
        n.initWithFloat(value);
        return n;
    }

    protected storeValue:any;

    initWithBool(value:any){
        if (isNaN(value) || value == null) {
            this.storeValue = 1;
        }
        else {
            this.storeValue = value ? 0 : 1;
        }
    }

    initValueInt(value:number){
        if (isNaN(value) || value == null) {
            this.storeValue = 0;
        }
        else {
            this.storeValue = value;
        }
    }

    initWithFloat(value:number){
        if (isNaN(value) || value == null) {
            this.storeValue = 0.0;
        }
        else {
            this.storeValue = value;
        }
    }

    get floatValue(){
        return this.storeValue;
    }

}
