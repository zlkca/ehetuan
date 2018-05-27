import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { CommerceModule } from '../commerce/commerce.module';
import { environment } from '../../environments/environment';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';
import { CommerceService } from '../commerce/commerce.service';
import { ProductComponent } from './product/product.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CommerceModule,
  ],
  declarations: [
    //HeaderComponent,
    //FooterComponent,
    HomeComponent,
    ContactComponent,
    LayoutComponent,
    ProductComponent,
    RestaurantComponent
  ],
  providers:[CommerceService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[ //HeaderComponent, 
    //FooterComponent,
    ContactComponent, 
    HomeComponent ]
})
export class MainModule { }
