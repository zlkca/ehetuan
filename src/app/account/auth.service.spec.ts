import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

const APP = environment.APP;
const API_URL = environment.API_URL;

describe('AuthService', () => {
	let injector: TestBed;
	let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports:[HttpClientTestingModule],
      	providers: [AuthService]
    });

    // injector = getTestBed();
    // injector.get(HttpTestingController);
  });

  afterEach(()=>{
  	// httpMock.verify();
  })

  it('should login successful', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'a', data:{username:'z', email:'admin@gmail.com', first_name:'a', last_name:'b'}};

  	service.login('z','p1').subscribe((r:any)=>{
  		let token = localStorage.getItem('token-'+APP);
  		expect(token).toBe(dummyLogin.token);
  		expect(r.username).toBe(dummyLogin.data.username);
  		expect(r.email).toBe(dummyLogin.data.email);
  		expect(r.first_name).toBe(dummyLogin.data.first_name);
  		expect(r.last_name).toBe(dummyLogin.data.last_name);	
  	})
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'login'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);
  }));


  it('should login fail', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'', data:''};

  	service.login('z','p1').subscribe((r:any)=>{
  		let token = localStorage.getItem('token-'+APP);
  		expect(token).toBe(dummyLogin.token);
  		expect(r).toBe(null);	
  	})
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'login'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);
  }));

  it('should has Logged In', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'a', data:{username:'z', email:'admin@gmail.com', first_name:'a', last_name:'b'}};

  	service.login('z','p1').subscribe((r:any)=>{
  		service.hasLoggedIn().subscribe((rt:any)=>{
  			expect(rt.username).toBe(dummyLogin.data.username);
  		});	
  	})
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'login'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);


    const req1 = httpMock.expectOne({method:'POST', url:API_URL+'token'});
    expect(req1.request.method).toBe('POST');
    req1.flush(dummyLogin);
  }));

   it('should has not Logged In', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'', data:''};

  	service.login('z','p1').subscribe((r:any)=>{
  		service.hasLoggedIn().subscribe((rt:any)=>{
  			expect(rt).toBe(null);
  		});	
  	})
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'login'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);

    const req1 = httpMock.expectOne({method:'POST', url:API_URL+'token'});
    expect(req1.request.method).toBe('POST');
    req1.flush(dummyLogin);
  }));

  it('should checkToken successful', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'a', data:{username:'z', email:'admin@gmail.com', first_name:'a', last_name:'b'}};

	let token = localStorage.getItem('token-'+APP);
	service.checkToken(token).subscribe((rt:any)=>{
		expect(rt).toBe(dummyLogin.data);
	});
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'token'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);
  }));

  it('should logout', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
  	let dummyLogin = { token:'a', data:{username:'z', email:'admin@gmail.com', first_name:'a', last_name:'b'}};

  	service.login('z','p1').subscribe((r:any)=>{
  		service.logout();
  		let token = localStorage.getItem('token-'+APP);
  		expect(token).toBe(null);
  	})
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'login'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);

  }));


  it('should signup successful', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
    let dummyLogin = { token:'a', data:{username:'z', email:'admin@gmail.com', password:''}};

    service.signup('z','email','p1').subscribe((r:any)=>{
      let token = localStorage.getItem('token-'+APP);
      expect(token).toBe(dummyLogin.token);
      expect(r.username).toBe(dummyLogin.data.username);
      expect(r.email).toBe(dummyLogin.data.email);
      //expect(r.password).toBe('');
    })
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'signup'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);
  }));


  it('should signup fail', inject([AuthService, HttpTestingController], (service: AuthService, httpMock:HttpTestingController) => {
    let dummyLogin = { token:'', data:''};

    service.signup('z','e','p1').subscribe((r:any)=>{
      let token = localStorage.getItem('token-'+APP);
      expect(token).toBe(dummyLogin.token);
      expect(r).toBe(null);  
    })
    
    const req = httpMock.expectOne({method:'POST', url:API_URL+'signup'});
    expect(req.request.method).toBe('POST');
    req.flush(dummyLogin);
  }));
});
