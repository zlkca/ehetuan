import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';


import { HomeComponent } from './main/home/home.component';
// import { ContactComponent } from './main/contact/contact.component';
import { LoginComponent } from './account/login/login.component';
// import { SignupComponent } from './users/signup/signup.component';
// import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';
// import { ProductListComponent } from './products/product-list/product-list.component';
// import { ShoppingCartComponent } from './products/shopping-cart/shopping-cart.component';
// import { ProfileComponent } from './users/profile/profile.component';
// import { ProfileEditComponent } from './users/profile-edit/profile-edit.component';
// import { ChangePasswordComponent } from './users/change-password/change-password.component';
// import { PaymentComponent } from './products/payment/payment.component';
//import { AdminLoginComponent } from './admin/main/login/login.component';

import { RestaurantGridComponent } from './main/restaurant-grid/restaurant-grid.component';
import { ProductListComponent } from './commerce/product-list/product-list.component';
import { ProductComponent } from './main/product/product.component';
import { RestaurantComponent } from './main/restaurant/restaurant.component';

import { CoreModule }    from './core/core.module';

// import { MainModule } from './main/main.module';
// import { ProductsModule } from './products/products.module';
import { AccountModule } from './account/account.module';
import { MainModule }    from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { CommerceModule } from './commerce/commerce.module';
//import { AdminModule } from './admin/admin.module';
import { LayoutComponent } from './main/layout/layout.component';


//import { MsgService } from './main/shared/main.service';

const appRoutes: Routes = [
  // { path: 'login', component:LoginComponent },
  // { path: 'signup', component:SignupComponent },
  // { path: 'contact-us', component:ContactComponent },
  // { path: 'product-list', component:ProductListComponent },
  // { path: 'product/:id', component:ProductDetailComponent },
  // { path: 'shopping-cart', component:ShoppingCartComponent },
  // { path: 'forget-password', component:ForgetPasswordComponent },
  // { path: 'profiles', component:ProfileComponent },
  // { path: 'profile-edit', component:ProfileEditComponent },
  // { path: 'change-password', component:ChangePasswordComponent },
  // { path: 'payment', component:PaymentComponent },
  // { path: '', component:HomeComponent }
  //{ path: 'admin/login', component:AdminLoginComponent },

  // { path: '', component:LayoutComponent,
  //     children:[
  //       { path: 'products', component:ProductListComponent },
  //       //{ path: 'product/:id', component:ProductComponent },
  //       { path: 'login', component:LoginComponent },
  //       { path: 'home', component:HomeComponent }
  //     ]
  // }
        { path: 'restaurants', component:RestaurantGridComponent },
        { path: 'restaurant/:id', component:RestaurantComponent },
        { path: 'products', component:ProductListComponent },
        { path: 'product/:id', component:ProductComponent },
        { path: 'login', component:LoginComponent },
        { path: 'home', component:HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot(),
    NgReduxModule,
    SharedModule,
    AccountModule,
    CommerceModule,
    MainModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  //providers: [MsgService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
