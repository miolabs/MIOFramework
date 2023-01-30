import { NSClassFromString } from "mio-core";
import { UIApplication } from "./UIApplication";

export function UIApplicationMain(argc:number, argv:string[], principalClassName:string|null, delegateClassName:string) : number {
    let delegate = NSClassFromString( delegateClassName );
    UIApplication.shared.delegate = delegate;
    UIApplication.shared.run(argv);
    return 0;
}