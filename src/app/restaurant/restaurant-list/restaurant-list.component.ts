// import { Component, OnInit, Input } from '@angular/core';
// import { Restaurant } from '../commerce';
// import { environment } from '../../../environments/environment';
// import { Router } from '@angular/router';
// import { CommerceService } from '../commerce.service';

// @Component({
//   selector: 'app-restaurant-list',
//   templateUrl: './restaurant-list.component.html',
//   styleUrls: ['./restaurant-list.component.scss']
// })
// export class RestaurantListComponent implements OnInit {

//     @Input() data: Restaurant[];
	
// 	MEDIA_URL:string = environment.MEDIA_URL;

//   ngOnInit() {
//   }

//     constructor(private commerceServ:CommerceService, private router:Router) {

//     }

//     toDetail(p){
//         this.router.navigate(["restaurant-detail/"+p.id]);
//     }
// }


import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../commerce/commerce';
import { CommerceService } from '../../commerce/commerce.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
    restaurants:Restaurant[] = [];
    MEDIA_URL = environment.MEDIA_URL;

    constructor(private router:Router, private commerceSvc:CommerceService){}

    ngOnInit() {
        let self = this;
        this.commerceSvc.getRestaurantList().subscribe((r:Restaurant[]) => {
            self.restaurants = r;
        });
    }

    toPage(url:string){
      this.router.navigate([url]);
    }

    getImageSrc(image:any){
      if(image.file){
        return image.data;
      }else{
        if(image.data){
            return this.MEDIA_URL + image.data;
        }else{
            return this.MEDIA_URL + 'add_photo.png';
        }
      }
    }

    change(r){
        this.router.navigate(["admin/restaurant/" + r.id]);
    }

    add(){
        this.router.navigate(["admin/restaurant"]);
    }

    delete(r){
        let self = this;
        // this.commerceSvc.rmRestaurant(r.id).subscribe(
        //     (r:Restaurant[]) => {
        //         self.restaurantList = r;
        //         if(r.length){
        //             //
        //         }else{
        //             self.router.navigate(["admin/restaurant"]);
        //         }
        //     },
        //     (err)=>{
                
        //     }
        // )
    }
}