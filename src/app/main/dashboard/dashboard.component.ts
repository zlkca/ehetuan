import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAccount } from '../../account/account.actions';

import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	
  subscription:any;
  account:any;

  form:FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
	});

	get name(){
		return this.form.get('name');
	}

  constructor(private router:Router, private commerceServ:CommerceService, private ngRedux:NgRedux<IAccount>) { 
    let self = this;
    this.subscription = ngRedux.select<IAccount>('account').subscribe(
      account => {
        self.account = account;
      });
  }

  ngOnInit() {
    let self = this;
    //self.commerceServ.getOrderList().subscribe(r=)
  }

  submit(){

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  // toPage(url){
  //   this.router.navigate(['dashboard/'+url, {id:this.account.restaurant_id}]);
  // }
}
