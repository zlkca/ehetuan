import { Injectable } from '@angular/core';
import { Action } from 'redux';

export class CartActions{
	static ADD_TO_CART = 'ADD_TO_CART';
	static REMOVE_FROM_CART = 'REMOVE_FROM_CART';
}

export interface ICartItem{
    pid:string;
    name:string;
    price:number;
    quantity:number;
}

export interface ICart{
	items:ICartItem[];
}
// import { Injectable } from '@angular/core';
// import { Action } from 'redux';

// @Injectable()
// export class CartActions{
// 	static ADD_TO_CART = 'ADD_TO_CART';
// 	static REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// 	addToCart():Action {
// 		return {type:CartActions.ADD_TO_CART};
// 	}

// 	removeFromCart():Action{
// 		return {type:CartActions.REMOVE_FROM_CART};
// 	}
// }

// export class ICartItem{
//     name:string;
//     quantity:number;
//     price:number;
// }