/**
 * Created by godshadow on 11/3/16.
 */

class NSNotification
{
    name = null;
    object = null;
    userInfo = null;

    constructor(name, object, userInfo)
    {
        this.name = name;
        this.object = object;
        this.userInfo = userInfo;
    }
}

class NotificationCenter
{
    private static _sharedInstance:NotificationCenter = new NotificationCenter();
    notificationNames = {};

    constructor()
    {
        if (NotificationCenter._sharedInstance)
        {
            throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
        }
        NotificationCenter._sharedInstance = this;
    }

    public static defaultCenter():NotificationCenter
    {
        return NotificationCenter._sharedInstance;
    }

    addObserver(obs, name, fn)
    {
        var notes = this.notificationNames[name];
        if (notes == null)
        {
            notes = [];
        }

        var item = {"observer" : obs, "function" : fn};
        notes.push(item);
        this.notificationNames[name] = notes;
    };

    removeObserver(obs, name)
    {
        var notes = this.notificationNames[name];

        if (notes == null)
            return;

        var index = -1;
        for (var count = 0; count < notes.length; count++)
        {
            var item = notes[count];
            var obsAux = item["observer"];

            if (obsAux === obs) {
                index = count;
                break;
            }
        }

        if (index > -1) {
            notes.splice(index, 1);
        }

    }

    postNotification(name, object, userInfo?)
    {
        var notes = this.notificationNames[name];

        if (notes == null)
            return;

        var n = new NSNotification(name, object, userInfo);

        for (var count = 0; count < notes.length; count++)
        {
            var item = notes[count];
            var obs = item["observer"];
            var fn = item["function"];

            fn.call(obs, n);
        }
    }
}

