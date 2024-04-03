function map(mapper, iterable) {
    const mappedArray = [];
    for (let i = 0; i < iterable.length; i++) {
        mappedArray[i] = mapper(iterable[i]);
    }
    return mappedArray;
}

export default map;
