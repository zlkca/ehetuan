import {Action} from 'redux';
import { combineReducers } from 'redux';

import {DashboardActions} from './main/dashboard.actions';
import { ICart } from './commerce/cart/cart.actions';
import { cartReducer } from './commerce/cart/cart.reducer';
import { IAccount } from './account/account.actions';
import { DEFAULT_ACCOUNT, accountReducer } from './account/account.reducer';

export interface IAppState{
  cart:ICart;
  account:IAccount;
  // name:string;
}

export const INITIAL_STATE: IAppState = {
	cart: {items:[]},
	account: DEFAULT_ACCOUNT
	// name:''
}

// export function rootReducer(last:IAppState, action:Action):IAppState{
// 	// switch (action.type){
// 	// 	case DashboardActions.SHOW_DASHBOARD:
// 	// 		return { dashboard: 'main' };
// 	// 	case DashboardActions.HIDE_DASHBOARD:
// 	// 		return { dashboard: ''};
// 	// }
// 	return last;
// }

export const rootReducer = combineReducers({cart: cartReducer, account:accountReducer});