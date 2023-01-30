/**
 * Created by godshadow on 29/09/2016.
 */

export class UserDefaults
{
    private static _sharedInstance:UserDefaults = new UserDefaults();

    constructor(){
        if (UserDefaults._sharedInstance){
            throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
        }
        UserDefaults._sharedInstance = this;
    }

    public static standardUserDefaults():UserDefaults{
        return UserDefaults._sharedInstance;
    }

    setBooleanForKey(key:string, value:boolean){
        let v = value ? "1" : "0";
        this.setValueForKey(key, v);
    }

    booleanForKey(key:string){
        let v = this.valueForKey(key);
        return v == "1" ? true : false;
    }

    setValueForKey(key:string, value:any){
        localStorage.setItem(key, value);
    }

    valueForKey(key:string):any{
        return localStorage.getItem(key);
    }

    removeValueForKey(key:string){
        localStorage.removeItem(key);
    }
}