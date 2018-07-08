import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '../commerce/commerce.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { AccountModule } from '../account/account.module';
import { ProductModule } from '../product/product.module';
import { AdminComponent } from './admin.component';
import { ManageProductListComponent } from './manage-product-list/manage-product-list.component';
import { ManageRestaurantListComponent } from './manage-restaurant-list/manage-restaurant-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RestaurantModule,
    AccountModule,
    ProductModule,
    CommerceModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AdminComponent, ManageProductListComponent, ManageRestaurantListComponent],
  exports:[AdminComponent]
})
export class AdminModule { }
