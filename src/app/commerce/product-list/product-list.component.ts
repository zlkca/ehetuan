import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../commerce.service';
import { Product } from '../commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from '../cart/cart.actions';


@Component({
    providers:[CommerceService],
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    productList:Product[] = [];
    MEDIA_URL:string = environment.MEDIA_URL;
    subscription:any;
    cart:any;

    @Input() data: Product[];

    ngOnInit(){
        // let self = this;
        // this.commerceServ.getProductList().subscribe(
        //     (r:Product[]) => {
        //         self.productList = r;
        //     },
        //     (err:any) => {
        //         self.productList = [];
        //     });
    }

    constructor(private commerceServ:CommerceService, 
        private router:Router,
        private ngRedux:NgRedux<IAppState>//,
        // private actions: CartActions
        ) {

        // this.subscription = ngRedux.select<ICart>('cart').subscribe(
        //   cart=> this.cart = cart);
    }

    toDetail(p){
        this.router.navigate(["product/"+p.id]);
    }

    addToCart(p){
      this.ngRedux.dispatch({type:CartActions.ADD_TO_CART, payload:
          {pid:p.id, name:p.name, price:p.price, restaurant_id:p.restaurant.id}});
    }

    removeFromCart(p){
      this.ngRedux.dispatch({type:CartActions.REMOVE_FROM_CART, payload:{pid:p.id, name:p.name, price:p.price, restaurant_id:p.restaurant.id}});
    }


}

