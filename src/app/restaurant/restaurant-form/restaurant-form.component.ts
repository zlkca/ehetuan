import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { CommerceService } from '../../commerce/commerce.service';
import { Restaurant, Category, Picture } from '../../commerce/commerce';
import { Address } from '../../account/account';
import { MultiImageUploaderComponent } from '../../shared/multi-image-uploader/multi-image-uploader.component';
import { environment } from '../../../environments/environment';

const APP = environment.APP;

@Component({
    selector: 'app-restaurant-form',
    templateUrl: './restaurant-form.component.html',
    styleUrls: ['./restaurant-form.component.scss']
})
export class RestaurantFormComponent implements OnInit {

    id: string = '';
    categoryList: Category[] = [];
    pictures: any[] = [];

    form: FormGroup;

    @Input() restaurant: Restaurant;
    @ViewChild(MultiImageUploaderComponent) uploader: any;

    createForm() {
        return this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', Validators.maxLength(750)],
            // street: ['', Validators.required],
            // postal_code:['', Validators.required]
            address: this.fb.group({
                street: ['', [Validators.required]],
                postal_code: ['', [Validators.required]]
            }),
            // categories: this.fb.array([]),
            // delivery_fee: ''
        });
    }

    constructor(private fb: FormBuilder, private commerceSvc: CommerceService,
        private router: Router, private route: ActivatedRoute) {
        this.form = this.createForm();
    }

    ngOnInit() {
        let self = this;

        this.form.patchValue(this.restaurant);
        //localStorage.setItem('restaurant_info-' + APP, JSON.stringify(self.restaurant));
        self.pictures = [{ index: 0, name: '', image: this.restaurant.image }];

        //self.route.params.subscribe((params:any)=>{
        // self.commerceServ.getRestaurant(params.id).subscribe(
        //     (r:Restaurant) => {
        //     	self.restaurant = r;
        //     	self.id = r.id;
        //         self.form.patchValue(r);
        //         self.street.patchValue(r.address.street);

        //         if(r.image && r.image.data){
        //         	self.pictures = [{index:0, name:"", image:r.image}];
        //         }else{
        //         	self.pictures = [];
        //         }

        //         self.commerceServ.getCategoryList().subscribe(catList=>{
        //       self.categoryList = catList;
        //       for(let cat of catList){
        //           let c = r.categories.find(x=> x.id==cat.id );
        //           if(c){
        //               self.categories.push(new FormControl(true));
        //           }else{
        //               self.categories.push(new FormControl(false));
        //           }
        //           //self.categories.push(new FormControl(s.id));
        //       }
        //   })
        //     },
        //     (err:any) => {
        //     });

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
        //});

        //create new
        // self.commerceServ.getCategoryList().subscribe(catList=>{
        //     self.categoryList = catList;
        //     for(let cat of catList){
        //         self.categories.push(new FormControl(false));
        //     }
        // });
    }


    save() {
        const self = this;
        const v = this.form.value;
        const m = new Restaurant(this.form.value);

        let addr = null;
        // hardcode Toronto as default
        if (self.restaurant && self.restaurant.address) {
            addr = self.restaurant.address;
            addr.street = v.address.street;
        } else {
            addr = new Address({
                id: '', city: 'Toronto',
                province: 'ON',
                street: v.address.street,
                postal_code: v.address.postal_code
            });
        }


        if (self.uploader) {
            m.image = self.uploader.data[0].image;
        }

        m.id = self.restaurant ? self.restaurant.id : null;

        const s = addr.street + ', Toronto, ' + v.address.postal_code;
        this.commerceSvc.getLocation(s).subscribe(ret => {
            addr.lat = ret.lat;
            addr.lng = ret.lng;
            addr.sub_locality = ret.sub_locality;
            addr.postal_code = ret.postal_code;
            m.address = addr;
            self.commerceSvc.saveRestaurant(m).subscribe((r: any) => {
                self.router.navigate(['admin']);
            });
        });

    }

    cancel() {
        const self = this;

        // const c = localStorage.getItem('restaurant_info-' + APP);
        // const r = JSON.parse(c);

        self.form.patchValue(this.restaurant);
        self.pictures = [{ index: 0, name: '', image: this.restaurant.image }];

        // localStorage.removeItem('restaurant_info-' + APP);

        self.router.navigate(['admin']);
    }
}
