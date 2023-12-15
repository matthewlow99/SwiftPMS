export function validateInput(arr=[]){
    let isValid = true;
    arr.forEach(e => {
        if(e === "" || Object.keys(e).length === 0 || e===null){
            isValid = false;
        }
    })
    return isValid;
}

export function removeDuplicatesJSON(array, key) {
    const uniqueMap = new Map();
    array.forEach((obj) => {
        const value = obj[key];
        if (!uniqueMap.has(value)) {
            uniqueMap.set(value, obj);
        }
    });
    return Array.from(uniqueMap.values());
}

export function removeDuplicates(array){
    const arr = [];
    for(const e of array){
        if(!isElementInArray(arr, e))
            arr.push(e)
    }
    return arr;
}
export function isElementInArray(arr, e){
    let res = false;
    for(const f of arr){
        if(e === f) {
            console.log(e + ' equals ' + f)
            res = true;
        }else {
            console.log(e + ' doesnt equals ' + f)
        }

    }

    return res;
}
export function getElementByIDFromArray(arr, id){
    for(const e of arr){
        if(e?._id === id)
            return e;
    }
    return {};
}
export function arrayDifference(total, removeArr, compField){
    return total.filter(e => {
        for(const r of removeArr){
            if(e[compField] === r[compField]) {

                return false;
            }
            console.log(e[compField])
            console.log(r[compField])
        }
        return true;
    })
}
export function cloneObject(object){
    return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
}
export async function waitSeconds(time=1200){
    await new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve();
        }, time)
    })
}