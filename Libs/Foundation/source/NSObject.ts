/**
 * Created by godshadow on 26/3/16.
 */

//import { NSClassFromString } from "./core/MIOCore";

class NSObject
{
    private _className:string = null;
    getClassName():string {
        if (this._className != null) return this._className;

        this._className = this.constructor["name"];

        // let funcNameRegex = /function (.{1,})\(/;
        // let results = (funcNameRegex).exec((this).constructor.toString());        
        // this._className = (results && results.length > 1) ? results[1] : null;
        return this._className;
    }    
    
    get className():string{
        return this.getClassName();
    }

    keyPaths = {};

    init(){}

    private _notifyValueChange(key:string, type:string){
        
        let observers = this.keyPaths[key];
        if (observers == null) return;

        // copy the array so we can iterating safetly
        let obs = [];
        for(let count = 0; count < observers.length; count++) {
            let item = observers[count];
            obs.push(item);
        }        

        for(let count = 0; count < obs.length; count++) {
            let item = obs[count];
            let o = item["OBS"];            
            if (typeof o.observeValueForKeyPath === "function") {
                let keyPath = item["KP"] != null ? item["KP"]: key;
                let ctx = item["CTX"];            
                o.observeValueForKeyPath.call(o, keyPath, type, this, ctx);
            }
        }
    }

    willChangeValueForKey(key:string) {
        this.willChangeValue(key);
    }
    
    didChangeValueForKey(key:string) {
        this.didChangeValue(key);
    }

    //TODO: Remove below method
    willChangeValue(key:string) {
        this._notifyValueChange(key, "will");
    }

    didChangeValue(key:string){
        this._notifyValueChange(key, "did");
    }

    private _addObserver(obs:any, key:string, context:any, keyPath?:string) {

        let observers = this.keyPaths[key];
        if (observers == null)
        {
            observers = [];
            this.keyPaths[key] = observers;
        }

        let item = {"OBS" : obs};
        if (context != null) item["CTX"] = context;
        if (keyPath != null) item["KP"] = keyPath;
        observers.push(item);
    }

    private _keyFromKeypath(keypath:string) {

        let index = keypath.indexOf('.');
        if (index == -1) {
            return [keypath, null];
        }

        let key = keypath.substring(0, index);
        let offset = keypath.substring(index + 1);

        return [key, offset];
    }

    addObserver(obs:any, keypath:string, context?:any)
    {
        let [key, offset] = this._keyFromKeypath(keypath);
        
        if (offset == null) {
            this._addObserver(obs, key, context);
        }
        else {
            let obj = this;
            let exit = false;
            while (exit == false) {                
                if (offset == null) {
                    obj._addObserver(obs, key, context, keypath);
                    exit = true;
                }
                else  {
                    obj = this.valueForKey(key);
                    [key, offset] = this._keyFromKeypath(offset);
                }

                if (obj == null) throw new Error("ERROR: Registering observer to null object");
            }
        }
    }

    removeObserver(obs:any, keypath:string)
    {
        let observers = this.keyPaths[keypath];
        if (observers == null)
            return;

        let index = observers.indexOf(obs);
        observers.splice(index, 1);
    }

    setValueForKey(value:any, key:string) {
    
        this.willChangeValue(key);
        this[key] = value;
        this.didChangeValue(value);
    }

    valueForKey(key:string) {
        return this[key];
    }

    valueForKeyPath(keyPath:string) {

        let [key, offset] = this._keyFromKeypath(keyPath);
        
        let value = null;
        let obj = this;
        let exit = false;
        while (exit == false) {                
            if (offset == null) {
                value = obj.valueForKey(key);
                exit = true;
            }
            else  {
                obj = obj.valueForKey(key);
                [key, offset] = this._keyFromKeypath(offset);
                if (obj == null) exit = true;
            }            
        }

        return value;
    }
        

    copy() {
        let obj = NSClassFromString(this.className);
        obj.init();
        
        return obj;
    }

    performSelector(selector:string){
        return this[selector]();
    }

    performSelectorOnMainThread(selector:string, arg:any, waitUntilDone:boolean){
        this[selector](arg);
    }

}