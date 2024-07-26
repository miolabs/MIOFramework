import { Operation } from "Foundation";
import { MWSRequest } from "./MWSRequest";

export class MWSPersistenStoreOperation extends Operation {
        
    saveCount = 0;
    request:MWSRequest|null = null;
    dependencyIDs = null;

    responseCode = null;
    responseJSON = null;

    private delegate = null;    
    
    private uploading = false;
    private setUploading(value:boolean){
        this.willChangeValue("isExecuting");
        this.uploading = value;
        this.didChangeValue("isExecuting");
    }

    private uploaded = false;
    private setUploaded(value:boolean){
        this.willChangeValue("isFinished");
        this.uploaded = value;
        this.didChangeValue("isFinished");
    }

    initWithDelegate(delegate) {
        this.init();
        this.delegate = delegate;
    }

    start() {
        if (this.uploading == true) throw new Error("MWSPersistenStoreUploadOperation: Trying to start again on an executing operation");

        this.setUploading(true);

        this.request!.execute(this, function (this:MWSPersistenStoreOperation, code:number, data:any) {
            this.responseCode = code;
            this.responseJSON = data;            

            this.setUploading(false);
            this.setUploaded(true);            
        });        
    }

    executing(){
        return this.uploading;
    }

    finished(){
        return this.uploaded;
    }

}