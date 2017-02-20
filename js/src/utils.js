/**
 * Polyfill for Object.constructor.entries, whereby an object parameter's iterable keys and their respective
 * values are returned as an array of arrays.
 * @param obj
 * @returns {Array<Array<string,any>>} tuples of the entries [[key1,value1],[key2,value2]...]
 */
function entries(obj) {
  return Object.constructor.entries ? Object.entries(obj) :
    Object.keys(obj).reduce((container, key) => {
      container.push([key, obj[key]]);
      return container;
    }, []);
}
