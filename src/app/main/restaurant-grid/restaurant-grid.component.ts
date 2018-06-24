import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommerceService } from '../../commerce/commerce.service';
import { Restaurant } from '../../commerce/commerce';
import { SharedService } from '../../shared/shared.service';
import { AuthService } from '../../account/auth.service';
import { environment } from '../../../environments/environment';

const APP = environment.APP;

@Component({
  selector: 'app-restaurant-grid',
  templateUrl: './restaurant-grid.component.html',
  styleUrls: ['./restaurant-grid.component.scss']
})
export class RestaurantGridComponent implements OnInit {
    keyword:string;
    query:any;
    filter:any;
    restaurantList:Restaurant[];
    places:any[] = [];
    center:any = {lat:43.761539,lng:-79.411079};

    ngOnInit() {
        // if(window.navigator.geolocation){
        //     window.navigator.geolocation.getCurrentPosition(pos=>{
        //       let c = pos.coords;
        //       self.center = {lat:c.latitude, lng:c.longitude};
        //     }, 
        //     err=>{
        //       self.center = {lat: 43.7823332, lng: -79.392994};
        //     });
        // }
    }
    ngAfterViewInit(){
      let self = this;
      
    }
    constructor(private commerceServ:CommerceService, private sharedServ:SharedService) {
        let self = this;

        //get user's location
        let s:string = localStorage.getItem('location-'+APP);
        let loc = JSON.parse(s);
        
        if(loc){
          self.center = {lat:loc.lat, lng:loc.lng};
        }

        // setup event listener
        this.sharedServ.getMsg().subscribe(msg => {
            if('OnSearch' === msg.name){
                if(msg.query){
                  self.filter = msg.query;
                  let query = {...self.filter, ...self.query};
                  self.doSearchRestaurants(query);
                }else{
                    self.doSearchRestaurants(self.query.keyword);
                }
            }
        });

        self.doSearchRestaurants(self.center);
    }
  
    searchByKeyword(keyword:string){
      let self = this;
      this.query = {'keyword': keyword};
      let query = {...self.filter, ...self.query};
      self.doSearchRestaurants(query);
    }


    getFilter(query?:any){
      let qs = [];

      if(query.categories && query.categories.length>0){
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

    doSearchRestaurants(query?:any){
        //query --- eg. {}
        let self = this;
        let qs = self.getFilter(query);
        let s = '';
        let conditions = [];

        if(qs.length>0){
          conditions.push(qs.join('&'));
        }
        if(query && query.keyword){
          conditions.push('keyword=' + query.keyword);
        }
        if(query && query.lat && query.lng){
          conditions.push('lat=' + query.lat + '&lng=' + query.lng);
        }

        if(conditions.length>0){
          s = '?' + conditions.join('&');
        }

        self.commerceServ.getRestaurantList(s).subscribe(
            (ps:Restaurant[]) => {
                self.restaurantList = ps;//self.toProductGrid(data);
                let a = [];
                ps.map(restaurant=>{ 
                  a.push({lat:parseFloat(restaurant.address.lat), 
                    lng:parseFloat(restaurant.address.lng),
                    name:restaurant.name
                  }) 
                });
                self.places = a;
            },
            (err:any) => {
                self.restaurantList = [];
            }
        );
      }
}