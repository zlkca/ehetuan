import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../commerce.service';
import { Product } from '../commerce';
import { environment } from '../../../environments/environment';
@Component({
    providers:[CommerceService],
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    productList:Product[] = [];
    MEDIA_URL:string = environment.MEDIA_URL;
    //_data:any;
  
    // @Input()
    // set data(d:any){
    //     this._data = d;
    // }
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

    constructor(private commerceServ:CommerceService, private router:Router) {

    }

    toDetail(p){
        this.router.navigate(["product/"+p.id]);
    }

}

