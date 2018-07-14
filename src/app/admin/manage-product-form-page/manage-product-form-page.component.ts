import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { CommerceService } from '../../commerce/commerce.service';


@Component({
    selector: 'app-manage-product-form-page',
    templateUrl: './manage-product-form-page.component.html',
    styleUrls: ['./manage-product-form-page.component.scss']
})
export class ManageProductFormPageComponent implements OnInit {
    product: Product;

    constructor(private commerceSvc: CommerceService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        const self = this;

        self.route.params.subscribe((params: any) => {
            if (params.id) {
                this.commerceSvc.getProduct(params.id).subscribe(
                    (p: Product) => {
                        self.product = p;
                    });
            } else {
                self.product = new Product();
                //self.product.pictures = [{image:{index:0, data:'add_photo.png', file:''}}];
            }
        });
    }
}
