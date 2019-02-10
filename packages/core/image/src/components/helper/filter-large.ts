/**
 * Filter out disqualified items less than the refVal.
 *
 * @param arr
 * @param attr
 * @param refVal
 */
export const filterLarge = (arr, attr, refVal): object[] => {
  if (arr.length < 2) {
    return arr;
  }

  let largest = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr]) {
      if (!largest || largest[attr] < arr[i][attr]) {
        largest = arr[i];
      }
    }
  }

  if (!largest) {
    return arr;
  }

  const filtered = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i][attr] || arr[i][attr] >= refVal) {
      filtered.push(arr[i]);
    }
  }

  if (filtered.length === 0) {
    filtered.push(largest);
  }

  return filtered;
};
