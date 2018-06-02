import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './account/auth.service';
import { SharedService } from './shared/shared.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { environment } from '../environments/environment';

const APP = environment.APP;

@Component({
  providers: [AuthService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  isLogin:boolean = false;
  constructor(private router:Router, private sharedServ:SharedService, private authServ: AuthService){
    
    window.addEventListener("orientationchange", function() {
        window.location.reload();
    }, false);
  }

  ngOnInit() {
    let self = this;

    let s = localStorage.getItem('location-'+APP);
    if(s){
      self.toPage('home');
    }else{
      self.toPage('restaurants');
    }
    // self.authServ.hasLoggedIn().subscribe(
    //   (r:boolean)=>{
    //     self.isLogin = r? true : false;

    //     if(self.isLogin){
    //       self.sharedServ.emitMsg({name:'OnUpdateHeader'});
    //       self.toPage("home");
    //     }else{
    //       self.toPage("login");
    //     }
    //   },(err:any)=>{
    //     self.toPage("login");
    //   });
  }

  toPage(url:string){
    this.router.navigate([url]);
  }
}
