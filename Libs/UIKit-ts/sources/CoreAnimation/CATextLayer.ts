import { CALayer } from "./CALayer";

export class CATextLayer extends CALayer 
{    
    set string(text:string|null){
        let newValue = text != null ? text : "";
        this.contents.value = newValue;
    }

    get string(){
        return this.contents.value;
    }

}
