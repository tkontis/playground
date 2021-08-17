export enum Denomination {
    Cent1 = 1,
    Cent2 = 2,
    Cent5 = 5,
    Cent10 = 10,
    Cent20 = 20,
    Cent50 = 50,
    Euro1 = 100,
    Euro2 = 200,
    Euro5 = 500,
    Euro10 = 1000,
    Euro20 = 2000,
    Euro50 = 5000,
    Euro100 = 10000,
}

const denominations = Object.values(Denomination) as Denomination[];

const getDenominationAmount = ([d, q]: [Denomination, number]) => d * q;

const sumDenominationAmount = (sum: number, denAmount: [Denomination, number]) => sum += getDenominationAmount(denAmount);

export type Money = Map<Denomination, number>;

export const countMoney = (money: Money): number => [...money.entries()].reduce(sumDenominationAmount, 0);

const emptyWallet = (wallet: Money) => {
    for (const den of wallet.keys()) {
        wallet.set(den, 0);
        wallet.clear();
    }
};

const _paySolutions = (tuples: Array<[number, number]>, amount: number) => {
    let solutions = [];
    let debt = amount;
    for (const [d, q] of tuples) {
        const reqQty = Math.min(debt / d);
        debt = debt - d * reqQty;
    }
};

// guaranteed amount < walletMoney
// solution with as few coins/bills as possible and as close to the exact amount as possible
const _pay = (walletEntries: Array<[Denomination, number]>, amount: number) => {
    let solution: Array<[Denomination, number]> = [];
    for (const [d, q] of walletEntries) {
        const dAmount = d * q;
        // todo

    }
};

/**
 * Subtract from wallet if able to pay
 * @param wallet - gets mutated if transaction is completed successfully
 * @param amount - the payable amount in cents (integer)
 * @returns {Money} returns the change after the transaction takes place
 */
export const pay = (wallet: Money, amount: number): Money => {
    if (!Number.isInteger(amount) || amount < 0) {
        throw new TypeError('amount must be a positive integer');
    }
    let change = new Map<Denomination, number>();
    const walletTotal = countMoney(wallet);
    if (walletTotal < amount) {
        throw new Error('cannot pay because wallet has less money than requested amount');
    }
    else if (walletTotal === amount) {
        emptyWallet(wallet);
    } else if (walletTotal > amount) {
        const entriesDesc = [...wallet.entries()].sort(([a],[b]) => b-a);
        change = _pay(entriesDesc, amount);
    }
    return change;
};
