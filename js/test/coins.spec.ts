import {expect} from 'chai';
import {Denomination, Wallet} from '../src/coins';

describe('Wallet', () => {
  describe('constructor()', () => {
    it('can be initialized with an amount or empty', () => {
      const wallet = new Wallet(2400);
      expect(wallet.total).to.equal(2400);
      const emptyWallet = new Wallet();
      expect(emptyWallet.total).to.equal(0);
    });
  });

  describe('credit()', () => {
    it('credits the wallet with the min quantity of the max denomination values when argument is an integer', () => {
      const wallet = new Wallet();
      wallet.credit(2400);
      expect(wallet.money.size).to.equal(2, 'should hold 2 denomination values');
      expect(wallet.money.get(Denomination.Euro20)).to.equal(1, 'should hold 1 20E bill');
      expect(wallet.money.get(Denomination.Euro2)).to.equal(2, 'should hold 2 2E coins');
    });

    it('credits specified denomination tuples when argument is of type Map<Denomination,number>', () => {
      const wallet = new Wallet(1000);
      const debitableAmount = new Map();
      debitableAmount.set(Denomination.Euro5, 3);
      debitableAmount.set(Denomination.Cent10, 1);
      debitableAmount.set(Denomination.Cent1, 2);
      wallet.credit(debitableAmount);
      expect(wallet.total).to.equal(2512, '15.12E added to the initial 10.00E = 25.12E');
      expect(wallet.money.size).to.equal(4, 'should hold 4 denomination values');
      expect(wallet.money.get(Denomination.Euro10)).to.equal(1, '1x10E');
      expect(wallet.money.get(Denomination.Euro5)).to.equal(3, '3x5E');
      expect(wallet.money.get(Denomination.Cent10)).to.equal(1, '1x10c');
      expect(wallet.money.get(Denomination.Cent1)).to.equal(2, '2x1c');
    });
  });

  describe.skip('debit()', () => {
    // TODO
  });
});