import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
@NgModule({
   imports:[
      CommonModule,
      FormsModule,
      RouterModule,
      HttpClientModule
   ],
   exports:[],
   declarations:[LoginComponent, SignupComponent, ChangePasswordComponent, ForgetPasswordComponent, ProfileFormComponent]
})
export class AccountModule { }
