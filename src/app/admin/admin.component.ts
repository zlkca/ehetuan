import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../account/auth.service';
import { AccountService } from '../account/account.service';
import { SharedService } from '../shared/shared.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ProductService } from '../product/product.service';
import { CommerceService } from '../commerce/commerce.service';
import { Restaurant } from '../commerce/commerce';
import { User } from '../account/account';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { Product } from '../commerce/commerce';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

    isAdminLogin = true;
    subscrAccount;
    account;

    // for business center
    orders = null;
    restaurant = null;
    products: Product[] = null;

    // for super admin
    businessUsers: User[] = null;
    restaurants: Restaurant[] = null;


    constructor(private router: Router,
        private sharedServ: SharedService,
        private accountSvc: AccountService,
        private productSvc: ProductService,
        private commerceSvc: CommerceService,
        private authServ: AuthService,
        ) {

        const self = this;
        this.subscrAccount = this.accountSvc.getCurrent().subscribe(account => {

            self.account = account;

            if (account.type === 'business') {
                const restaurant_id = account ? account.restaurant_id : null;

                if (restaurant_id) {
                    self.commerceSvc.getOrderList('?restaurant_id=' + restaurant_id).subscribe(
                        r => {
                            self.orders = r;
                        });
                    self.productSvc.getProductList('?restaurant_id=' + restaurant_id).subscribe(
                        (ps: Product[]) => {
                            self.products = ps;
                        });
                }

                self.commerceSvc.getRestaurantList('?admin_id=' + account.id).subscribe(r => {
                    if (r) {
                        self.restaurant = r[0];
                    }
                });


            } else if (account.type === 'super') {
                self.commerceSvc.getRestaurantList().subscribe((ps: Restaurant[]) => {
                    self.restaurants = ps;
                });
            }
        });

    }

    ngOnInit() {
        const self = this;

        // self.authServ.hasLoggedIn().subscribe(
        //   (r:boolean)=>{
        //     self.isLogin = r? true : false;

        //     if(self.isLogin){
        //       self.sharedServ.emitMsg({name:'OnUpdateHeader'});
        //       self.toPage("admin/users");
        //     }else{
        //       self.toPage("admin/login");
        //     }
        //   },(err:any)=>{
        //     self.toPage("admin/login");
        //   });
    }

    ngOnDestroy() {
        this.subscrAccount.unsubscribe();
    }

    toPage(url: string) {
        this.router.navigate([url]);
    }
}

