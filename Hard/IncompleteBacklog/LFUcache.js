// https://leetcode.com/problems/lfu-cache/

class LFUcache {
    constructor(capacity) {
        this.capacity = capacity,
        this.utilization = 0,
        this.map = new Map(),
        this.useCounter = new Map()
    }
}

LFUcache.prototype.get = function(key) {
    return this.map.has(key) ? this.map.get(key) : -1
}

LFUcache.prototype.put = function(key, value) {

    if (this.map.has(key)) {
        this.map.set(key, value)
    } else {
        this.map.set(key, 1)
        this.utilization += 1
    }
    this.useCounter()

    if (this.utilization === this.capacity) {

    }
}

var obj = new LFUcache(5)
var param_1 = obj.get(2)
obj.put(3, 4)