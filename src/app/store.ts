import {Action} from 'redux';
import { combineReducers } from 'redux';

import {DashboardActions} from './main/dashboard.actions';
import { ICart, IPicture, DEFAULT_PICTURE } from './commerce/commerce.actions';
import { cartReducer } from './commerce/commerce.reducers';
import { IAccount } from './account/account.actions';
import { DEFAULT_ACCOUNT, accountReducer } from './account/account.reducer';
import { pictureReducer } from './commerce/commerce.reducers';
import { locationReducer } from './shared/location/location.reducer';
import { ILocation } from './shared/location/location.model';

export interface IAppState{
  cart:ICart;
  account:IAccount;
  changed_pictures:IPicture[];
  restaurant_pictures:IPicture[];
  location: ILocation;
}

export const INITIAL_STATE: IAppState = {
	cart: {items:[]},
	account: DEFAULT_ACCOUNT,
	changed_pictures:[],
  restaurant_pictures:[],
  location: null,
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

export const rootReducer = combineReducers({
	cart: cartReducer,
	account:accountReducer,
	changed_pictures:pictureReducer,
  restaurant_pictures:pictureReducer,
  location: locationReducer
});
