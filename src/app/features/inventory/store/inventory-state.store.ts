import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Item } from '../../board/models';

const INITIAL_FUNDS = 500;
const MAX_CAPACITY = 5;

interface IInventoryState {
  funds: number;
  fundsError: boolean;
  items: Item[];
  maxCapacity: number;
}

const initialState: IInventoryState = {
  funds: INITIAL_FUNDS,
  fundsError: false,
  items: [],
  maxCapacity: MAX_CAPACITY
};

export const InventoryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(state => ({

    fundsAvailable(amount: number) {
      const result = state.funds() - amount >= 0;
      if (!result) {
        patchState(state, { fundsError: true });
        setTimeout(() => patchState(state, { fundsError: false }), 3000);
      }
      return result;
    },

    addFunds(amount: number) {
      patchState(state, { funds: state.funds() + amount });
    },

    takeFunds(amount: number): boolean {
      return this.fundsAvailable(amount)
        ? (patchState(state, { funds: state.funds() - amount }), true)
        : false;
    }

  }))
);
