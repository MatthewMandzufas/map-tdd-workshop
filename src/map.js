function getIsPlainObject(valueToCheck) {
    return (
        valueToCheck !== null &&
        typeof valueToCheck === 'object' &&
        Object.getPrototypeOf(valueToCheck) === Object.prototype
    );
}

function getIsTransformer(valueToCheck) {
    return (
        typeof valueToCheck['@@transducer/init'] === 'function' &&
        typeof valueToCheck['@@transducer/step'] === 'function' &&
        typeof valueToCheck['@@transducer/result'] === 'function'
    );
}

function getIsTransducer(valueToCheck) {
    return (
        typeof valueToCheck.f === 'function' &&
        (getIsTransformer(valueToCheck.xf) || getIsPlainObject(valueToCheck.xf))
    );
}

function map(mapperFunction, functor) {
    if (arguments.length === 1) {
        return function (value) {
            return map(mapperFunction, value);
        };
    }

    if (functor === null || functor === undefined) {
        throw new TypeError();
    }

    if (
        Object.hasOwn(functor, 'map') &&
        typeof functor.map === 'function' &&
        functor.map.length === 1
    ) {
        return functor.map(mapperFunction);
    }
    if (Array.isArray(functor)) {
        const mappedFunctor = [];
        for (let i = 0; i < functor.length; i++) {
            mappedFunctor[i] = mapperFunction(functor[i]);
        }
        return mappedFunctor;
    } else if (getIsTransformer(functor) || getIsTransducer(functor)) {
        return { xf: functor, f: mapperFunction };
    } else if (getIsPlainObject(functor)) {
        let mappedFunctor = {};
        for (const [key, value] of Object.entries(functor)) {
            mappedFunctor[key] = mapperFunction(value);
        }
        return mappedFunctor;
    } else if (typeof functor === 'function') {
        return function (valueToMap) {
            return mapperFunction(functor(valueToMap));
        };
    }
}
export default map;
