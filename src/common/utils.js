/**
 * @param {Array} arr
 * @param {Function} targetFn
 * @returns {[any, Number]}
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * const targetFn = (value) => value === 3 ? 0 : value < 3 ? -1 : 1;
 * binarySearch(arr, targetFn); // [3, 2]
 *
 */
export function binarySearch(arr, targetFn) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    const comparison = targetFn(midValue);
    if (comparison === 0) {
      return [midValue, mid];
    } else if (comparison < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return [undefined, -1];
}

/**
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 * @example
 * const a = 1;
 * const b = 2;
 * cmp(a, b); // -1
 * cmp(b, a); // 1
 * cmp(a, a); // 0
 * cmp(b, b); // 0
 */
export function cmp(a, b) {
  return a - b;
}
