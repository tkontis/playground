export type Money = Map<Denomination, number>;

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

const descDenominationValues = (Object.values<string|Denomination>(Denomination)
  .filter(d => typeof d !== 'string') as Denomination[])
  .sort((a, b) => b - a);

export class Wallet {
    private _money: Map<Denomination, number> = new Map<Denomination, number>();
    private _total = 0;

    private get total() { return this._total; }
    private set total(total: number) {
      if (total >= 0 && Number.isInteger(total) && total < Number.MAX_SAFE_INTEGER) {
        this._total = total;
      }
    }

    constructor(amount: number | Money) {
      this.credit(amount);
    }

    private static normalizeAmount(amount: number): number {
      return Math.floor(Math.max(amount, 0));
    }

    /**
     * Removes the equivalent amount in cents from current money object.
     * If `forced` flag is enabled it will remove as much as possible even if the required
     * amount is greater than the current total. If `forced` is disabled it will remove
     * the required amount only if it is available, else no transaction will take place.
    */
    debit(amount: number, forced?: boolean): Money {
      let debitedMoney = new Map<Denomination, number>();
      if (amount > 0) {
        let rest = Wallet.normalizeAmount(amount);
        // if not enough money and not forced, return without doing anything
        if (this.total < rest) {
          if (forced) {
            debitedMoney = this.empty();
          }
        } else {
          for (const den of descDenominationValues) {
            if (!rest) { break; }
            const qty = Math.floor (rest / den);
            if (qty) {
              rest %= den;
              const debitedDenomination = this.removeDenomination(den, qty);
              for (const [den, qty] of debitedDenomination.entries()) {
                const dmCurrQty = debitedMoney.get(den) || 0;
                debitedMoney.set(den, dmCurrQty + qty);
              }
            }
          }
        }
      }
      return debitedMoney;
    }

    /**
     * Adds the equivalent amount in cents to current money object
     */
    credit(amount: number | Money): void {
      if (typeof amount === 'number') {
        let rest = Wallet.normalizeAmount(amount);
        for (const den of descDenominationValues) {
          if (!rest) { break; }
          const qty = Math.floor(rest / den);
          if (qty) {
            rest %= den;
            this.addDenomination(den, qty);
          }
        }
      } else if (amount && typeof amount === 'object') {
        for (const [den, qty] of amount.entries()) {
          this.addDenomination(den, qty);
        }
      }
    }

    private empty(): Money {
      const currentMoney = new Map<Denomination, number>(this._money);
      this._money.clear();
      this.total = 0;
      return currentMoney;
    }

    private addDenomination(den: Denomination, qty: number): void {
      if (qty > 0) {
        const currDenQty = this._money.get(den) || 0;
        this._money.set(den, currDenQty + qty);
        this.total = this.total + qty * den;
      }
    }

    private removeDenomination(den: Denomination, qty: number): Money {
      const removed = new Map<Denomination, number>();
      const currDenQty = this._money.get(den) || 0;
      if (0 < qty && qty <= currDenQty) {
        this._money.set(den, currDenQty - qty);
        this.total = this.total - qty * den;
        removed.set(den, qty);
      }
      return removed;
    }
}
