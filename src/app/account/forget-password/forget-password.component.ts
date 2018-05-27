import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
	providers: [AuthService],
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
	public email:string = '';
	public errMsg:string = '';
	
	constructor(private authServ:AuthService, private router:Router) { }

	ngOnInit() {
	}

	onTempPassword(){
	    let self = this;
	      
	    // this.authServ.forgetPassword(self.email).subscribe(
	    //     function(rsp){
	    //         self.router.navigate(["/login"]);
	    //     }, function(error){
	    //       console.error('An error occurred', error);
	    //       //return Observable.throw(error.message || error);
	    //     });
	  }

}
