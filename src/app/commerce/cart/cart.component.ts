import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions, ICartItem } from '../commerce.actions';
import { CommerceService } from '../commerce.service';
import { IAccount } from '../../account/account.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	total:number = 0;
	subscription;
	subscriptionAccount;
	cart:any;
	user;

	constructor(private rx:NgRedux<IAppState>, private commerceServ:CommerceService) {
		let self = this;

		this.subscription = this.rx.select<ICart>('cart').subscribe(
			cart=> {
				this.total = 0;
				this.cart = cart;
				this.cart.items.map(x=> {
					self.total += x.price * x.quantity;
				});
			});

		this.subscriptionAccount = this.rx.select<IAccount>('account').subscribe(
			account=>{
				self.user = account;
			})
	}

	ngOnInit() {

	}

	addToCart(item:ICartItem){
      this.rx.dispatch({type:CartActions.ADD_TO_CART,
      	payload:{pid:item.pid, name:item.name, price:item.price, restaurant_id:item.rid}});
    }

    removeFromCart(item:ICartItem){
      this.rx.dispatch({type:CartActions.REMOVE_FROM_CART,
      	payload:{pid:item.pid, name:item.name, price:item.price, restaurant_id:item.rid}});
    }

  updateQuantity(item){
    this.rx.dispatch({type:CartActions.UPDATE_QUANTITY,
      payload:{pid:item.pid, name:item.name, price:item.price, restaurant_id:item.rid, quantity:parseInt(item.quantity)}});
  }

	checkout(){
		let self = this;
		let orders = this.createOrders(this.cart);
		this.commerceServ.checkout(orders, self.user.id).subscribe(r=>{
			if(r){
				self.rx.dispatch({type:CartActions.CLEAR_CART, payload:{}})
			}
		})
	}

	clearCart(){
		this.rx.dispatch({type:CartActions.CLEAR_CART, payload:{}});
	}

	createOrders(cart:any){
		let items = cart.items;
		let restaurantSet = new Set(cart.items.map(x => x.restaurant_id));
		let restaurantIds = [...restaurantSet];
		let orders = [];

		for(let id of restaurantIds){
			orders.push({restaurant_id:id, items:[]})
		}

		for(let item of cart.items){
			for(let order of orders){
				if(item.restaurant_id == order.restaurant_id){
					order.items.push(item);
				}
			}
		}
		return orders;
	}

	ngOnDestroy(){
		this.subscription.unsubscribe();
		this.subscriptionAccount.unsubscribe();
	}





}
