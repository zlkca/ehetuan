import { Component, OnInit, Input } from '@angular/core';

declare let google: any;
declare let MarkerClusterer:any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@Input() 
	center:any;

  @Input()
  zoom:any;

  @Input()
  places:any[];

  constructor() { }

  ngOnInit() {
  	this.initMap();
  }
	
  ngOnChanges(){
    this.initMap();
  }

	initMap() {
		let self = this;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: self.zoom,
        center: self.center
      });
        
    var marker = new google.maps.Marker({
      position: self.center,
      map: map
    });

    if(this.places && this.places.length){
      var markers = this.places.map((location, i)=>{
        return new google.maps.Marker({
          position:location,
          lable: 'Restaurant '+i
        });
      });

      var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }
  }

}
