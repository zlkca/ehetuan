/* tslint:disable */
import {
  Restaurant,
  OrderItem
} from '../index';

declare var Object: any;
export interface OrderInterface {
  "userId": number;
  "restaurantId": number;
  "status": string;
  "created"?: Date;
  "modified"?: Date;
  "id"?: number;
  restaurant?: Restaurant;
  items?: OrderItem[];
}

export class Order implements OrderInterface {
  "userId": number;
  "restaurantId": number;
  "status": string;
  "created": Date;
  "modified": Date;
  "id": number;
  restaurant: Restaurant;
  items: OrderItem[];
  constructor(data?: OrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Order`.
   */
  public static getModelName() {
    return "Order";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Order for dynamic purposes.
  **/
  public static factory(data: OrderInterface): Order{
    return new Order(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Order',
      plural: 'Orders',
      path: 'Orders',
      idName: 'id',
      properties: {
        "userId": {
          name: 'userId',
          type: 'number'
        },
        "restaurantId": {
          name: 'restaurantId',
          type: 'number'
        },
        "status": {
          name: 'status',
          type: 'string',
          default: 'new'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "modified": {
          name: 'modified',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        restaurant: {
          name: 'restaurant',
          type: 'Restaurant',
          model: 'Restaurant',
          relationType: 'belongsTo',
                  keyFrom: 'restaurantId',
          keyTo: 'id'
        },
        items: {
          name: 'items',
          type: 'OrderItem[]',
          model: 'OrderItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'orderId'
        },
      }
    }
  }
}
