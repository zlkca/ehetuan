import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
    selector: 'app-admin-business-user-form',
    templateUrl: './admin-business-user-form.component.html',
    styleUrls: ['./admin-business-user-form.component.scss']
})
export class AdminBusinessUserFormComponent implements OnInit {
    @Input() user;
    errMsg: string;
    form: FormGroup;

    constructor(private fb: FormBuilder,
        // private authServ:AuthService,
        private router: Router,
        private sharedServ: SharedService) {

        this.form = this.fb.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.form.patchValue({
            username: this.user.username,
            email: this.user.email,
            password: this.user.password
        });
    }

    onSubmit() {
        const self = this;
        let v = this.form.value;
        let type = (v.username.toLowerCase() === 'admin') ? 'super' : 'user';

        // this.authServ.signup(v.username, v.email, v.password, type).subscribe(user=>{
        //   self.sharedServ.emitMsg({name:'updateLogin'});
        //   self.rx.dispatch({type:AccountActions.LOGIN, payload:user});
        //     if(user.type ==='super'){
        //       self.router.navigate(["admin"]);
        //     }else{
        //       self.router.navigate(['home']);
        //     }
        //   },
        //   err=>{
        // 		self.errMsg = 'Create Account Failed';
        // 	})
    }

}


