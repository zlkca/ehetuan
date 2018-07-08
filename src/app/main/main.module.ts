import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { CommerceModule } from '../commerce/commerce.module';
import { AccountModule } from '../account/account.module';
import { environment } from '../../environments/environment';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LayoutComponent } from './layout/layout.component';

import { CommerceService } from '../commerce/commerce.service';
import { AccountService } from '../account/account.service';

import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { CommentComponent } from './comment/comment.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    CommerceModule,
    AccountModule,
  ],
  declarations: [
    //HeaderComponent,
    //FooterComponent,
    HomeComponent,
    ContactComponent,
    LayoutComponent,
    ProductComponent,
    DashboardComponent,
    BlogComponent,
    CommentComponent,
    EditRestaurantComponent
  ],
  providers:[CommerceService, AccountService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  exports:[ //HeaderComponent, 
    //FooterComponent,
    ContactComponent, 
    HomeComponent ]
})
export class MainModule { }
