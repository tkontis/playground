/**
 * Locates all duplicate elements in an array.
 * Strict equality is used for containment detection.
 * @param arr The source array to be scanned for duplicates
 * @param singleRef A boolean that indicates whether the
 *  duplicates should be reported one or multiple times
 * @returns An array with the duplicate elements
 */
function findDupes(arr, singleRef) {
  const single = !!singleRef;
  return arr.reduce((a,e,i) => {
    if (arr.indexOf(e)!==i) {
      if (!single || !a.includes(e)) {
        a.push(e);
      }
    }
    return a;
  }, []);
}

module.exports.findDupes = findDupes;