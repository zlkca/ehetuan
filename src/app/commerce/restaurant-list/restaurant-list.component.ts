import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../commerce';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CommerceService } from '../commerce.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

    @Input() data: Restaurant[];
	
	MEDIA_URL:string = environment.MEDIA_URL;

  ngOnInit() {
  }

    constructor(private commerceServ:CommerceService, private router:Router) {

    }

    toDetail(p){
        this.router.navigate(["restaurant-detail/"+p.id]);
    }
}
