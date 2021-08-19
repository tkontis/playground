class Trie {
  constructor(sentence = '') {
    this.root = new Node();
    this.addWords(sentence);
  }

  sanitizeWord(word) {
    if (typeof word !== 'string' && typeof word !== 'number') return '';
    return String(word).toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  addWord(word) {
    const sanitizedWord = this.sanitizeWord(word);
    if (!sanitizedWord.length) return false;
    let node = this.root;
    sanitizedWord.split('')
      .forEach((letter, idx) => {
        const isTerminalNode = idx === word.length - 1;
        const nextNode = node.addChild(letter, isTerminalNode);
        node = nextNode;
      });
    return true;
  }

  addWords(words) {
    let tokens = null;
    const warnings = [];
    if (Array.isArray(words) && words.length) {
      tokens = words
        .filter(word => typeof(word)=='string' || typeof(word)=='number')
        .map(word => String(word).toLowerCase());
    } else if (typeof words === 'string') {
      tokens = words.toLowerCase().split(/\W+/);
    } else {
      throw new TypeError(`Invalid argument type for "words": ${typeof(words)}`);
    }
    if (tokens) {
      tokens
        .filter((word, idx, arr) => arr.lastIndexOf(word))  // remove duplicates
        .forEach(word => {
          const added = this.addWord(word);
          if (!added) {
            warnings.push(word);
          }
        });
    }
    return warnings.length ? `The following tokens could not be added: ${warnings.join(', ')}` : null;
  }

  searchWord(word) {
    let node = this.root;
    const sanitizedWord = this.sanitizeWord(word);
    const lastIndex = sanitizedWord.length - 1;
    return sanitizedWord.split('').every((letter, idx) => {
      node = node.getChild(letter);
      return Boolean(node) && (idx < lastIndex || node.isTerminalNode);
    });
  }
}

class Node {
  constructor({isTerminalNode = false, value = null} = {}) {
    this.isTerminalNode = isTerminalNode;
    this.value = value;
    this.children = {};
  }
  hasChild(letter) {
    return Object.prototype.hasOwnProperty.call(this.children, letter);
  }
  getChild(letter) {
    return this.children[letter] || null;
  }
  addChild(letter, isTerminalNode) {
    let childNode = this.getChild(letter);
    if (childNode) {
      childNode.isTerminalNode |= isTerminalNode;
    } else {
      childNode = new Node({value: (this.value||'') + letter, isTerminalNode});
      this.children[letter] = childNode;
    }
    return childNode;
  }
}

module.exports = { Trie };