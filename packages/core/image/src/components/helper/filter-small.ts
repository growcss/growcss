/**
 * filter to the smallest items of a dimension
 *
 * @param arr
 * @param attr
 */
export const filterSmall = (arr, attr): object[] => {
  if (arr.length < 2) {
    return arr;
  }
  let smallest = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr]) {
      if (!smallest || smallest[attr] > arr[i][attr]) {
        smallest = arr[i];
      }
    }
  }

  if (!smallest) {
    return arr;
  }

  const filtered = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i][attr] || arr[i][attr] <= smallest[attr]) {
      filtered.push(arr[i]);
    }
  }

  return filtered;
};
