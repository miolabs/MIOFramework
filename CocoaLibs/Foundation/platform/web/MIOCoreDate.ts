
import {MIOCoreGetBrowser, MIOCoreBrowserType} from "./MIOCore"

export function MIOCoreDateGetInternalSeparatorSymbol():string{

    let browser = MIOCoreGetBrowser();
    if (browser == MIOCoreBrowserType.Safari) return "/";
            
    return "-";
}