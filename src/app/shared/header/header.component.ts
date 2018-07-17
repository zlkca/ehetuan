import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/auth.service';
import { SharedService } from '../shared.service';
import { CategoryListComponent } from '../../commerce/category-list/category-list.component';

import { environment } from '../../../environments/environment';
import { LocationService } from '../location/location.service';
import { ILocation } from '../location/location.model';
import { AccountService } from '../../account/account.service';
import { Account } from '../lb-sdk';
declare var $: any;

const APP = environment.APP;

@Component({
    providers: [AuthService, LocationService],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogin: boolean = false;
    menu: any[];
    user: any;
    keyword: string;
    locality = '';
    unsubscribeAccount: any;

    constructor(private router: Router, private authSvc: AuthService,
        private locationSvc: LocationService,
        private accountServ: AccountService,
        private sharedSvc: SharedService) {

        let self = this;


    }

    ngOnDestroy() {
        this.unsubscribeAccount();
    }

    ngOnInit() {
        this.accountServ.getCurrent().subscribe(
            (account: Account) => {
                if (account && account.id) {
                    this.user = account;
                    this.isLogin = true;
                } else {
                    this.user = null;
                    this.isLogin = false;
                }

            });

        this.locationSvc.get().subscribe((addr: ILocation) => {
            this.locality = addr && (addr.sub_locality || addr.city);
        });

        // self.authServ.hasLoggedIn().subscribe(
        //   (r)=>{
        //     self.isLogin = r;
        //   },(err)=>{
        //     self.isLogin = false;
        //   });
    }

    search(keyword) {
        const self = this;
        self.sharedSvc.emitMsg({ name: 'OnSearch', query: { 'keyword': keyword } })
    }

    closeNavMenu() {
        $('.navbar-collapse').removeClass('show');
    }

    toPage(url) {
        this.closeNavMenu();
        this.router.navigate([url]);
    }

    initMenu() {
        this.menu = [];
        if (this.user && this.user.type === 'super') {
            this.menu.push({ text: 'Home', route: 'admin' });
        } else if (this.user && this.user.type === 'business') {
            this.menu.push({ text: 'Home', route: 'dashboard' });
        } else {
            this.menu.push({ text: 'Home', route: 'home' });
        }
    }

    changeAddress() {
        this.closeNavMenu();
        this.locationSvc.clear();
        // this.router.navigate(['home']);
    }

    changeLanguage(code) {
        this.closeNavMenu();
        //this.translateServ.use(code);
    }

    logout() {
        this.accountServ.logout()
            .subscribe((sad: any) => {
                console.log(sad);
                this.user = null;
                this.isLogin = false;
                this.router.navigate(['restaurants']);
            });
    }

    toHome() {
        // if (this.user) {
        // if (this.user.type === 'super') {
        //     this.router.navigate(['admin']);
        // } else if (this.user.type === 'business') {
        //     this.router.navigate(['dashboard']);
        // } else {
        const location = localStorage.getItem('location-' + APP);
        if (location) {
            this.router.navigate(['restaurants']);
        } else {
            this.router.navigate(['home']);
        }
        // }
        // }
    }

    toBusinessCenter() {
        // if login and user is business, redirect to business center, otherwise redirect to business signup
        const self = this;
        this.closeNavMenu();

        // check from token
        this.authSvc.hasLoggedIn().subscribe(
            (r: any) => {
                self.isLogin = r ? true : false;
                if (self.isLogin) {
                    if (r.type === 'business') {
                        self.router.navigate(['admin']);
                    } else {
                        self.authSvc.logout();
                        self.router.navigate(['institution-signup']);
                    }
                } else {
                    self.router.navigate(['institution-login']);
                }
            });
    }
}
