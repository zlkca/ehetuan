import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Manufactory,Category,Color,Style,PriceRange,Product,Picture,Cart,CartItem,Order,OrderItem,FavoriteProduct } from './commerce';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

const APP = environment.APP;
const API_URL = environment.API_URL;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token-' + APP);
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + btoa(token)
      }
    });
    return next.handle(request);
  }
}


@Injectable()
export class CommerceService {
    
    private API_URL = environment.API_URL;
    private APP = environment.APP;
    MEDIA_URL = environment.APP_URL+'/media/';
    emptyImage = environment.APP_URL + '/media/empty.png';

    constructor(private http:HttpClient){ }


    getManufactoryList(query?:string):Observable<Manufactory[]>{
        const url = API_URL + 'manufactories' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Manufactory[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Manufactory(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getManufactory(id:number):Observable<Manufactory>{
        const url = API_URL + 'manufactory/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Manufactory(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveManufactory(d:Manufactory):Observable<Manufactory>{
        const url = API_URL + 'manufactory';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'id': d.id? d.id:'',
          'name': d.name,
          'description': d.description
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new Manufactory(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmManufactory(id:number):Observable<Manufactory[]>{
        const url = API_URL + 'manufactory/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.delete(url, {'headers': headers}).map((res:any) => {
            let a:Manufactory[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Manufactory(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCategoryList(query?:string):Observable<Category[]>{
        const url = this.API_URL + 'categories' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Category[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Category(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCategory(id:number):Observable<Category>{
        const url = this.API_URL + 'category/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Category(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveCategory(d:Category):Observable<Category>{
        const url = this.API_URL + 'category';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'id': d.id? d.id:'',
          'name': d.name,
          'description': d.description,
          'status': d.status,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new Category(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmCategory(id:number):Observable<Category[]>{
        const url = this.API_URL + 'category/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.delete(url, {'headers': headers}).map((res:any) => {
            let a:Category[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Category(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getColorList(query?:string):Observable<Color[]>{
        const url = this.API_URL + 'colors' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Color[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Color(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getColor(id:number):Observable<Color>{
        const url = this.API_URL + 'color/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Color(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveColor(d:Color):Observable<Color>{
        const url = this.API_URL + 'color';
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let data = {
          'id': d.id? d.id:'',
          'name': d.name,
          'description': d.description
          // 'status': d.status,
        }
        return this.http.post(url, data, {'headers': headers}).map((res:any) => {
            return new Color(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmColor(id:number):Observable<Color[]>{
        const url = this.API_URL + 'color/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.delete(url, {'headers': headers}).map((res:any) => {
            let a:Color[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Color(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getStyleList(query?:string):Observable<Style[]>{
        const url = this.API_URL + 'styles' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Style[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Style(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getStyle(id:number):Observable<Style>{
        const url = this.API_URL + 'style/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Style(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveStyle(d:Style):Observable<Style>{
        const url = this.API_URL + 'style';
        let data = {
            'id': (d.id? d.id:''),
          'name': d.name,
          'description': d.description,
          'status': d.status,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Style(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmStyle(id:number):Observable<Style[]>{
        const url = this.API_URL + 'style/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Style[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Style(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getProductList(query?:string):Observable<Product[]>{
        const url = API_URL + 'products' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Product[] = [];
            let d = res.data;
            if( d && d.length > 0){
                for(var i=0; i<d.length; i++){
                    a.push(new Product(d[i]));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getProduct(id:number):Observable<Product>{
        const url = API_URL + 'product/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Product(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getPriceRangeList(query?:string):Observable<PriceRange[]>{
        const url = this.API_URL + 'priceRanges' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:PriceRange[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new PriceRange(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getPriceRange(id:number):Observable<PriceRange>{
        const url = this.API_URL + 'priceRange/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new PriceRange(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    savePriceRange(d:PriceRange):Observable<PriceRange>{
        const url = this.API_URL + 'priceRange';
        let data = {
            'id': (d.id? d.id:''),
          'low': d.low,
          'high': d.high,
          'step': d.step,
          'status': d.status,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new PriceRange(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmPriceRange(id:number):Observable<PriceRange[]>{
        const url = this.API_URL + 'priceRange/' + id;
        return this.http.get(url).map((res:any) => {
            let a:PriceRange[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new PriceRange(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    

    // saveProduct(d:Product):Observable<Product>{
    //     const url = this.API_URL + 'product';
    //     let data = {
    //         'id': (d.id? d.id:''),
    //       'title': d.title,
    //       'description': d.description,
    //       'year': d.year,
    //       'manufactory_id': d.manufactory.id,
    //       'category_id': d.category.id,
    //       'style_id': d.style.id,
    //       'status': d.status,
    //       'pic': d.pic,
    //       'dimension': d.dimension,
    //       'price': d.price,
    //       'currency': d.currency,
    //       'created': d.created,
    //       'updated': d.updated,
    //     }
    //     return this.http.post(url, data).map((res:any) => {
    //         return new Product(res.data);
    //     })
    //     .catch((err) => {
    //         return Observable.throw(err.message || err);
    //     });
    // }

    rmProduct(id:number):Observable<Product[]>{
        const url = this.API_URL + 'product/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Product[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Product(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getPictureList(query?:string):Observable<Picture[]>{
        const url = this.API_URL + 'pictures' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Picture[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Picture(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getPicture(id:number):Observable<Picture>{
        const url = this.API_URL + 'picture/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Picture(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    savePicture(d:Picture):Observable<Picture>{
        const url = this.API_URL + 'picture';
        let data = {
            'id': (d.id? d.id:''),
            'name': d.name,
            'description': d.description,
            'image': d.image,
            'width': d.width,
            'height': d.height,
            'product_id': d.product.id,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Picture(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmPicture(id:number):Observable<Picture[]>{
        const url = this.API_URL + 'picture/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Picture[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Picture(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCartList(query?:string):Observable<Cart[]>{
        const url = this.API_URL + 'carts' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Cart[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Cart(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCart(id:number):Observable<Cart>{
        const url = this.API_URL + 'cart/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Cart(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveCart(d:Cart):Observable<Cart>{
        const url = this.API_URL + 'cart';
        let data = {
            'id': (d.id? d.id:''),
          'user_id': d.user.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Cart(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmCart(id:number):Observable<Cart[]>{
        const url = this.API_URL + 'cart/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Cart[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Cart(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCartItemList(query?:string):Observable<CartItem[]>{
        const url = this.API_URL + 'cartItems' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:CartItem[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new CartItem(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCartItem(id:number):Observable<CartItem>{
        const url = this.API_URL + 'cartItem/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new CartItem(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveCartItem(d:CartItem):Observable<CartItem>{
        const url = this.API_URL + 'cartItem';
        let data = {
            'id': (d.id? d.id:''),
          'quantity': d.quantity,
          'product_id': d.product.id,
          'cart_id': d.cart.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new CartItem(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmCartItem(id:number):Observable<CartItem[]>{
        const url = this.API_URL + 'cartItem/' + id;
        return this.http.get(url).map((res:any) => {
            let a:CartItem[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new CartItem(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getOrderList(query?:string):Observable<Order[]>{
        const url = this.API_URL + 'orders' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Order[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Order(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getOrder(id:number):Observable<Order>{
        const url = this.API_URL + 'order/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Order(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveOrder(d:Order):Observable<Order>{
        const url = this.API_URL + 'order';
        let data = {
            'id': (d.id? d.id:''),
          'user_id': d.user.id,
          'amount': d.amount,
          'status': d.status,
          'currency': d.currency,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Order(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmOrder(id:number):Observable<Order[]>{
        const url = this.API_URL + 'order/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Order[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Order(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getOrderItemList(query?:string):Observable<OrderItem[]>{
        const url = this.API_URL + 'orderItems' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:OrderItem[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new OrderItem(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getOrderItem(id:number):Observable<OrderItem>{
        const url = this.API_URL + 'orderItem/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new OrderItem(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveOrderItem(d:OrderItem):Observable<OrderItem>{
        const url = this.API_URL + 'orderItem';
        let data = {
            'id': (d.id? d.id:''),
          'order_id': d.order.id,
          'product_id': d.product.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new OrderItem(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmOrderItem(id:number):Observable<OrderItem[]>{
        const url = this.API_URL + 'orderItem/' + id;
        return this.http.get(url).map((res:any) => {
            let a:OrderItem[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new OrderItem(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getFavoriteProductList(query?:string):Observable<FavoriteProduct[]>{
        const url = this.API_URL + 'favoriteProducts' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:FavoriteProduct[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new FavoriteProduct(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getFavoriteProduct(id:number):Observable<FavoriteProduct>{
        const url = this.API_URL + 'favoriteProduct/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new FavoriteProduct(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveFavoriteProduct(d:FavoriteProduct):Observable<FavoriteProduct>{
        const url = this.API_URL + 'favoriteProduct';
        let data = {
            'id': (d.id? d.id:''),
          'user_id': d.user.id,
          'ip': d.ip,
          'product_id': d.product.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new FavoriteProduct(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmFavoriteProduct(id:number):Observable<FavoriteProduct[]>{
        const url = this.API_URL + 'favoriteProduct/' + id;
        return this.http.get(url).map((res:any) => {
            let a:FavoriteProduct[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new FavoriteProduct(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

}
