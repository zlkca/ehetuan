import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductModule } from '../product/product.module';
import { CommerceModule } from '../commerce/commerce.module';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantGridComponent } from './restaurant-grid/restaurant-grid.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommerceModule,
    ProductModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [RestaurantFormComponent, RestaurantGridComponent, RestaurantListComponent, RestaurantDetailComponent],
  exports: [RestaurantFormComponent, RestaurantGridComponent, RestaurantListComponent, RestaurantDetailComponent]
})
export class RestaurantModule { }
