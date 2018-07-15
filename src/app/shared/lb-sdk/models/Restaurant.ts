/* tslint:disable */
import {
  Product,
  GeoPoint
} from '../index';

declare var Object: any;
export interface RestaurantInterface {
  "name": string;
  "description"?: string;
  "location"?: GeoPoint;
  "ownerId"?: number;
  "created"?: Date;
  "modified"?: Date;
  "id"?: number;
  products?: Product[];
}

export class Restaurant implements RestaurantInterface {
  "name": string;
  "description": string;
  "location": GeoPoint;
  "ownerId": number;
  "created": Date;
  "modified": Date;
  "id": number;
  products: Product[];
  constructor(data?: RestaurantInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Restaurant`.
   */
  public static getModelName() {
    return "Restaurant";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Restaurant for dynamic purposes.
  **/
  public static factory(data: RestaurantInterface): Restaurant{
    return new Restaurant(data);
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
      name: 'Restaurant',
      plural: 'Restaurants',
      path: 'Restaurants',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "location": {
          name: 'location',
          type: 'GeoPoint'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'number'
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
        products: {
          name: 'products',
          type: 'Product[]',
          model: 'Product',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'restaurantId'
        },
      }
    }
  }
}
