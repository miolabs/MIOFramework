import { Decimal } from 'decimal.js';

export class MIOCoreDecimalNumber
{
    decimal = null;
    constructor(value){
        this.decimal = new Decimal(value);
    }

    add(value:MIOCoreDecimalNumber){
        this.decimal.add(value.decimal);
    }

    sub(value:MIOCoreDecimalNumber){
        this.decimal.sub(value.decimal);
    }

    mul(value:MIOCoreDecimalNumber){
        this.decimal.mul(value.decimal);
    }

    div(value:MIOCoreDecimalNumber){
        this.decimal.div(value.decimal);
    }

    toNumber(){
        return this.decimal.toNumber();
    }
}