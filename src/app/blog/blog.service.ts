import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';
import { Post,Comment } from './blog';

@Injectable()
export class BlogService {
    private API_URL = environment.API_URL;

    constructor(private http:HttpClient){ }

    getPostList(query?:string):Observable<Post[]>{
        const url = this.API_URL + 'posts' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Post[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Post(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getPost(id:number):Observable<Post>{
        const url = this.API_URL + 'post/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Post(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    savePost(d:Post):Observable<Post>{
        const url = this.API_URL + 'post';
        let data = {
          'title': d.title,
          'body': d.body,
          'author_id': d.author.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Post(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmPost(id:number):Observable<Post[]>{
        const url = this.API_URL + 'post/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Post[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Post(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getCommentList(query?:string):Observable<Comment[]>{
        const url = this.API_URL + 'comments' + (query ? query:'');
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            let a:Comment[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Comment(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    getComment(id:number):Observable<Comment>{
        const url = this.API_URL + 'comment/' + id;
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.get(url, {'headers': headers}).map((res:any) => {
            return new Comment(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    saveComment(d:Comment):Observable<Comment>{
        const url = this.API_URL + 'comment';
        let data = {
          'body': d.body,
          'author_id': d.author.id,
          'post_id': d.post.id,
          'created': d.created,
          'updated': d.updated,
        }
        return this.http.post(url, data).map((res:any) => {
            return new Comment(res.data);
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

    rmComment(id:number):Observable<Comment[]>{
        const url = this.API_URL + 'comment/' + id;
        return this.http.get(url).map((res:any) => {
            let a:Comment[] = [];
            if( res.data && res.data.length > 0){
                for(let b of res.data){
                    a.push(new Comment(b));
                }
            }
            return a;
        })
        .catch((err) => {
            return Observable.throw(err.message || err);
        });
    }

}

