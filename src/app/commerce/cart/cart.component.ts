import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from './cart.actions';
import { CommerceService } from '../commerce.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	total:number = 0;
	subscription;
	cart;

	constructor(private ngRedux:NgRedux<IAppState>, private commerceServ:CommerceService) {
		let self = this;

		this.subscription = ngRedux.select<ICart>('cart').subscribe(
			cart=> {
				this.total = 0;
				this.cart = cart;
				this.cart.items.map(x=> {
					self.total += x.price * x.quantity;
				});
			});
	}

  ngOnInit() {

  }

	addToCart(p){
	  this.ngRedux.dispatch({type:CartActions.ADD_TO_CART, payload:{pid:p.id}});
	}

	removeFromCart(p){
	  this.ngRedux.dispatch({type:CartActions.REMOVE_FROM_CART, payload:{pid:p.id}});
	}

	checkout(){
		let self = this;
		this.commerceServ.checkout(this.cart).subscribe(r=>{
			if(r){
				self.ngRedux.dispatch({type:CartActions.CLEAR_CART, payload:{}})
			}
		})
	}

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
}
