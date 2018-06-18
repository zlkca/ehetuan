export class User{
  public id:string;
  public username:string;
  public email:string;
  public first_name:string;
  public last_name:string;
  public portrait:string;
  public type:string;
    constructor(o?:any){
        if(o){
          this.id = o.id;
          this.username = o.username;
          this.email = o.email;
          this.first_name = o.first_name;
          this.last_name = o.last_name;
          this.portrait = o.portrait;
          this.type = o.type;
      }
  }
}

export class Country{
    public id:string;
    public name:string;

    constructor(o?:any){
        if(o){
            this.name = o.name;
            this.id = o.id;
        }
    }
}

export class Province{
  id:string;
  name:string;
  constructor(o?:any){
    if(o){
      this.id = o.id;
      this.name = o.name;
    }
  }
}

export class City{
  id:string;
  name:string;
  province:Province;
  constructor(o?:any){
    if(o){
      this.id = o.id;
      this.name = o.name;
      this.province = o.province;
    }
  }
}

export class Address{
  id:string;
  street:string;
  postal_code:string;
  province:Province;
  city:City;
  sub_locality:string;
  lat:string;
  lng:string;

  constructor(o?:any){
    if(o){
      this.id = o.id;
      this.street = o.street;
      this.postal_code = o.postal_code;
      this.province = o.province;
      this.city = o.city;
      this.sub_locality = o.sub_locality;
      this.lat = o.lat;
      this.lng = o.lng;
    }
  }
}
