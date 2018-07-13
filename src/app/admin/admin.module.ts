import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommerceModule } from '../commerce/commerce.module';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { AccountModule } from '../account/account.module';
import { ProductModule } from '../product/product.module';
import { AdminComponent } from './admin.component';
import { ManageProductListComponent } from './manage-product-list/manage-product-list.component';
import { ManageProductFormPageComponent } from './manage-product-form-page/manage-product-form-page.component';

import { ManageBusinessUserListComponent } from './manage-business-user-list/manage-business-user-list.component';
import { ManageRestaurantListComponent } from './manage-restaurant-list/manage-restaurant-list.component';
import { ManageProductListPageComponent } from './manage-product-list-page/manage-product-list-page.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RestaurantModule,
        AccountModule,
        ProductModule,
        CommerceModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AdminComponent,
        ManageBusinessUserListComponent,
        ManageProductListComponent,
        ManageRestaurantListComponent,
        ManageProductListPageComponent,
        ManageProductFormPageComponent,
        EditRestaurantComponent],
    exports: [AdminComponent, EditRestaurantComponent]
})
export class AdminModule { }
