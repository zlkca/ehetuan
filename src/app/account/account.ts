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
    public id:string;
    public name:string;
    public country:Country;
    constructor(o?:any){
        if(o){
            this.name = o.name;
            this.id = o.id;
            this.country = o.country;
        }else{
            this.country = new Country();
        }
    }
}

export class City{
    public id:string;
    public name:string;
    public province:Province;
    
    constructor(o?:any){
        if(o){
            this.name = o.name;
            if(o.province){
              this.province = new Province(o.province);
            }   
            this.id = o.id;
        }else{
            this.province = new Province();
        }
    }
}

export class Address{
    public id:string;
    public street:string;
    public unit:string;
    public postal_code:string;
    public city:City;
    
    constructor(o:any = null){
        if(o){
            this.street = o.street;
            this.unit = o.unit
            this.postal_code = o.postal_code;

            if(o.city){
              this.city = new City(o.city);
            }
            this.id = o.id;
        }else{
            this.city = new City();
        }
    }
}
