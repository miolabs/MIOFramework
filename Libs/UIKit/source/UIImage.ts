import { NSObject } from "mio-foundation-web";

export class UIImage extends NSObject
{    
    static $equal(imageA:UIImage, imageB:UIImage){
        return imageA === imageB;
    }

    initNamedString(name: string){
        this._imageURL = "assets/" + name + ".png";
    }

    _imageURL:string;
    get _url(){
        return this._imageURL;
    }
}