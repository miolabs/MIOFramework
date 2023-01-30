import { NSObject } from "foundation";
import { UISceneSessionRole } from "./UISceneSession";

export class UISceneConfiguration extends NSObject
{
    name:string|null;
    role:UISceneSessionRole;

    constructor(name:string|null, sessionRole: UISceneSessionRole) {
        super();
        this.name = name;
        this.role = sessionRole;
    }
}