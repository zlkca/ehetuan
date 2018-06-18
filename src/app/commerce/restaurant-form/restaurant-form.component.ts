import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommerceService } from '../commerce.service';
import { Restaurant, Category, Picture } from '../commerce';
import { City, Province, Address } from '../../account/account';
import { ImageUploaderComponent } from '../../shared/image-uploader/image-uploader.component';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {
	restaurant:Restaurant;
	id:string = '';
	categoryList:Category[] = [];
	cityList:City[] = [new City({id:'5130', name:'Toronto', province:{id:'48'}})];
	provinceList:Province[] = [new Province({id:'48', name:'Ontario'})];
	pictures:any[] = [];

	// addressForm:FormGroup = new FormGroup({
	// 	street: new FormControl(),
	// 	province_id:new FormControl(),
 //        city_id:new FormControl(),
 //        postal_code: new FormControl()
	// })
	@ViewChild(ImageUploaderComponent)
    uploader:any;

	form:FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		description: new FormControl('',[Validators.maxLength(750)]),
		//categories: new FormArray([]),
		// address: this.addressForm
		street: new FormControl(),
		postal_code: new FormControl()
	});

	get name(){
		return this.form.get('name');
	}

	get description(){
		return this.form.get('description');
	}

	get categories(){
		return this.form.get('categories') as FormArray;
	}

	get street(){
		return this.form.get('street');
	}

	get postal_code(){
		return this.form.get('postal_code');
	}

	get province_id(){
		return this.form.get('province_id');
	}


	// createForm(){
	// 	this.restaurantForm = this.fb.group({
	// 		name: ['', [Validators.required, Validators.minLength(3)]],
	// 		description: ['', Validators.maxLength(750)],
	// 		address: this.fb.group({
	// 			street:['',[Validators.required]],
	// 			postal_code:['', [Validators.required]]
	// 		}),
	// 		categories: this.fb.array([]),
	// 		delivery_fee: ''
	// 	});
	// }

	get city_id(){
		return this.form.get('city_id');
	}

	constructor(private commerceServ:CommerceService, private router:Router, private route:ActivatedRoute) { }

	ngOnInit() {
		let self = this;
        self.route.params.subscribe((params:any)=>{
            self.commerceServ.getRestaurant(params.id).subscribe(
                (r:Restaurant) => {
                	self.restaurant = r;
                	self.id = r.id;
                    self.form.patchValue(r);
                    self.street.patchValue(r.address.street);
                    
                    if(r.image && r.image.data){
                    	self.pictures = [{index:0, name:"", image:r.image}];
                    }else{
                    	self.pictures = [];
                    }
                    
                    self.commerceServ.getCategoryList().subscribe(catList=>{
		                self.categoryList = catList;
		                for(let cat of catList){
		                    let c = r.categories.find(x=> x.id==cat.id );
		                    if(c){
		                        self.categories.push(new FormControl(true));
		                    }else{
		                        self.categories.push(new FormControl(false));
		                    } 
		                    //self.categories.push(new FormControl(s.id));      
		                }
		            })
                },
                (err:any) => {
                });



            // self.commerceServ.getCategoryList().subscribe(catList=>{
            //     self.categoryList = catList;
            //     for(let cat of catList){
            //         let c = p.categories.find(x=> x.id==cat.id );
            //         if(c){
            //             self.categories.push(new FormControl(true));
            //         }else{
            //             self.categories.push(new FormControl(false));
            //         } 
            //         //self.categories.push(new FormControl(s.id));      
            //     }
            // })

            // self.commerceServ.getCategoryList().subscribe(catList=>{
            //     self.categoryList = catList;
            //     for(let cat of catList){
            //         let c = p.categories.find(x=> x.id==cat.id );
            //         if(c){
            //             self.categories.push(new FormControl(true));
            //         }else{
            //             self.categories.push(new FormControl(false));
            //         } 
            //         //self.categories.push(new FormControl(s.id));      
            //     }
            // })
        });

        //create new
        self.commerceServ.getCategoryList().subscribe(catList=>{
            self.categoryList = catList;
            for(let cat of catList){
                self.categories.push(new FormControl(false));    
            }
        });

        self.form.patchValue({province_id:'48', city_id:'5130'});
	}
      
	save(){
		let self = this;
		let v = this.form.value;
		let picture = self.uploader.data[0]
		let addr = null;
		// hardcode Toronto as default
		if(self.restaurant && self.restaurant.address){
			addr = self.restaurant.address;
			addr.street = v.address.street;
		}else{
			addr = new Address({id:'', city:{id:5130}, province:{id:48}, street:v.address.street});
		}
		let m = new Restaurant(this.form.value);
		
		m.image = picture.image;
		m.id = self.id;

		// to fix
		//let s = addr.street + ', ' + addr.city.name + ', ' + addr.province.name;
		let s = addr.street + ', Toronto, ' + v.address.postal_code;
		this.commerceServ.getLocation(s).subscribe(ret=>{
			addr.lat = ret.lat;
			addr.lng = ret.lng;
			addr.sub_locality = ret.sub_locality;
			addr.postal_code = ret.postal_code;
			m.address = addr;
			self.commerceServ.saveRestaurant(m).subscribe( (r:any) => {
				self.router.navigate(['admin/restaurants']);
			});
		})

	}
}
