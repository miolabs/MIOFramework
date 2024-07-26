import { MWSRequest } from "./MWSRequest";
import { NSLog } from "Foundation";

export class MWSJSONRequest extends MWSRequest 
{    
    protected willStart() {        
        this.setHeaderValue("application/json", "Content-Type");
        
        if (this.body != null) {
            this.bodyData = JSON.stringify(this.body);
        }
    }
    
    protected didFinish(){
        if (this.resultData != null && this.resultData != "") {
            try {
                this.resultData = JSON.parse(this.resultData.replace(/(\r\n|\n|\r)/gm, ""));    
            } catch (error) {
                NSLog("JSON PARSER ERROR: BODY -> " + this.bodyData);
                NSLog("JSON PARSER ERROR: RESULT -> " + this.resultData);
            }
            
        }
    }
}