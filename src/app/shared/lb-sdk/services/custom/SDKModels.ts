/* tslint:disable */
import { Injectable } from '@angular/core';
import { Account } from '../../models/Account';
import { Container } from '../../models/Container';
import { Restaurant } from '../../models/Restaurant';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';
import { OrderItem } from '../../models/OrderItem';
import { Picture } from '../../models/Picture';
import { Address } from '../../models/Address';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Account: Account,
    Container: Container,
    Restaurant: Restaurant,
    Product: Product,
    Order: Order,
    OrderItem: OrderItem,
    Picture: Picture,
    Address: Address,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
