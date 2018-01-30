import WebStorageCache from '../assets/js/web-storage-cache';

const CACHE_KEY_PREFIX = "cache_"
const CACHE_EXP = 60 * 5

export default {
    get(key) {
        var cache = new WebStorageCache();
        return cache.get(CACHE_KEY_PREFIX + key);
    },
    set(key, data, exp) {
        exp = exp || CACHE_EXP;
        var cache = new WebStorageCache();
        cache.set(CACHE_KEY_PREFIX + key, data, { exp: exp });
    },
    clear(key_prefix) {
        var cache = new WebStorageCache();
        let cacheKeys = [];
        let cacheKey_prefix = key_prefix ? (CACHE_KEY_PREFIX + key_prefix) : CACHE_KEY_PREFIX;
        for (var i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if (key.indexOf(cacheKey_prefix) == 0) {
                cacheKeys.push(key);
            }
        }
        cacheKeys.forEach(value => {
            cache.delete(value);

        });
    },
    getSize(type) {
        let size = 0;
        for (var i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i)
            if (key.indexOf(CACHE_KEY_PREFIX) == 0) {
                size += localStorage.getItem(key).replace(/[^\x00-\xff]/gi, 'xx').length
            }
        }
        if (type == 'm') {
            return Math.round(size / 1024 / 1024 * 100) * 0.01
        }
        return size;
    }
}