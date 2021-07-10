
/**
 * This is the only stateful component of the project. It simulates
 * a cache (just in memory) to mesmerize (store) requests from the
 * clients so we can serve them in case of being repeated in the
 * future.
 */

const MAX_DELAY_ALLOWED_MS = 10 * 60 * 1000 //10 Minutes in Miliseconds

export const cachable = (cache = {lastRead: 0,lastValue: null}) => async fn => {
    const now = Date.now();
    if(now - cache.lastRead > MAX_DELAY_ALLOWED_MS) {
        console.log(`Value not found in cache. Updating.`)

        cache.lastValue = await fn();
        cache.lastRead = now;
    }

    return cache.lastValue;
}
