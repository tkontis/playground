'use strict';

const Operators = {
  '+': { apply: function (a, b) { return a + b; }, prec: 1 },
  '-': { apply: function (a, b) { return a - b; }, prec: 1 },
  '*': { apply: function (a, b) { return a * b; }, prec: 2 },
  '/': { apply: function (a, b) { return a / b; }, prec: 2 },
};

class Token {
  constructor(tokenSymbol, type, value) {
    this._tokenSymbol = tokenSymbol;
    this._type = type;
    this._value = value;
  }

  static of(token) {
    if (isFinite(token)) {
      return new Token(token, 'NUM', parseFloat(token));
    } else if (Object.keys(Operators).includes(token)) {
      return new Token(token, 'OP', Operators[token]);
    } else if (token == '(') {
      return new Token(token, 'L_PAREN', null);
    } else if (token == ')') {
      return new Token(token, 'R_PAREN', null);
    }
  }

  get symbol() { return this._tokenSymbol; }
  get type() { return this._type; }
  get val() { return this._value; }
  set val(value) { this._value = value; }
}

function isOperator(token) { return Operators.hasOwnProperty(token); }

class Postfix {

  constructor(expression) {
    this._postfix = expression;
  }

  static convert(infix) {
    // TODO : Infix to Postfix notation conversion
    const stack = [];
    const out = [];
    const peek = arr => arr.length ? arr[arr.length-1] : null;

    if (typeof infix !=='string' || infix === '') return null;

    infix
      .replace(/\s+/g, '')    // strip all interleaved spaces
      .replace(/--|\+\+/g, '+')
      .replace(/\+-|-\+/g, '-')
      .match(/\d+(\.\d+)?|\(|\)|[-+*\/]/g)
      .map(t => Token.of(t))
      .forEach((token, i) => {
        switch (token.type) {
        case 'L_PAREN':
          stack.push(token);
          break;
        case 'R_PAREN':
          while (peek(stack).type !== 'L_PAREN') {
            out.push(stack.pop());
          }
          break;
        case 'OP':

          break;
        case 'NUM':
          out.push(token);
          break;
        }
      });
  }

  // Shallow copy of internal token array. Tokens are mutable!!
  // TODO: turn Tokens into immutable objects.
  get tokens() {return this._postfix.slice();}

  evaluate() {
    const stack = [];
    const postfixTokens = this.tokens();

    for (let i=0, tokenCount=postfixTokens.length; i<tokenCount; i++) {
      const currToken = postfixTokens[i];
      let operator, operand1, operand2;

      switch (currToken.type) {
      case 'OP':
        operator = currToken.val();
        operand1 = postfixTokens.shift();
        operand2 = postfixTokens.shift();
        stack.push(operator.apply(operand1, operand2));
        break;
      case 'NUM':
        stack.push(currToken.val());
        break;
      }
    }
    return stack.pop();
  }
}

function calc(expression) {
  return Postfix.convert(expression).evaluate();
}