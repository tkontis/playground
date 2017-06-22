const { expect } = require('chai');
const { findDupes } = require('../src/array-utils');

function generateObject(props) {
  const o = Object.create(null);
  props.forEach(prop => {
    Object.defineProperty(o, prop);
  });
  return o;
}

const availableChars = new Array(127).fill(0).map((e, i) => String.fromCharCode(i)).slice(33);

function getRandomInt(min=0,max=100) {
  return Math.floor(Math.random() * Date.now() % (max-min+1)) + min;
}

function generateType(type) {
  let size;

  switch (type) {
  case 'number':
    return getRandomInt(-1000, 1000);
  case 'string':
    size = getRandomInt(3,15);
    return new Array(size).map(()=> availableChars[getRandomInt(0,127)]).join('');
  default:
    throw new TypeError('Unsupported type');
  }
}

function generateArray(elemType, size) {
  return new Array(size).fill(undefined).map(() => generateType(elemType));
}

describe('Primitive-value arrays', () => {

  describe('when tested for single reference', () => {
    it('should return an empty array when no dupes are detected', ()=>{
      const noDupeArrays = [
        [],
        [1,2,3],
        ['abd', '', 'abc'],
        ['afc', null, 7, 9, 10],
        [true, false, 0],
        [null, ''],
        [undefined, ''],
        [null, undefined, '', 0],
        [NaN, 5, null],
        [0, null, undefined, false, NaN]
      ];
      const expected = [];
      noDupeArrays.forEach(arr => expect(findDupes(arr)).to.have.members(expected));
    });

    it('should report duplicates one time in array', () => {
      const singlyDupeArrays = [
        [1,1,2,3],
        ['abd', 'afc', 'abc', 'afc', 'abd', 'a', 'z'],
        [null, null, null],
        [true, false, true, true, 0, 1, 1],
        [undefined, null, 'hello', null, 3, null],
        [undefined, undefined, undefined, undefined],
        ['', 0, null, undefined, false, NaN, 0, null, 1, undefined, false, '', NaN, true]
      ];
      const expected = [
        [1],
        ['abd', 'afc'],
        [null],
        [1, true],
        [null],
        [undefined],
        ['', null, 0, undefined, false, NaN]
      ];
      singlyDupeArrays.forEach(arr => expect(findDupes(arr, true)).to.have.members(expected));
    });
  });

  it('should detect single values', () => {

  });

  it('', () => { });

  it('', () => { });
});
