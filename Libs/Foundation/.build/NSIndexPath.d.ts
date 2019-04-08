import { NSObject } from "./NSObject";
export declare function NSIndexPathEqual(indexPath1: NSIndexPath, indexPath2: NSIndexPath): boolean;
export declare class NSIndexPath extends NSObject {
    static indexForRowInSection(row: number, section: number): NSIndexPath;
    static indexForColumnInRowAndSection(column: number, row: number, section: number): NSIndexPath;
    private indexes;
    add(value: number): void;
    readonly section: any;
    readonly row: any;
    readonly item: any;
    readonly column: any;
    isEqualToIndexPath(indexPath: NSIndexPath): boolean;
}
