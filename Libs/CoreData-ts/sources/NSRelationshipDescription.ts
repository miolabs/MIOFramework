import { NSPropertyDescription } from "./NSPropertyDescription";
import { NSEntityDescription } from "./NSEntityDescription";

export enum NSDeleteRule {
    noActionDeleteRule,
    nullifyDeleteRule,
    cascadeDeleteRule,
    denyDeleteRule
}

export class NSRelationshipDescription extends NSPropertyDescription
{
    destinationEntityName:string|null = null;
    destinationEntity:NSEntityDescription|null = null;
    inverseRelationship:NSRelationshipDescription|null = null;
    isToMany = false;
    deleteRule = NSDeleteRule.noActionDeleteRule;

    private _serverName:string|null = null;

    inverseName:string|null = null;
    inverseEntityName:string|null = null;

    initWithName(name:string, destinationEntityName:string|null, isToMany:boolean, serverName:string|null, inverseName?:string|null, inverseEntityName?:string|null){

        this.init();
        this.name = name;
        this.destinationEntityName = destinationEntityName;
        this.isToMany = isToMany;        
        this._serverName = serverName;
        this.inverseName = inverseName ?? null;
        this.inverseEntityName = inverseEntityName ?? null;
        // if (inverseName != null && inverseEntityName != null){
        //     let ir = new MIORelationshipDescription();
        //     ir.initWithName(inverseName, inverseEntityName, false); 
        //     this.inverseRelationship = ir;
        // }
    }

    get serverName(){
        if (this._serverName == null) {    
            return this.name;
        }
        
        return this._serverName;
    }
}