import { NSObject } from "./NSObject";

export function NSIndexPathEqual(indexPath1:NSIndexPath, indexPath2:NSIndexPath):boolean {

    //TODO: CHECK REAL INDEX PATH
    if (indexPath1 == null || indexPath2 == null) return false;

    if (indexPath1.section == indexPath2.section
        && indexPath1.row == indexPath2.row){
            return true;
    }

    return false;
}

export class NSIndexPath extends NSObject
{
    static indexForRowInSection(row:number, section:number){
        let ip = new NSIndexPath();
        ip.add(section);
        ip.add(row);
        return ip;
    }

    static indexForColumnInRowAndSection(column:number, row:number, section:number){
        let ip = NSIndexPath.indexForRowInSection(row, section);
        ip.add(column);
        return ip;
    }

    private indexes = [];

    add(value:number){
        this.indexes.push(value);
    }

    get section(){
        return this.indexes[0];
    }

    get row(){
        return this.indexes[1];
    }

    get column(){
        return this.indexes[2];
    }
}