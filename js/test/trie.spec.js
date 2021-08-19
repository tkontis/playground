const {Trie} = require('../src/trie');
const {assert} = require('chai');

describe('Trie data structure', () => {
  let trie = null;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should create an empty trie tree with an initialized root node', () => {
    assert(trie.root);
    assert.isNull(trie.root.value);
    assert.deepEqual(trie.root.children, {});
  });

  it('should create a populated trie tree with a string argument', () => {
    const sentence = 'this is an interesting data structure';
    trie = new Trie(sentence);
    assert(trie.root);
    sentence.split(' ').forEach(word => {
      assert.isTrue(trie.searchWord(word));
    });
  });

  it('should detect words case insensitively', () => {
    const words = 'My name is Bond';
    trie.addWords(words);
    assert.isTrue(trie.searchWord('my'));
    assert.isTrue(trie.searchWord('My'));
    assert.isTrue(trie.searchWord('Bond'));
    assert.isTrue(trie.searchWord('bond'));
  });

  it('should work with numbers as well', () => {
    const numbers = '123 1234 58290 623 9124234789732';
    trie = new Trie(numbers);
    numbers.split('').map(Number).forEach(num => {
      assert.isTrue(trie.searchWord(num));
    });
  });

});