import { NSObject } from "foundation";
import { NSEntityDescription } from "./NSEntityDescription";



export class NSPropertyDescription extends NSObject {
    
    entity:NSEntityDescription|null = null;
    name:string|null = null;   
    optional = true;    
}