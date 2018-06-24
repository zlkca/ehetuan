import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAccount } from '../../account/account.actions';

import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Product } from '../../commerce/commerce';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	
  subscription:any;
  account:any;
  orders:any = [];
  products:Product[] = [];
  productGridMode:string = 'edit';
  restaurant:any;

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
        let restaurant_id = account.restaurant_id;
        
        if(restaurant_id){
          let query = '?restaurant_id=' + restaurant_id;
          self.commerceServ.getOrderList(query).subscribe(r=>{
            self.orders = r;
          });

          self.commerceServ.getRestaurantList('?admin_id=' + account.id).subscribe(r=>{
            if(r){
              self.restaurant = r[0];
            }
            
          })

          self.commerceServ.getProductList("?restaurant_id="+restaurant_id).subscribe(
              (ps:Product[]) => {
                  self.products = ps;
              },
              (err:any) => {
                  self.products = [];
              }
            );

        }
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
