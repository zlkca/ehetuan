import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { RestaurantGridComponent } from './restaurant-grid/restaurant-grid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
    RestaurantComponent,
    RestaurantGridComponent,
    DashboardComponent,
    BlogComponent,
    CommentComponent
  ],
  providers:[CommerceService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[ //HeaderComponent, 
    //FooterComponent,
    ContactComponent, 
    HomeComponent ]
})
export class MainModule { }
