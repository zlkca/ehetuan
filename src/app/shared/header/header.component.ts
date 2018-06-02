import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../account/auth.service';
import { SharedService } from '../shared.service';
import { CommerceService } from '../../commerce/commerce.service';
import { CategoryListComponent } from '../../commerce/category-list/category-list.component';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
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

    constructor(private router:Router, private authServ:AuthService, private commerceServ:CommerceService, 
        private sharedServ:SharedService) {

        let self = this;

        // this.term$.debounceTime(800)
        //     .distinctUntilChanged()
        //     .subscribe((keyword:any) => {
        //         self.search(keyword);
        //     });
    }

    ngOnInit() {
        let self = this;
        // this.sharedServ.getMsg().subscribe(msg => {
        //     if('OnUpdateHeader' === msg.name){
        //         self.authServ.hasLoggedIn().subscribe(
        //           (r)=>{
        //             self.isLogin = r;
        //           },(err)=>{
        //             self.isLogin = false;
        //           });
        //     }
        // });

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

        this.closeNavMenu();
        if(flag){
          self.authServ.logout();
          self.isLogin = false;
          this.router.navigate(['home'])
        }
    }
}
