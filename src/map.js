function getIsPlainObject(valueToCheck) {
    return (
        valueToCheck !== null &&
        typeof valueToCheck === 'object' &&
        Object.getPrototypeOf(valueToCheck) === Object.prototype
    );
}

function map(mapperFunction, functor) {
    const isPlainObject = getIsPlainObject(functor);
    if (Array.isArray(functor)) {
        const mappedFunctor = [];
        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = mapperFunction(functor[i]);
        }
        return mappedFunctor;
    } else if (isPlainObject) {
        const mappedFunctor = {};
        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = mapperFunction(value);
        }
        return mappedFunctor;
    }
}
export default map;
