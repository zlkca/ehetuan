import { AccountActions } from './account.actions';
import { IAccount } from './account.actions';


export const DEFAULT_ACCOUNT = {
	id:'',
    username:'',
    email:'',
    type:'user',
    restaurant_id:''
}

export function accountReducer(state:IAccount=DEFAULT_ACCOUNT, action:any){
	if(action.payload){
		let payload = action.payload;

		switch(action.type){
			case AccountActions.LOGIN:
				if(payload){
					return { ...state, ...payload }
				}else{
					return state;
				}
			case AccountActions.LOGOUT:
				return DEFAULT_ACCOUNT;
		}
	}
	
	return state;
}