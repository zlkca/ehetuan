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









// import {throwError as observableThrowError,  Observable } from 'rxjs';
// import { fromPromise } from 'rxjs/observable/fromPromise';
// import { catchError, map } from 'rxjs/operators';

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { environment } from '../../environments/environment';
// import { Restaurant,Category,Color,Style,PriceRange,Product,Picture,Cart,CartItem,Order,OrderItem,FavoriteProduct } from './commerce';

// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

// const APP = environment.APP;
// const API_URL = environment.API_URL;

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let index = request.url.indexOf('maps.google.com/maps/api');

//     if(index == -1){
//         let token = localStorage.getItem('token-' + APP);
//         request = request.clone({
//           setHeaders: {
//             'Content-Type': 'application/json; charset=utf-8',
//             'Authorization': 'Bearer ' + btoa(token)
//           }
//         });
//     }else{
//         request = request.clone({
//           setHeaders: {}
//         });
//     }
//     return next.handle(request);
//   }
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class RestaurantService {

//     private API_URL = environment.API_URL;
//     private APP = environment.APP;
//     MEDIA_URL = environment.APP_URL+'/media/';
//     emptyImage = environment.APP_URL + '/media/empty.png';

//     constructor(private http:HttpClient){ }

//     getLocation(addr:string):Observable<any>{
//         let url = 'http://maps.google.com/maps/api/geocode/json?address=' + addr + 'CA&sensor=false'
//         return this.http.get(url).pipe(map((res:any)=>{
//             if(res.results && res.results.length>0){
//                 let r = res.results[0];
//                 let postal_code = '', sub_locality = '', locality = '';
//                 for(let addr of r.address_components){
//                     if(addr.types.indexOf('postal_code')!=-1){
//                         postal_code = addr.long_name;
//                     }
//                     if(addr.types.indexOf('sublocality_level_1')!=-1 || addr.types.indexOf('sublocality')!=-1){
//                         sub_locality = addr.long_name;
//                     }
//                     if(addr.types.indexOf('locality')!=-1){
//                         locality = addr.long_name;
//                     }
//                 }
//                 return {...r.geometry.location, ...{'formatted_addr':r.formatted_address,
//                     'locality':locality,
//                     'sub_locality':sub_locality,
//                     'postal_code':postal_code}};//{lat: 43.7825004, lng: -79.3930389}
//             }else{
//                 return null;
//             }
//         }));
//     }

//     sendFormData(url, formData, token, resolve, reject){
//         var xhr = new XMLHttpRequest();

//         xhr.onreadystatechange = function (e) {
//           if (xhr.readyState === 4) { // done
//             if (xhr.status === 200) { // ok
//                 resolve(JSON.parse(xhr.response));
//                 //console.log(xhr.responseText);
//             } else {
//                 reject(xhr.response);
//                 //console.error(xhr.statusText);
//             }
//           }
//         };

//         xhr.onerror = function (e) {
//             reject(xhr.response);
//             //console.error(xhr.statusText);
//         };

//         xhr.open("POST", url, true);
//         xhr.setRequestHeader("authorization", "Bearer " + btoa(token));
//         xhr.send(formData);
//     }


//     getRestaurantList(query?:string):Observable<Restaurant[]>{
//         const url = API_URL + 'restaurants' + (query ? query:'');
//         let headers = new HttpHeaders().set('Content-Type', 'application/json');
//         return this.http.get(url, {'headers': headers}).pipe(map((res:any) => {
//             let a:Restaurant[] = [];
//             let d = res.data;
//             if( d && d.length > 0){
//                 for(var i=0; i<d.length; i++){
//                     a.push(new Restaurant(d[i]));
//                 }
//             }
//             return a;
//         }),
//         catchError((err) => {
//             return observableThrowError(err.message || err);
//         }),);
//     }

//     getRestaurant(id:number):Observable<Restaurant>{
//         const url = API_URL + 'restaurants/' + id;
//         let headers = new HttpHeaders().set('Content-Type', 'application/json');
//         return this.http.get(url, {'headers': headers}).pipe(map((res:any) => {
//             return new Restaurant(res.data);
//         }),
//         catchError((err) => {
//             return observableThrowError(err.message || err);
//         }),);
//     }
// }

//
