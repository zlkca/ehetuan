import { Component, Output, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAccount } from '../account.actions';

import { User } from '../account';
import { AuthService } from '../auth.service';
import { SharedService } from '../../shared/shared.service';
import { AccountActions } from '../account.actions';

@Component({
  selector: 'app-institution-login',
  templateUrl: './institution-login.component.html',
  styleUrls: ['./institution-login.component.scss']
})
export class InstitutionLoginComponent implements OnInit {

  errMsg = '';
  form:FormGroup;

  constructor(
    private fb:FormBuilder,
    private authServ:AuthService, 
    private router:Router, 
    private sharedServ:SharedService,
    private ngRedux: NgRedux<IAccount>) {

    this.form = this.fb.group({
      account:['', Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit() {}

  onLogin() {
    let self = this;
    let v = this.form.value;
    // if (this.form.valid) {
      this.authServ.login(v.account, v.password).subscribe(
          (user:any) => {
              if(user && user.username){
                  //self.sharedServ.emitMsg({name:'OnUpdateHeader'});
                  this.ngRedux.dispatch({type:AccountActions.LOGIN, payload:user});

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
      // }else{
      //   self.errMsg = "INVALID_ACCOUNT_OR_PASSOWRD";
      // }
  }


  onForgetPassword(){
    // this.router.navigate(["/forget-password"]);;
    // return false;
  }

  toPage(page:string){
    this.router.navigate([page]);
  }
}
