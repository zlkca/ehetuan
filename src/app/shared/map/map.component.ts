import { Component, OnInit, Input } from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	_coords:any;// = new google.maps.LatLng(43.643, -79.391);
  _zoom:number = 14;

	@Input() 
	set coords(coords:any){
		this._coords = coords;
	}


  @Input()
  set zoom(zoom:any){
    this._zoom = zoom;
  }
  constructor() { }

  ngOnInit() {
  	//this.initMap();
  }
	
	initMap() {
		let self = this;
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: self._zoom,
      //     center: self._coords
      //   });
        
      //   var marker = new google.maps.Marker({
      //     position: self._coords,
      //     map: map
      //   });
      // }
    }
}
