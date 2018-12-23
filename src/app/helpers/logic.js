export function setLocalStorage(name, value) {
    if (typeof value === 'string' || typeof value === 'number') {
        window.localStorage.setItem(name, `${value}`);
    } else {
        window.localStorage.setItem(name, JSON.stringify(value));
    }
}

export function getLocalStorage(name) {
    const getItem = window.localStorage.getItem(name)
    try {
        return JSON.parse(getItem);
    } catch (e) {
        return getItem;
    }
}

export function getStringDate(dateObject) {
    if (propsExist('year', dateObject) && propsExist('month', dateObject) && propsExist('day', dateObject)) {
        return `${dateObject['year']}-${dateObject['month']}-${dateObject['day']}`
    }
    return false;
}

export function propsExist(name, objectData) {
    return Object.prototype.hasOwnProperty.call(objectData, name);
}