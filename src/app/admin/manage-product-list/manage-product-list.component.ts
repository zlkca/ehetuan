import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../commerce/commerce';
import { environment } from '../../../environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store';
import { ICart, CartActions } from '../../commerce/commerce.actions';
import { CommerceService } from '../../commerce/commerce.service';


const ADD_IMAGE = 'add_photo.png';
const MEDIA_URL: string = environment.MEDIA_URL;

@Component({
    selector: 'app-manage-product-list',
    templateUrl: './manage-product-list.component.html',
    styleUrls: ['./manage-product-list.component.scss']
})
export class ManageProductListComponent implements OnInit {
    subscription: any;
    @Input() products;
    ngOnInit() {

    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private commerceSvc: CommerceService,
        private rx: NgRedux<IAppState>) {
        const self = this;

    }

    onClick(p) {
        // if (this.mode === 'edit') {

        // } else {
        //     this.router.navigate(["product/" + p.id]);
        // }
    }

    change(p: Product) {
        this.router.navigate(['admin/products/' + p.id]);
    }

    getImageSrc(p) {
        if (p.fpath) {
            return MEDIA_URL + p.fpath;
        } else {
            return MEDIA_URL + ADD_IMAGE;
        }
    }

}

