import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../account/auth.service';
import { SharedService } from '../../shared/shared.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
    providers: [AuthService],
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isLogin:boolean = false;
  
  constructor(private router:Router, private sharedServ:SharedService, private authServ: AuthService) {
  
  }

  ngOnInit() {
    let self = this;

    self.authServ.hasLoggedIn().subscribe(
      (r:boolean)=>{
        self.isLogin = r? true : false;

        if(self.isLogin){
          self.sharedServ.emitMsg({name:'OnUpdateHeader'});
          self.toPage("home");
        }else{
          self.toPage("login");
        }
      },(err:any)=>{
        self.toPage("login");
      });
  }

  toPage(url:string){
    this.router.navigate([url]);
  }
}
