import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { AuthService } from '../auth.service';
import { AccountActions, IAccount } from '../account.actions';

import { SharedService } from '../../shared/shared.service';

@Component({
  providers: [AuthService],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errMsg:string;
  form:FormGroup;

  constructor(private fb:FormBuilder, 
    private authServ:AuthService,
    private router:Router,
    private rx:NgRedux<IAccount>,
    private sharedServ:SharedService) { 

    this.form = this.fb.group({
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  ngOnInit() {
  	
  }
  
  ngOnDestroy(){
  
  }

  onSignup(){
    let self = this;
    let v = this.form.value;
    let type = (v.username.toLowerCase() === 'admin')? 'super':'user';

  	this.authServ.signup(v.username, v.email, v.password, type).subscribe(user=>{
      self.sharedServ.emitMsg({name:'updateLogin'});
      self.rx.dispatch({type:AccountActions.LOGIN, payload:user});
        if(user.type ==='super'){
          self.router.navigate(["admin"]);
        }else{
          self.router.navigate(['home']);
        }
      },
      err=>{
    		self.errMsg = 'Create Account Failed';
    	})
  }

}
