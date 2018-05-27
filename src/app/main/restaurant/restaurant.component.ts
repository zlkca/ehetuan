import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommerceService } from '../../commerce/commerce.service';
// import { Restaurant } from '../../commerce/commerce';
// import { SharedService } from '../../shared/shared.service';
// import { AuthService } from '../../account/auth.service';
// import { environment } from '../../../environments/environment';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   providers: [AuthService],
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {
//     keyword:string;
//     query:any;
//     filter:any;
//     restaurantList:Restaurant[];

//     ngOnInit() {
//         let self = this;
//         this.commerceServ.getRestaurantList().subscribe(
//             (r:Restaurant[]) => {
//                 self.productList = r;
//             },
//             (err:any) => {
//                 self.productList = [];
//             });
//     }

//     constructor(private commerceServ:CommerceService, private sharedServ:SharedService) {
//         let self = this;
//         this.sharedServ.getMsg().subscribe(msg => {
//             if('OnSearch' === msg.name){
//                 if(msg.query){
//                   self.filter = msg.query;
//                   let query = {...self.filter, ...self.query};
//                   self.doSearch(query);
//                 }else{
//                     self.doSearch(self.query.keyword);
//                 }
//             }
//         });
//     }
  
//     search(keyword:string){
//       let self = this;
//       this.query = {'keyword': keyword};
//       let query = {...self.filter, ...self.query};
//       self.doSearch(query);
//     }
//     // constructor(private authServ:AuthService, private router:Router, private msgServ:MsgService, private productServ:ProductService) {
//     //     let self = this;
//     //     // Event handler
//     //     this.msgServ.getMsg().subscribe(msg => {
//     //         if('OnSearch' === msg.name){
//     //             self.user = authServ.getUserStorage();
//     //             if(msg.query){
//     //                 self.doSearch(msg.query);
//     //             }else{
//     //                 self.doSearch('');
//     //             }
//     //         }
//     //     });
//     // }
  
//     // search(keyword:string){
//     //   this.query = {keyword:keyword};
//     //   this.msgServ.emit({name:'OnClearFilter'});
//     // }

//     getFilter(query?:any){
//       let qs = [];

//       if(query.categories && query.categories.length>0){
//         let s = query.categories.join(',');
//         qs.push('cats=' + s);
//       }

//       if(query.restaurants && query.restaurants.length>0){
//         let s = query.restaurants.join(',');
//         qs.push('ms=' + s);
//       }

//       if(query.colors && query.colors.length>0){
//         let s = query.colors.join(',');
//         qs.push('colors=' + s);
//       }
//       return qs;
//     }

//     doSearch(query?:any){
//         //query --- eg. {'status':'active','user_id':self.user_id}
//         let self = this;
//         let qs = self.getFilter(query);

//         if(qs.length>0){
//           query = '?' + qs.join('&');
//           if(this.query && this.query.keyword){
//             query += '&keyword=' + this.query.keyword;
//           }
//         }else{
//           if(this.query && this.query.keyword){
//             query = '?keyword=' + this.query.keyword;
//           }else{
//             query = null;
//           }
//         }

//         self.commerceServ.getRestaurantList(query).subscribe(
//             (ps:Restaurant[]) => {
//                 self.productList = ps;//self.toProductGrid(data);
//             },
//             (err:any) => {
//                 self.productList = [];
//             }
//         );
//       }
// }