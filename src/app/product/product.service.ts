
import { throwError as observableThrowError, Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Product } from '../commerce/commerce';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

const APP = environment.APP;
const API_URL = environment.API_URL;


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    sendFormData(url, formData, token, resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) { // done
                if (xhr.status === 200) { // ok
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        };

        xhr.onerror = function (e) {
            reject(xhr.response);
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('authorization', 'Bearer ' + btoa(token));
        xhr.send(formData);
    }

    saveProduct(d: Product) {
        const token = localStorage.getItem('token-' + APP);
        const self = this;

        return fromPromise(new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('id', d.id ? d.id : '');
            formData.append('name', d.name);
            formData.append('description', d.description);
            formData.append('status', 'active');
            formData.append('price', d.price ? d.price.toString() : '');
            formData.append('currency', 'CAD');
            formData.append('categories', Array.from(d.categories, x => x.id).join(','));
            formData.append('restaurant_id', d.restaurant.id);

            formData.append('n_pictures', d.pictures.length ? d.pictures.length.toString() : '0');
            for (let i = 0; i < d.pictures.length; i++) {
                formData.append('name' + i, d.pictures[i].name);
                const image = d.pictures[i].image;
                if (!image.data) {
                    formData.append('image_status' + i, 'removed');
                } else {
                    if (!image.file) {
                        formData.append('image_status' + i, 'unchange');
                    } else {
                        formData.append('image_status' + i, 'changed');
                        formData.append('image' + i, image.file);
                    }
                }
            }

            self.sendFormData(API_URL + 'product', formData, token, resolve, reject);

        }));
    }


    saveMultiProducts(a: any[]) {
        const token = localStorage.getItem('token-' + APP);
        const self = this;

        return fromPromise(new Promise((resolve, reject) => {
            const formData = new FormData();
            let i = 0;
            for (const d of a) {
                const pic = d.pictures ? d.pictures[0] : null;
                const product = {
                    id: d.id ? d.id : '',
                    name: d.name,
                    description: d.description,
                    status: 'active',
                    price: d.price ? d.price.toString() : '',
                    currency: 'cad',
                    // categories:Array.from(d.categories, x => x.id).join(','),
                    restaurant_id: d.restaurant_id,
                    image_status: (pic && pic.status) ? pic.status : 'unchange'
                };

                formData.append('info_' + i, JSON.stringify(product));

                if (pic) {
                    const image = d.pictures ? d.pictures[0].image : null;
                    if (image) {
                        formData.append('image' + i, image.file);
                    }
                }

                i = i + 1;
            }
            self.sendFormData(API_URL + 'products', formData, token, resolve, reject);

        }));
    }

    getProductList(query?: string): Observable<Product[]> {
        const url = API_URL + 'products' + (query ? query : '');
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, { 'headers': headers }).pipe(map((res: any) => {
            let a: Product[] = [];
            let d = res.data;
            if (d && d.length > 0) {
                for (var i = 0; i < d.length; i++) {
                    a.push(new Product(d[i]));
                }
            }
            return a;
        }),
            catchError((err) => {
                return observableThrowError(err.message || err);
            }), );
    }

    getProduct(id: number): Observable<Product> {
        const url = API_URL + 'product/' + id;
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, { 'headers': headers }).pipe(map((res: any) => {
            return new Product(res.data);
        }),
            catchError((err) => {
                return observableThrowError(err.message || err);
            }), );
    }
}
