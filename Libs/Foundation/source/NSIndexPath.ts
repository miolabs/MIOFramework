// import { NSObject } from "./NSObject";
/// <reference path="NSObject.ts" />

function IndexPathEqual(indexPath1:IndexPath, indexPath2:IndexPath):boolean {

    //TODO: CHECK REAL INDEX PATH
    if (indexPath1 == null || indexPath2 == null) return false;

    if (indexPath1.section == indexPath2.section
        && indexPath1.row == indexPath2.row){
            return true;
    }

    return false;
}

class IndexPath extends NSObject
{
    //FIXME: Remove the data type in the maethod name
    static indexForRowIntInSectionInt(row:number, section:number){
        IndexPath.indexForRowInSection(row, section);
    }

    static indexForRowInSection(row:number, section:number){
        let ip = new IndexPath();
        ip.add(section);
        ip.add(row);
        return ip;
    }

    static indexForColumnInRowAndSection(column:number, row:number, section:number){
        let ip = IndexPath.indexForRowInSection(row, section);
        ip.add(column);
        return ip;
    }
    
    initRowIntSectionInt(row:number, section:number){
        this.add(section);
        this.add(row);
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

    get item(){
        return this.indexes[1];
    }

    get column(){
        return this.indexes[2];
    }

    isEqualToIndexPath(indexPath:IndexPath){
        return IndexPathEqual(this, indexPath);
    }
}