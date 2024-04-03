function map(mapper, iterable) {
    const mapped = [];
    for (let item of iterable) {
        mapped.push(mapper(item));
    }
    return mapped;
}

export default map;
