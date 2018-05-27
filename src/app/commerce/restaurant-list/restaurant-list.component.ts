import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from '../commerce';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

    @Input() data: Restaurant[];
	
	MEDIA_URL:string = environment.MEDIA_URL;

  constructor() { }

  ngOnInit() {
  }

}
