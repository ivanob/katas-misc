
/**
 * This is the only stateful component of the project. It simulates
 * a cache (just in memory) to mesmerize (store) requests from the
 * clients so we can serve them in case of being repeated in the
 * future.
 */

export const cachable = (cache = {}) => (fn, keyGetter) => async (...args) => {
    // this function takes any list of arguments and returns a key
    const key = keyGetter(...args);

    if(!cache[key]) {
        console.log('warming cache...');
        const value = await fn(...args);
        cache[key] = value;
    }

    return cache[key];
}

