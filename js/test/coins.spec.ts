import { expect } from 'chai';
import { pay, Denomination, countMoney } from 'coins';
import type { Money } from 'coins';

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

    it('an payment of an equal amount to the one wallet is carrying returns zero change and an empty wallet', () => {
        wallet.set(Denomination.Euro10, 1);
        wallet.set(Denomination.Euro5, 1);
        expect(countMoney(wallet)).to.be(1500);
        const change = pay(wallet, 1500);
        expect(countMoney(wallet), 'wallet should be empty').to.be(0);
        expect(countMoney(change), 'there should be no change').to.be(0);
    });

    it.skip('larger payable amount returns the correct amount of change', () => {
        // TODO
    });
})