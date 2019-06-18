import { NSObject } from "mio-foundation-web";

export class UIImage extends NSObject
{    
    initNamedString(name: string){
        this._imageURL = "assets/" + name;
    }

    _imageURL:string;
    get _url(){
        return this._imageURL;
    }
}