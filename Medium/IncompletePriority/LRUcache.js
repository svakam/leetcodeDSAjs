// https://aonecode.com/LRU-Cache-II-TTL
class LruTtlCache {
    constructor(maxSize) {
      this._maxSize = maxSize;
      this._data = []
    }
  
    get(key) {
      for (let element of this._data) {
        if (element.key === key) return element.value;
      }
  
      return undefined;
    }
  
    put(key, value, ttl) {
      // Do I need to validate ttl?
      let insertionDate = this._now();
      let dropDeadDate = insertionDate + ttl;
      this._data.push({ key, value, dropDeadDate, insertionDate });
      this._evict();
    }
  
    has(key) {
      return this.get(key) !== undefined;
    }
  
    _evict() {
      while (this._data.length > this._maxSize) {
        // add a loop that evicts things that are expired, starting with the most expired
        // add a loop that evicts least recently used, starting with oldest
      }
    }
  
    _now() {
      return Date.now();
    }
  }