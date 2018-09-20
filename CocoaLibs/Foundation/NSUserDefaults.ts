/**
 * Created by godshadow on 29/09/2016.
 */

export class NSUserDefaults
{
    private static _sharedInstance:NSUserDefaults = new NSUserDefaults();

    constructor()
    {
        if (NSUserDefaults._sharedInstance)
        {
            throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
        }
        NSUserDefaults._sharedInstance = this;
    }

    public static standardUserDefaults():NSUserDefaults
    {
        return NSUserDefaults._sharedInstance;
    }

    setBooleanForKey(key, value:boolean)
    {
        var v = value ? "1" : "0";
        this.setValueForKey(key, v);
    }

    booleanForKey(key)
    {
        var v = this.valueForKey(key);
        return v == "1" ? true : false;
    }

    setValueForKey(key, value)
    {
        localStorage.setItem(key, value);
    }

    valueForKey(key)
    {
        return localStorage.getItem(key);
    }

    removeValueForKey(key)
    {
        localStorage.removeItem(key);
    }
}