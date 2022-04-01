
class MIOCoreBundle
{
    
}

let _MIOAppBundleResources = {};

function MIOCoreBundleSetAppResource(resource:string, type:string, content:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) {
        files = {};
        _MIOAppBundleResources[type] = files;
    }

    files[resource] = content;
}

function MIOCoreBundleGetAppResource(resource:string, type:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) return null;

    let content = files[resource];
    return content;
}


