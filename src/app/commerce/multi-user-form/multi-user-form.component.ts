
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommerceService } from '../commerce.service';
import { AccountService } from '../../account/account.service';
import { NgRedux } from '@angular-redux/store';
import { IPicture } from '../commerce.actions';

@Component({
  selector: 'multi-user-form',
  templateUrl: './multi-user-form.component.html',
  styleUrls: ['./multi-user-form.component.scss']
})
export class MultiUserFormComponent implements OnInit {


	form:FormGroup = this.fb.group({items:this.fb.array([])});
    items:any = [];
    fields:string[] = ['', 'ID', 'Name', 'Description', 'Street', 'Postal Code'];
    nRows:number = 0;
    subscriptionPicture:any;
    pictures:any[] = [];
    changedPictures:any[]=[];
    @Input() users:any[];

	constructor(private rx:NgRedux<IPicture>, private fb:FormBuilder, 
		private accountSvc:AccountService, private commerceSvc:CommerceService) { }

	ngOnInit() {
		let self = this;
		self.accountSvc.getUserList('?type=business').subscribe(users=> {
        	self.users = users;
        	if(self.users){
				self.createForm(self.users);
			}
      	});

		if(this.users){
			this.createForm(this.users);
		}
		// self.commerceSvc.getRestaurantList().subscribe(
  //     		ps => {
		// 		self.restaurants = ps;
		// 		if(this.restaurants){
		// 			this.createForm(this.restaurants);
		// 		}
		// 	},
		// 	(err: any) => {
		// 		self.restaurants = [];
		// 		if(this.restaurants){
		// 			this.createForm(this.restaurants);
		// 		}
		// 	}
	 //    );
		
		// this.subscriptionPicture = this.rx.select<IPicture[]>('restaurant_pictures').subscribe(
		// 	changedPictures=>{
		// 		//self.user = account;
		// 		self.changedPictures = changedPictures;
		// 	})
	}

	ngOnDestroy(){
		// this.subscriptionPicture.unsubscribe();
	}
	
	ngOnChange(){
		if(this.users){
			this.createForm(this.users);
		}
	}

	createFormItem(){
		return this.fb.group({
			id: [''],
			username: ['', Validators.required],
			email: ['', Validators.required],
		    password: ''
		});
	}

	createForm(items){
		// items --- users 
		let nRows = items.length;
		let nRowExtras = 5;
		let self = this;

		if(nRows>0){
			this.nRows = nRows + 5
			this.generateRows(this.nRows);
			for(let i=0; i<nRows; i++){
				this.items.at(i).patchValue(items[i]);
		  	}

		  	//---------------------------------
		  	// Add Picture fields
		  	// for(let i=0; i<this.nRows; i++){
		  	// 	if(i<nRows && items[i].picture){
		  	// 		this.pictures.push(items[i].picture);
		  	// 	}else{
		  	// 		this.pictures.push({ id:0, name:'',
					// 	  description:'',
					// 	  index:0,
					// 	  image:{ 'data':'', 'file':'' },
					// 	  width:0,
					// 	  height:0,
					// 	  status:'empty'
					// 	})
		  	// 	}
		  	// }
		}else{
			this.nRows = 10;
			this.generateRows(this.nRows);
		}
	}


	generateRows(nRows:number){
		this.items = this.form.get('items') as FormArray;

		for(let i=0; i<nRows; i++){
			let fg:FormGroup = this.createFormItem();
	    	this.items.push(fg);
		}
	}

	save(){
		let a = [];
		for(let i=0; i<this.nRows; i++){
			let p = this.items.at(i).value;
			if(p.username){
				// p.pictures = this.changedPictures.filter(x=>x.product.id==p.id);
				a.push(p);
			}
		}

		this.commerceSvc.saveMultiUsers(a).subscribe(r=>{
			let k = r;
		})
	}

	toEditRestaurant(){

	}

	toViewRestaurant(){

	}

}
