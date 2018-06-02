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
      map: map,
      label: 'Me'
    });

    if(this.places && this.places.length){
        // var infowindow = new google.maps.InfoWindow({
        //   content: contentString
        // });

        // var marker = new google.maps.Marker({
        //   position: uluru,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });
        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        // });

      var markers = this.places.map((location, i)=>{
        return new google.maps.Marker({
          position:location,
          label: self.places[i].name
        });
      });

      var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    }
  }

}
