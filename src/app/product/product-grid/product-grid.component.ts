import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Product } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState } from '../../store';
import { ICart, CartActions } from '../../commerce/commerce.actions';
import { ProductComponent } from '../../main/product/product.component';

const ADD_IMAGE = 'add_photo.png';

@Component({
	providers:[CommerceService],
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent implements OnInit {
	productList:Product[] = [];
    MEDIA_URL:string = environment.MEDIA_URL;
    subscription:any;
    cart:any;

    @Input() data: Product[];
    @Input() mode: string;

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
				private modalService: NgbModal,
        private ngRedux:NgRedux<IAppState>//,
        // private actions: CartActions
        ) {

        // this.subscription = ngRedux.select<ICart>('cart').subscribe(
        //   cart=> this.cart = cart);
    }

    onClick(p){
        if(this.mode == 'edit'){

        }else{
					// const modalRef = this.modalService.open(ProductComponent);
          this.router.navigate(["product/"+p.id]);
        }
    }

    addToCart(p){
      this.ngRedux.dispatch({type:CartActions.ADD_TO_CART, payload:
          {pid:p.id, name:p.name, price:p.price, restaurant_id:p.restaurant.id}});
    }

    removeFromCart(p){
      this.ngRedux.dispatch({type:CartActions.REMOVE_FROM_CART, payload:{pid:p.id, name:p.name, price:p.price, restaurant_id:p.restaurant.id}});
    }

    getImageSrc(p){
        if(p.fpath){
            return this.MEDIA_URL + p.fpath;
        }else{
            return this.MEDIA_URL + ADD_IMAGE;
        }
    }

}
