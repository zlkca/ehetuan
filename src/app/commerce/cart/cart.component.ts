import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from './cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	subscription;
	cart;

	constructor(private ngRedux:NgRedux<IAppState>) {
		this.subscription = ngRedux.select<ICart>('cart').subscribe(
			cart=> this.cart = cart
		);
	}

  ngOnInit() {

  }

	addToCart(p){
	  this.ngRedux.dispatch({type:CartActions.ADD_TO_CART, payload:{pid:p.id}});
	}

	removeFromCart(p){
	  this.ngRedux.dispatch({type:CartActions.REMOVE_FROM_CART, payload:{pid:p.id}});
	}

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
}
