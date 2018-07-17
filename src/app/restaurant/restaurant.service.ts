import { Injectable } from '@angular/core';
import { RestaurantApi, LoopBackFilter, Restaurant, GeoPoint } from '../shared/lb-sdk';
import { Observable } from 'rxjs';

@Injectable()
export class RestaurantService {
    constructor(
        private restaurantApi: RestaurantApi
    ) {}

    findById(id: number, filter: LoopBackFilter = {}): Observable<Restaurant> {
        return this.restaurantApi.findById(id, filter);
    }

    getNearby(location: GeoPoint, maxDistance: number = 20, limit: number = 0): Observable<Restaurant[]> {
        return this.restaurantApi.find({
            where: {
                location: {
                    near: location,
                    maxDistance: maxDistance,
                    unit: 'kilometers'
                }
            },
            limit: limit
        });
    }
}
