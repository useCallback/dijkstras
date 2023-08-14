
export function indexOf(array: Array<any>, callback: (thisObj: Object, ...args: any[]) => boolean, thisObj: Object) {
    let result = -1;
    array.some(function (value, index) {
        if (callback.call(thisObj, value)) {
            result = index;
            return true;
        }
    });

    return result;
}

