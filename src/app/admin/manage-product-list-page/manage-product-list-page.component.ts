import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from '../../commerce/commerce.actions';
import { CommerceService } from '../../commerce/commerce.service';


@Component({
    selector: 'app-manage-product-list-page',
    templateUrl: './manage-product-list-page.component.html',
    styleUrls: ['./manage-product-list-page.component.scss']
})
export class ManageProductListPageComponent implements OnInit {
    products: Product[];
    constructor(private route: ActivatedRoute,
        private commerceSvc: CommerceService,
        private rx: NgRedux<IAppState>) {
        const self = this;

        this.route.params.subscribe(params => {
            const restaurant_id = params['id'];
            self.commerceSvc.getProductList('?restaurant_id=' + restaurant_id).subscribe(
                (ps: Product[]) => {
                    self.products = ps;
                });
        });
    }

    ngOnInit() {
    }

}
