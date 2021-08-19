function permuteUnique(arr) {
  if (!arr) return [];
  let perms = [], len = arr.length;
  if (len == 1) {
    perms.push([arr[0]]);
  } else if (len == 2) {
    perms.push([arr[0],arr[1]]);
    perms.push([arr[1],arr[0]]);
  } else if (len > 2) {
    for (let i=1; i<len-1; i++) {
      let element = arr[i];
      let rest = arr.slice();
      rest.splice(i,1);
      permuteUnique(rest).forEach(
        uniquePerm=> perms.push(uniquePerm.unshift(element))
      );
    }
  }
  return perms;
}

function permute(arr, comparator) {
  const duplicates = [], distinct = [];
  if (typeof arr == 'string') arr = arr.split('');

  for (let i=0,len=arr.length; i<len; i++) {
    let currEl = arr[i];
    if (distinct.indexOf(currEl)==-1) {
      distinct.push(currEl);
    } else {
      duplicates.push(currEl);
    }
  }

  // produce permutations of distinct
  const perms = permuteUnique(distinct);

  // if there are no duplicate elements return already computed perms
  if (!duplicates.length) return perms;

  // intermix the duplicates
  //TODO
  return null;
}

exports.permute = permute;