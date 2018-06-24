import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/auth.service';
import { SharedService } from '../shared.service';
import { CommerceService } from '../../commerce/commerce.service';
import { CategoryListComponent } from '../../commerce/category-list/category-list.component';

import {NgRedux} from '@angular-redux/store';
import {Subject} from 'rxjs';

import {AccountActions, IAccount} from '../../account/account.actions';

import { environment } from '../../../environments/environment';
declare var $: any;

const APP = environment.APP;

@Component({
    providers:[AuthService, CommerceService],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogin:boolean = false;
    user:any;
    keyword:string;
    term$ = new Subject<string>();
    locality = '';

    constructor(private router:Router, private authServ:AuthService, private commerceServ:CommerceService, 
        private sharedServ:SharedService, private ngRedux: NgRedux<IAccount>) {

        let self = this;

        // this.term$.debounceTime(800)
        //     .distinctUntilChanged()
        //     .subscribe((keyword:any) => {
        //         self.search(keyword);
        //     });


        let s = localStorage.getItem('location-'+APP);
        let addr = JSON.parse(s);
        if(addr){
            self.locality = addr.sub_locality;
        }
        
    }

    ngOnInit() {
        let self = this;
        this.sharedServ.getMsg().subscribe(msg => {
            if('OnUpdateHeader' === msg.name){
                if(msg && msg.locality){
                    self.locality = msg.locality;
                }else{
                    self.locality = '';
                }

                // self.authServ.hasLoggedIn().subscribe(
                //   (r)=>{
                //     self.isLogin = r;
                //   },(err)=>{
                //     self.isLogin = false;
                //   });
            }
        });

        // self.authServ.hasLoggedIn().subscribe(
        //   (r)=>{
        //     self.isLogin = r;
        //   },(err)=>{
        //     self.isLogin = false;
        //   });
    }

    search(keyword){
        let self = this;
        self.sharedServ.emitMsg({name:'OnSearch', query:{'keyword':keyword}})
    }

    closeNavMenu(){
      $('.navbar-collapse').removeClass('show');
    }

    toPage(url){
      this.closeNavMenu();
      this.router.navigate([url]);
    }

    changeAddress(){
        this.closeNavMenu();
        localStorage.removeItem('location-'+APP);
        this.router.navigate(['home']);
    }

    changeLanguage(code){
      this.closeNavMenu();
      //this.translateServ.use(code);
    }

    logout(){
        let self = this;
        let flag = self.isLogin;
        this.ngRedux.dispatch({type:AccountActions.LOGOUT});
        this.closeNavMenu();
        if(flag){
          self.authServ.logout();
          self.isLogin = false;
          this.router.navigate(['home'])
        }
    }

    toBusinessCenter(){
        // if login and user is business, redirect to business center, otherwise redirect to business signup
        let self = this;
        this.closeNavMenu();
        this.authServ.hasLoggedIn().subscribe(
            (r:any)=>{
                self.isLogin = r? true : false;
                if(self.isLogin){
                    //self.sharedServ.emitMsg({name:'OnUpdateHeader', type: r.type});
                    if(r.type=='business'){
                        self.router.navigate(['dashboard']);
                    }else{
                        self.authServ.logout();  
                        self.router.navigate(['institution-signup']);
                    }
                }else{
                    self.router.navigate(['institution-login']);
                }
            });
    }
}
