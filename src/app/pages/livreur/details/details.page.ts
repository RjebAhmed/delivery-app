import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare const L: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor() {
    console.log(history.state);

  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(position => {

      var mymap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 17);

      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWhtZWRyamViMDE0OSIsImEiOiJja3A3azc4dzUwMTNhMm9ueWd3MGNweXhzIn0.zuyVirfbyGvfIxGI8s9zrA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);
      var circle = L.circle([position.coords.latitude, position.coords.longitude], {
        color: ' #0275d8 ',
        fillColor: '#0275d8 ',
        fillOpacity: 0.8,
        radius: 30
      }).addTo(mymap);
      let marker = L.marker([history.state.latitude, history.state.longitude]).addTo(mymap);
      // let marker2 = L.marker([position.coords.latitude+0.0001, position.coords.longitude]).addTo(mymap);

      // marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

    })

  }

}
