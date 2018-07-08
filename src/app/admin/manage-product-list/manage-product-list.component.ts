import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from '../../commerce/commerce.actions';


const ADD_IMAGE = 'add_photo.png';
const MEDIA_URL:string = environment.MEDIA_URL;

@Component({
  selector: 'manage-product-list',
  templateUrl: './manage-product-list.component.html',
  styleUrls: ['./manage-product-list.component.scss']
})
export class ManageProductListComponent implements OnInit {
    productList:Product[] = [];
    subscription:any;
    cart:any;

    @Input() products: Product[];
    @Input() mode: string;

    ngOnInit(){
        
    }

    constructor(
        private router:Router,
        private ngRedux:NgRedux<IAppState>) {

    }

    onClick(p){
        if(this.mode == 'edit'){

        }else{
            this.router.navigate(["product/"+p.id]);
        }
    }

    getImageSrc(p){
        if(p.fpath){
            return MEDIA_URL + p.fpath;
        }else{
            return MEDIA_URL + ADD_IMAGE;
        }
    }

}

