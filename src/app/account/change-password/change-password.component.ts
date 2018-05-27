import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../account';
import { AuthService } from '../auth.service';

@Component({
    providers: [AuthService],
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    password: any;
    newPassword: any;
    confirmPassword: any;
    errMsg = '';
    user: User = new User();

    constructor(private authServ:AuthService, private router:Router) { }

    ngOnInit() {
        let self = this;
        // self.user = self.authServ.getUserStorage();
    }

    changePassword(form: NgForm) {
        let self = this;
        if (form.valid) {
            // if(self.newPsw != self.conNewPsw){
            //     self.errMsg = "NEW_PASSWORD_DIFF";
            // }else{                      
            //     self.authServ.changePassword(self.user.id, self.password, self.newPsw).subscribe(
            //         function(msg){
            //             if(msg.length==0){
            //                 self.router.navigate(['/profiles'])
            //             }else{
            //                 self.errMsg = "INVALID_PASSOWRD";
            //             }
            //         }, 
            //         function(error){
            //             console.error('An error occurred', error);
            //         }
            //     );                                
            // }
        }else{
            self.errMsg = "INVALID_PASSOWRD";
        }  
    }
    
    updateAccount() {
    
    }
    
    updatePassword(){

    }
}
