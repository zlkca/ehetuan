import {Action} from 'redux';
import {DashboardActions} from './main/dashboard.actions';

export interface IAppState{
  dashboard:string;
}

export const INITIAL_STATE: IAppState = {
	dashboard:''
}

export function rootReducer(last:IAppState, action:Action):IAppState{
	switch (action.type){
		case DashboardActions.SHOW_DASHBOARD:
			return { dashboard: 'main' };
		case DashboardActions.HIDE_DASHBOARD:
			return { dashboard: ''};
	}
	return last;
}