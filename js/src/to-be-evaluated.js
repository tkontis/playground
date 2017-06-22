function permutate(arr) {
    if (arr.length == 1)
        return [arr[0]];

    if (arr.length == 2)
        return [[arr[0], arr[1]], [arr[1], arr[0]]];

    const copy = arr.slice(); // shallow copy of array
    const sorted = sortByType(copy);
    const unique = chars.filter((c, i, a) => a.lastIndexOf(c) === i);
    const perms = [];

    unique.forEach((c, p) => {
        const r = permutate(rest(p, unique);
        for (let i = 0, l = r.length; i < l; i++) {
            r[i] = c + r[i];
        }
        r.forEach(rp => {
            perms.push([c, ...rp]);
        });
    });

    return perms;
}

function sortByType(arr) {
    return arr.sort((a, b) => {
        const typeA = typeof (a), typeB = typeof (b);
        if (typeA === typeB) {
            if (typeA === 'string') {
                return a.every((ca, pa) = ca.charCodeAt(0) <= b[pa].charCodeAt(0)) ? -1 : 1;
            }
            if (typeA === 'number') {
                return isNaN(a) ? -1 : isNaN(b) ? -1 : a - b;
            }
            if (typeA === 'function') {
                return a.toString().length - b.toString().length;
            }
            if (typeA === 'object') {
                return a === null ? -1 : b === null ? -1 : Object.keys(a).length - Object.keys(b).length;
            }
            if (typeA === 'symbol') {
                return stringComparator(a.toString(), b.toString());
            }
        } else {

        }
    });

    function stringComparator(a, b, prop) {
        const supported = ['charCode', 'length'];
        const selected = supported.includes(prop) ? prop : 'charCode';
        switch (selected) {
            case 'charCode':
                return a.split('').every((ca, pa) => ca.charCodeAt(0) <= b.charAt(pa).charCodeAt(0)) ? -1 : 1;

            case 'length':
                return a.length - b.length;
        }
    }
}

function rest(p, arr) {
    const copy = arr.slice();
    copy.splice(p, 1);
    return copy;
}