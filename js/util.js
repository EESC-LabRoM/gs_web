var compareArrays = function(arr1, arr2) {
    // compare size
    if (arr1.length !== arr2.length) return false;

    // compare items
    for (i in arr1) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
};
