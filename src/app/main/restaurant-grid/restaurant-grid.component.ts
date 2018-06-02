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
    center:any;

    ngOnInit() {
        let self = this;

        this.commerceServ.getRestaurantList().subscribe(
            (r:Restaurant[]) => {
                self.restaurantList = r;

                let a = [];
                r.map(restaurant=>{ a.push({lat:parseFloat(restaurant.address.lat), lng:parseFloat(restaurant.address.lng)}) });
                self.places = a;
            },
            (err:any) => {
                self.restaurantList = [];
            });

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

    constructor(private commerceServ:CommerceService, private sharedServ:SharedService) {
        let self = this;

        //get user's location
        let s:string = localStorage.getItem('location-'+APP);
        let loc = JSON.parse(s);
        self.center = {lat:loc.lat, lng:loc.lng};

        // setup event listener
        this.sharedServ.getMsg().subscribe(msg => {
            if('OnSearch' === msg.name){
                if(msg.query){
                  self.filter = msg.query;
                  let query = {...self.filter, ...self.query};
                  self.doSearch(query);
                }else{
                    self.doSearch(self.query.keyword);
                }
            }
        });
    }
  
    search(keyword:string){
      let self = this;
      this.query = {'keyword': keyword};
      let query = {...self.filter, ...self.query};
      self.doSearch(query);
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

    doSearch(query?:any){
        //query --- eg. {'status':'active','user_id':self.user_id}
        let self = this;
        let qs = self.getFilter(query);

        if(qs.length>0){
          query = '?' + qs.join('&');
          if(this.query && this.query.keyword){
            query += '&keyword=' + this.query.keyword;
          }
        }else{
          if(this.query && this.query.keyword){
            query = '?keyword=' + this.query.keyword;
          }else{
            query = null;
          }
        }

        self.commerceServ.getRestaurantList(query).subscribe(
            (ps:Restaurant[]) => {
                self.restaurantList = ps;//self.toProductGrid(data);
            },
            (err:any) => {
                self.restaurantList = [];
            }
        );
      }
}