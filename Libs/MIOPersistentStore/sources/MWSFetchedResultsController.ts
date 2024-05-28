
import {NSFetchedResultsController} from "coredata"
import { MWSPersistentStore } from "./MWSPersistentStore";

export class MWSFetchedResultsController extends NSFetchedResultsController
{
    webPersistentStore:MWSPersistentStore = null;

    private itemOffset = 0;

    performNextFetch(){        
        this.itemOffset += this.fetchRequest.fetchLimit;
        this.fetchRequest.fetchOffset = this.itemOffset;
        
        let request = this.fetchRequest;        
        this.webPersistentStore.fetchObjects(request, this.managedObjectContext, this, function(objects){            
        });         
    }

}