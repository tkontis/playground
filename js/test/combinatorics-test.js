const {permute} = require('../src/combinatorics');
const {expect} = require('chai');

describe('test permutations of distinct characters', () => {
  const words = ['', 'a', 'ab', 'abc', 'abcd'];
  const expected = [
    [],
    ['a'],
    ['ab', 'ba'],
    ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'],
    [
      'abcd', 'acbd', 'dacd', 'bcad', 'cabd', 'cbad',
      'abdc', 'acdb', 'badc', 'bcda', 'cadb', 'cbda',
      'adbc', 'adcb', 'bdac', 'bdca', 'cdab', 'cdba',
      'dabc', 'dacb', 'dbac', 'dbca', 'dcab', 'dcba'
    ]
  ];

  // Dynamically create the tests for different word lengths
  words.forEach((word, i) => {
    it(`should handle ${word.length}-letter words`, () => {
      let actual = permute(word);
      console.log(actual);
      expect(actual.map(perm => perm.join(''))).to.eql(expected[i]);
    });
  });
});