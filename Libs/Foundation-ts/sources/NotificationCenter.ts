/**
 * Created by godshadow on 11/3/16.
 */

export class Notification
{
    name:string;
    object:any;
    userInfo:any;

    constructor(name:string, object:any, userInfo:any){
        this.name = name;
        this.object = object;
        this.userInfo = userInfo;
    }
}

export class NotificationCenter
{
    private static _sharedInstance:NotificationCenter = new NotificationCenter();
    notificationNames = {};

    constructor(){
        if (NotificationCenter._sharedInstance){
            throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
        }
        NotificationCenter._sharedInstance = this;
    }

    public static defaultCenter():NotificationCenter{
        return NotificationCenter._sharedInstance;
    }

    addObserver(obs:any, name:string, fn:any)
    {
        let notes = this.notificationNames[name];
        if (notes == null)
        {
            notes = [];
        }

        let item = {"observer" : obs, "function" : fn};
        notes.push(item);
        this.notificationNames[name] = notes;
    };

    removeObserver(obs:any, name:string)
    {
        let notes = this.notificationNames[name];

        if (notes == null)
            return;

        let index = -1;
        for (let count = 0; count < notes.length; count++)
        {
            let item = notes[count];
            let obsAux = item["observer"];

            if (obsAux === obs) {
                index = count;
                break;
            }
        }

        if (index > -1) {
            notes.splice(index, 1);
        }

    }
    
    postNotification(name:string, object:any, userInfo?:any)
    {
        let notes = this.notificationNames[name];

        if (notes == null)
            return;

        let n = new Notification(name, object, userInfo);

        for (let count = 0; count < notes.length; count++)
        {
            let item = notes[count];
            let obs = item["observer"];
            let fn = item["function"];

            fn.call(obs, n);
        }
    }
}

