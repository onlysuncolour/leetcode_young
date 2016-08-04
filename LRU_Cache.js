// Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.
//
// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// set(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
/**
 * @constructor
 */
var LRUCache = function(capacity) {
    this.__capacity__ = capacity;
    this.__priority__ = [];
    this.__array__ = [];
};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.__priority__.indexOf(key) != -1) {
    this.__priority__.splice(this.__priority__.indexOf(key), 1);
    this.__priority__.push(key);
    // this.__priority__[key] = 0
    return this.__array__[key]
  }
  return -1
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
  this.__array__[key] = value;
  if (this.__priority__.indexOf(key) != -1) {
    this.__priority__.splice(this.__priority__.indexOf(key), 1);
  }
  this.__priority__.push(key);
  if (this.__priority__.length > this.__capacity__) {
    this.__priority__.shift();
  }
};
