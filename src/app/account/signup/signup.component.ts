import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  providers: [AuthService],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private userType:string = 'guest';
  private subscription:any;
  private eid:any;
  private gender:string;

  public username:string;
  public email:string;
  public password:string;
  public rePassword:string;
  public errMsg:string;

  constructor(private route:ActivatedRoute, private authServ:AuthService, private router:Router) { 

  }

  ngOnInit() {
  	let self = this;
    this.subscription = this.route.params.subscribe(params => {
  		self.eid = params['eid'];
  		self.userType = 'guest';
  	})
  }
  
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }

  onSignup(){
    let self = this;
  	this.authServ.signup(this.username, this.email, this.password)//, this.userType, this.gender, '', '', '')
      .subscribe(function(user){
    		let s = user;
        self.router.navigate(["/login"]);
    	}, function(err){
    		let e = err;
    	})
  }

  onInputChange(event){

  }
}
