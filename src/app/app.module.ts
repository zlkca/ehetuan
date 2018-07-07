import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { rootReducer, IAppState, INITIAL_STATE } from './store';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';


import { HomeComponent } from './main/home/home.component';
// import { ContactComponent } from './main/contact/contact.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { InstitutionSignupComponent } from './account/institution-signup/institution-signup.component';
import { InstitutionLoginComponent } from './account/institution-login/institution-login.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';

import { OrderListComponent } from './commerce/order-list/order-list.component';

// import { ProfileComponent } from './users/profile/profile.component';
// import { ProfileEditComponent } from './users/profile-edit/profile-edit.component';
// import { ChangePasswordComponent } from './users/change-password/change-password.component';
// import { PaymentComponent } from './products/payment/payment.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

import { RestaurantFormComponent } from './commerce/restaurant-form/restaurant-form.component';

import { RestaurantGridComponent } from './main/restaurant-grid/restaurant-grid.component';
import { RestaurantListComponent } from './main/restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './main/restaurant-detail/restaurant-detail.component';
import { EditRestaurantComponent } from './main/edit-restaurant/edit-restaurant.component';

import { ProductFormComponent } from './commerce/product-form/product-form.component';
import { ProductListComponent } from './commerce/product-list/product-list.component';
import { ProductComponent } from './main/product/product.component';


import { CoreModule }    from './core/core.module';

// import { MainModule } from './main/main.module';
// import { ProductsModule } from './products/products.module';
import { AccountModule } from './account/account.module';
import { MainModule }    from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { CommerceModule } from './commerce/commerce.module';

import { AdminComponent } from './main/admin/admin.component';
import { LayoutComponent } from './main/layout/layout.component';

import { CategoryListComponent } from './commerce/category-list/category-list.component';
import { CategoryFormComponent } from './commerce/category-form/category-form.component';

const appRoutes: Routes = [
  // { path: 'login', component:LoginComponent },
  
  // { path: 'contact-us', component:ContactComponent },
  // { path: 'product-list', component:ProductListComponent },
  // { path: 'product/:id', component:ProductDetailComponent },
  // { path: 'shopping-cart', component:ShoppingCartComponent },
  
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
      { path: 'dashboard', component:DashboardComponent,
        children:[
          {path: 'orders', component:OrderListComponent},
          {path: 'restaurants', component:RestaurantFormComponent},
          {path: 'products', component:ProductListComponent}
        ]
      },  

      { path: 'admin', component:RestaurantListComponent },
      { path: 'admin/restaurants', component:RestaurantListComponent },
      { path: 'admin/restaurant/:id', component:EditRestaurantComponent },
      { path: 'admin/restaurant', component:RestaurantFormComponent },
      { path: 'admin/categories', component:CategoryListComponent },
      { path: 'admin/category/:id', component:CategoryFormComponent },
      { path: 'admin/category', component:CategoryFormComponent },
      { path: 'admin/products', component:ProductListComponent},
      { path: 'admin/product/:id', component:ProductFormComponent },
      { path: 'admin/product', component:ProductFormComponent},

        { path: 'restaurants', component:RestaurantGridComponent },
        { path: 'restaurant-detail/:id', component:RestaurantDetailComponent },
        { path: 'products', component:ProductListComponent },
        { path: 'product/:id', component:ProductComponent },
        { path: 'forget-password', component:ForgetPasswordComponent },
        { path: 'login', component:LoginComponent },
        { path: 'institution-login', component:InstitutionLoginComponent },
        { path: 'signup', component:SignupComponent },
        { path: 'institution-signup', component:InstitutionSignupComponent },
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
export class AppModule { 
  constructor(ngRedux:NgRedux<any>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
