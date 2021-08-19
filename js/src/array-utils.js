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
  let containsNaN = false;
  const results = arr.reduce((a,e,i) => {
    if (isNaNEnhanced(e)) {
      if (singleRef && !containsNaN && arr.includes(NaN)) {
        a.push(NaN);
        containsNaN = true;
      }
    }
    else if (arr.indexOf(e)!==i) {
      if (!single || !a.includes(e)) {
        a.push(e);
      }
    }
    return a;
  }, []);

  // For multiple occurrences handle NaN values separately due to its peculiarity (NaN!==NaN, arr.indexOf(NaN)===-1, etc)
  if (!singleRef && arr.includes(NaN)) {
    const NaNOccurrences = arr.filter(e => isNaNEnhanced(e));
    results.push(...NaNOccurrences);
  }
  return results;
}

function isNaNEnhanced(e) {
  return isNaN(e) && typeof(e)==='number';
}

module.exports.findDupes = findDupes;