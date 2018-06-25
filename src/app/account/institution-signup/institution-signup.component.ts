import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAccount, AccountActions } from '../account.actions';
import { AuthService } from '../auth.service';
import { ImageUploaderComponent } from '../../shared/image-uploader/image-uploader.component';

@Component({
  selector: 'app-institution-signup',
  templateUrl: './institution-signup.component.html',
  styleUrls: ['./institution-signup.component.scss']
})
export class InstitutionSignupComponent implements OnInit {
  errMsg:string;
  formGroup:FormGroup;
  address:any;
  picture:any = {image:{data:'', file:''}};
  @ViewChild(ImageUploaderComponent)
  uploader:any;

  constructor(private fb:FormBuilder, private authServ:AuthService, 
    private rx:NgRedux<IAccount>, private router:Router) {

    this.formGroup = this.fb.group({
      username:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      restaurant:['', Validators.required],
      //address:[''],
      phone:['']
    });
  }

  ngOnInit() {

  }

  setAddr(obj){
  	this.address = obj.addr;
  	let sAddr = obj.sAddr;

  }

  onSignup(){
    let v = this.formGroup.value;
    let self = this;
    let pic = {image:''};

    if(self.uploader.pic){
      pic = self.uploader.pic;  
    }
    
        // institutionSignup(username: string, email: string, password: string, 
        // addr:any=null, restaurant:string, phone:string, image:any){
 
    this.authServ.institutionSignup(v.username, v.email, v.password,
      this.address, v.restaurant, v.phone, pic.image ).subscribe((r:any)=>{
        if(r.token){
          self.rx.dispatch({type:AccountActions.LOGIN, payload:r.user}); //r.error
          self.router.navigate(["/dashboard"]);
        }else{
          self.errMsg = 'Error:' + r.errors[0];
        }
        
      }, function(err){
        self.errMsg = err;
      });
  }

      
  save(){
    // let self = this;
    // let v = this.form.value;
    // let picture = self.uploader.data[0]
    // let addr = null;
    // // hardcode Toronto as default
    // if(self.restaurant && self.restaurant.address){
    //   addr = self.restaurant.address;
    //   addr.street = v.address.street;
    // }else{
    //   addr = new Address({id:'', city:{id:5130}, province:{id:48}, street:v.address.street});
    // }
    // let m = new Restaurant(this.form.value);
    
    // m.image = picture.image;
    // m.id = self.id;

    // // to fix
    // //let s = addr.street + ', ' + addr.city.name + ', ' + addr.province.name;
    // let s = addr.street + ', Toronto, ' + v.address.postal_code;
    // this.commerceServ.getLocation(s).subscribe(ret=>{
    //   addr.lat = ret.lat;
    //   addr.lng = ret.lng;
    //   addr.sub_locality = ret.sub_locality;
    //   addr.postal_code = ret.postal_code;
    //   m.address = addr;
    //   self.commerceServ.saveRestaurant(m).subscribe( (r:any) => {
    //     self.router.navigate(['admin/restaurants']);
    //   });
    // })

  }

}
