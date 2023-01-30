export function MIOCoreArrayClone(array){

    let new_array = [];
    for (let v of array) {        
        if (v instanceof Array) new_array.push(MIOCoreArrayClone(v));
        else if (v instanceof Object) new_array.push(MIOCoreObjectClone(v));
        else new_array.push(v);
    }

    return new_array;
}

export function MIOCoreObjectClone(obj) {

    let new_obj = {};
    for (let key in obj) {
        let v = obj[key];
        if (v instanceof Array) new_obj[key] = MIOCoreArrayClone(v);
        else if (v instanceof Object) new_obj[key] = MIOCoreObjectClone(v);
        else new_obj[key] = v;
    }

    return new_obj;
}
