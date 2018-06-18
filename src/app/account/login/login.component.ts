import { Component, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAccount } from '../account.actions';

import { User } from '../account';
import { AuthService } from '../auth.service';
import { SharedService } from '../../shared/shared.service';
import { AccountActions } from '../account.actions';


@Component({
  providers: [AuthService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user = new User();
  public account = '';
  public password = '';

  subscription:any;
  token = '';
  errMsg = '';
  auth2:any;

  constructor(public authServ:AuthService, private router:Router, private sharedServ:SharedService,
    private ngRedux: NgRedux<IAccount>) {

  }

  ngOnInit() {
    // let self = this;

    // self.authServ.getUser({'email':r.email}).subscribe(
    //   (user:any)=>{
    //     if(user){
    //       self.authServ.setLogin(user);
    //       self.pageServ.emitMsg({name:'OnUpdateHeader'});
    //       self.user = user;
    //       self.toHome();
    //     }else{

    //       self.authServ.signup(r.username, r.email, '', 'member', 'm', r.firstname, r.lastname, r.portrait)
    //         .subscribe(function(user){
    //           self.authServ.setLogin(user);
    //           self.msgServ.emit({name:'OnUpdateHeader'});
    //           self.user = user;
    //           self.toHome();
    //         }, function(err){
    //           let e = err;
    //         })
    //     }
    //   },
    //   (error:any)=>{

    //   });
    //   }

  }

  ngOnDestroy(){
    // if(this.subscription){
    //   this.subscription.unsubscribe();
    // }
  }

  onLogin(form: NgForm) {
    let self = this;
    
    if (form.valid) {
      this.subscription = this.authServ.login(self.account, self.password).subscribe(
          (user:any) => {
              if(user && user.username){
                  //self.sharedServ.emitMsg({name:'OnUpdateHeader'});
                  this.ngRedux.dispatch({type:AccountActions.LOGIN, payload:user});
                  self.user = user;
                  if(user.type=='business'){
                    self.router.navigate(['dashboard']);
                  }else{
                    self.router.navigate(['home']);
                  }
                  
              }else{
                self.errMsg = "INVALID_ACCOUNT_OR_PASSOWRD";          
              }
          }, 
          (error) => {
            console.error('An error occurred', error);
          });
      }else{
        self.errMsg = "INVALID_ACCOUNT_OR_PASSOWRD";
      }
  }


  onForgetPassword(){
    // this.router.navigate(["/forget-password"]);;
    // return false;
  }

  onChangeAccount(){
    this.errMsg = "";
  }

  onChangePassword(){
    this.errMsg = "";
  }


  toPage(page:string){
    this.router.navigate([page]);
  }

}

