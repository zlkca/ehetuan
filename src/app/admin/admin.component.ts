import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../account/auth.service';
import { AccountService } from '../account/account.service';
import { SharedService } from '../shared/shared.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { CommerceService } from '../commerce/commerce.service';
import { Restaurant } from '../commerce/commerce';
import { User } from '../account/account';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	isAdminLogin:boolean = true;
  restaurants:Restaurant[] = null;
  businessUsers:User[]= null;

  constructor(private router:Router, private sharedServ:SharedService, private accountSvc:AccountService,
    private commerceSvc:CommerceService, private authServ: AuthService) {
      let self = this;

      self.accountSvc.getUserList('?type=business').subscribe(users=> {
        self.businessUsers = users;
      });

      self.commerceSvc.getRestaurantList().subscribe((ps: Restaurant[]) => {
        self.restaurants = ps;
      });
  }

  ngOnInit() {
    let self = this;

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

  toPage(url:string){
    this.router.navigate([url]);
  }
}
