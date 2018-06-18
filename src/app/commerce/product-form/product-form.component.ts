import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

import { CommerceService } from '../commerce.service';
import { Product, Category, Restaurant, Color, Picture } from '../commerce';
import { ImageUploaderComponent } from '../../shared/image-uploader/image-uploader.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    product:Product = new Product();
    categoryList:Category[] = [];
    restaurantList:Restaurant[] = [];
    // colorList:Color[] = [];
    id:string = '';
    pictures:Picture[] = [];

    @ViewChild(ImageUploaderComponent)
    uploader:any;

    form:FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        description: new FormControl('',[Validators.maxLength(980)]),
        // dimension: new FormControl(),
        price: new FormControl(),
        // categories: new FormArray([]),
        restaurant_id:new FormControl(),
        // color_id:new FormControl()
    });

    get name(){
        return this.form.get('name');
    }

    get description(){
        return this.form.get('description');
    }

    // get dimension(){
    //     return this.form.get('dimension');
    // }

    get price(){
        return this.form.get('price');
    }

    get categories(){
        return this.form.get('categories') as FormArray;
    }

    get restaurant_id(){
        return this.form.get('restaurant_id');
    }

    // get color_id(){
    //     return this.form.get('color_id');
    // }

    constructor(private commerceServ:CommerceService, private route: ActivatedRoute, private router:Router){}

    ngOnInit() {
        let self = this;



        self.commerceServ.getRestaurantList().subscribe(r=>{
            self.restaurantList = r;
        })

        // self.commerceServ.getColorList().subscribe(r=>{
        //     self.colorList = r;
        // })

        self.route.params.subscribe((params:any)=>{
            this.commerceServ.getProduct(params.id).subscribe(
                (p:Product) => {
                    self.id = p.id;
                    self.pictures = p.pictures;
                    self.form.patchValue(p);
                    self.form.patchValue({restaurant_id:p.restaurant.id});
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


                },
                (err:any) => {
                    // self.product = new Product();
                });
        });
    }

    onToggleCategory(c:FormControl){
        // let v = c.value;
        // if(c.value.checked){
        //     v.checked = false;
        // }else{
        //     v.checked = true;
        // }
        // c.patchValue(v);
    }

    onSelectRestaurant(id:string){
        //let obj = this.restaurantList.find( x => { return x.id == id });
        //this.restaurant.setValue(obj);
        // this.restaurant.patchValue(m);
        //this.restaurant.id;
    }

    onSelectColor(id:string){
        // let obj = this.colorList.find(x => {return x.id == id});
        // this.color.patchValue(obj);
        //this.color.patchValue({'id':id});
    }

    getCheckedCategories(){
        let cs = [];
        for(let i=0; i<this.categoryList.length; i++){
            let c = this.categoryList[i];
            if(this.categories.get(i.toString()).value){
                cs.push(c);
            }
        }
        return cs;
    }

    save() {
        let self = this;
        let newV = {...this.form.value, 
            id: self.id, 
            categories: [{id:1}],//self.getCheckedCategories(),
            restaurant: {id:self.restaurant_id.value},
            // color:{id:self.color_id.value},
            pictures: self.uploader.data
        };

        let c = new Product(newV);
        this.commerceServ.saveProduct(c).subscribe( (r:any) => {
            self.router.navigate(['admin/products']);
        });
    }

    // ngOnInit() {
    //     let self = this;
        
    //     self.commerceServ.getCategoryList().subscribe(
    //         (r:Category[]) => {
    //             self.categoryList = r;
    //         },
    //         (err:any) => {
    //             self.categoryList = [];
    //         });

    //     self.route.params.subscribe((params:any)=>{
    //         self.id = params.id;

    //         self.commerceServ.getImageDefaultTitle(1).subscribe((r)=>{
    //             self.defaultTitles = [r.name0, r.name1, r.name2, r.name3];

    //             if(params.id){
    //               self.commerceServ.getWechatGroup(params.id).subscribe(
    //                 (r:WechatGroup) => {
    //                     r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
    //                     self.wechatgroup = r
    //                 },
    //                 (err:any) => {
    //                     let r = new WechatGroup();
    //                     r.category = {'id':1};
    //                     r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
    //                     self.wechatgroup = r;
    //                 });
    //             }else{
    //                 let r = new WechatGroup();
    //                 r.category = {'id':1};
    //                 r.qrs = self.commerceServ.getWechatGroupQRs(r.qrs, self.defaultTitles);
    //                 self.wechatgroup = r;
    //             }

    //         },(err)=>{
              
    //         });


    //     });
    // }

    // save() {
    //     let self = this;
    //     self.wechatgroup.user = {'id':1, 'name':'admin'};
    //     self.wechatgroup.id = self.id;
    //     // self.wechatgroup.images = self.images;
    //     self.commerceServ.saveWechatGroup(self.wechatgroup).subscribe(
    //         (r:any) => {
    //             //self.wechatgroup = new WechatGroup(r.data[0]);
    //             self.router.navigate(["admin/wechatgroups"]);
    //         },
    //         (err:any) => {
    //             //self.wechatgroup = new WechatGroup();
    //             self.router.navigate(["admin/wechatgroups"]);
    //         });
    // }
    // onLoadImage(i:number){
    //   $('[name="image'+ i +'"]').click();
    // }

    // onDeleteImage(i:number){
    //     let qr = this.wechatgroup.qrs[i];//new QR();
    //     //qr.index = i;
    //     qr.image.data = this.emptyImage;
    //     qr.image.file = '';
    //     this.wechatgroup.qrs[i] = qr;
    // }

    // onImageChange(event:any, i:number){
    //     let self = this;
    //     let reader = new FileReader();
    //     if(event.target.files && event.target.files.length > 0) {
    //       let file = event.target.files[0];
    //       reader.readAsDataURL(file);
    //       reader.onload = () => {
    //           self.wechatgroup.qrs[i].image = {data: reader.result, file: event.target.files[0]};//.split(',')[1];
    //           //self.wechatgroup.logo = event.target.files[0];
    //       //   this.form.get('avatar').setValue({
    //       //     filename: file.name,
    //       //     filetype: file.type,
    //       //     value: reader.result.split(',')[1]
    //       //   })
    //       }
    //     }
    // }
}

