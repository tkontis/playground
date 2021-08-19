import { expect } from 'chai';
import { Wallet, Denomination } from '../src/coins';
import type { Money } from '../src/coins';

describe('pay()', () => {
    let wallet: Money = new Map();

    beforeEach(() => {
        wallet.clear();
    });

    it('throws a type error when invalid amount is given', () => {
        wallet.set(Denomination.Euro2, 2);
        wallet.set(Denomination.Cent10, 4);
        const errorMsg = 'amount must be a positive integer';
        expect(() => pay(wallet, 1.5)).to.throw(TypeError, errorMsg);
        expect(() => pay(wallet, -1)).to.throw(TypeError, errorMsg);
    });

    it('returns zero change and an empty wallet for a payment of an equal amount to the one wallet is carrying', () => {
        wallet.set(Denomination.Euro10, 1);
        wallet.set(Denomination.Euro5, 1);
        expect(countMoney(wallet)).to.equal(1500);
        const change = pay(wallet, 1500);
        expect(countMoney(wallet), 'wallet should be empty').to.equal(0);
        expect(countMoney(change), 'there should be no change').to.equal(0);
    });

    it.skip('larger payable amount returns the correct amount of change', () => {
        // TODO
    });
})