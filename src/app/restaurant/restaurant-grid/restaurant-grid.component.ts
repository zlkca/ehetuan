import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../account/auth.service';
import { environment } from '../../../environments/environment';
import { LocationService } from '../../shared/location/location.service';
import { RestaurantService } from '../restaurant.service';
import { Restaurant, GeoPoint } from '../../shared/lb-sdk';

const APP = environment.APP;

@Component({
    providers: [LocationService],
    selector: 'app-restaurant-grid',
    templateUrl: './restaurant-grid.component.html',
    styleUrls: ['./restaurant-grid.component.scss']
})
export class RestaurantGridComponent implements OnInit {
    keyword: string;
    query: any;
    filter: any;
    restaurantList: Restaurant[];
    places: any[] = [];
    center: GeoPoint = { lat: 43.761539, lng: -79.411079 };
    MEDIA_URL = environment.MEDIA_URL;

    ngOnInit() {
        this.locationSvc.get().subscribe(pos => {
            this.center = pos;
        });
    }

    constructor(private commerceServ: CommerceService,
        private router: Router,
        private sharedServ: SharedService,
        private restaurantServ: RestaurantService,
        private locationSvc: LocationService) {
        const self = this;

        // self.center = JSON.parse(localStorage.getItem('location-' + APP));

        // setup event listener
        this.sharedServ.getMsg().subscribe(msg => {
            if ('OnSearch' === msg.name) {
                if (msg.query) {
                    self.filter = msg.query;
                    const query = { ...self.filter, ...self.query };
                    self.doSearchRestaurants(query);
                } else {
                    self.doSearchRestaurants(self.query.keyword);
                }
            }
        });

        self.doSearchRestaurants(self.center);
    }

    searchByKeyword(keyword: string) {
        let self = this;
        this.query = { 'keyword': keyword };
        let query = { ...self.filter, ...self.query };
        self.doSearchRestaurants(query);
    }


    getImageSrc(image: any) {
        if (image.file) {
            return image.data;
        } else {
            if (image.data) {
                return this.MEDIA_URL + image.data;
            } else {
                return 'http://placehold.it/400x300';
            }
        }
    }

    toDetail(p) {
        this.router.navigate(["restaurant-detail/" + p.id]);
    }

    getFilter(query?: any) {
        let qs = [];

        if (query.categories && query.categories.length > 0) {
            let s = query.categories.join(',');
            qs.push('cats=' + s);
        }

        // if(query.restaurants && query.restaurants.length>0){
        //   let s = query.restaurants.join(',');
        //   qs.push('ms=' + s);
        // }

        // if(query.colors && query.colors.length>0){
        //   let s = query.colors.join(',');
        //   qs.push('colors=' + s);
        // }
        return qs;
    }

    doSearchRestaurants(query?: any) {
        // query --- eg. {}
        const self = this;
        const qs = self.getFilter(query);
        let s = '';
        const conditions = [];

        if (qs.length > 0) {
            conditions.push(qs.join('&'));
        }
        if (query && query.keyword) {
            conditions.push('keyword=' + query.keyword);
        }
        if (query && query.lat && query.lng) {
            conditions.push('lat=' + query.lat + '&lng=' + query.lng);
        }

        if (conditions.length > 0) {
            s = '?' + conditions.join('&');
        }

        this.restaurantServ.getNearby(this.center).subscribe(
            (ps: Restaurant[]) => {
                self.restaurantList = ps;//self.toProductGrid(data);
                const a = [];
                ps.map(restaurant => {
                    a.push({
                        lat: restaurant.location.lat,
                        lng: restaurant.location.lng,
                        name: restaurant.name
                    });
                });
                self.places = a;
            },
            (err: any) => {
                self.restaurantList = [];
            }
        );
    }
}
