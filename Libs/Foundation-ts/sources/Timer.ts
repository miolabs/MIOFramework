/**
 * Created by godshadow on 21/3/16.
 */

import { NSObject } from "./NSObject";

export class Timer extends NSObject
{    
    private _timerInterval = 0;
    private _repeat = false;
    private _target = null;
    private _completion = null;

    private _coreTimer = null;
    
    //TODO: Remove this hack (method name) for swift js
    static scheduledTimerWithTimeIntervalRepeatsBlock(timeInterval, repeat, completion){
        let timer = new Timer();
        timer.initWithTimeInterval(timeInterval, repeat, completion);
        timer.fire();

        return timer;
    }

    static scheduledTimerWithTimeInterval(timeInterval:number, repeat:boolean, completion:any){
    }

    initWithTimeInterval(timeInterval, repeat, completion){
        this._timerInterval = timeInterval;
        this._repeat = repeat;
        //this._target = target;
        this._completion = completion;
    }

    fire(){
        let instance = this;
        
        if (this._repeat){
            this._coreTimer = setInterval(function(){
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
        else {
            this._coreTimer = setTimeout(function(){
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
    }

    invalidate()
    {
        if (this._repeat)
            clearInterval(this._coreTimer);
        else 
            clearTimeout(this._coreTimer);
    }

    private _timerCallback(){
        if (this._completion != null)
            this._completion(this);

        if (this._repeat == true)
            this.invalidate();
    }
}