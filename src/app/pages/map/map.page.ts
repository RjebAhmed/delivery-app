import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
declare const L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(private db: AngularFirestore) { }

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
      this.db.collection("Lignecommande", ref =>
        ref.where('etat', "==", "accepter")).snapshotChanges().subscribe(data => {
          data.map(e => {
            console.log(e.payload.doc.data()["loc"][0]);
            this.db.collection("Users").doc(e.payload.doc.data()["userID"]).get().subscribe(u=>{
            let m =    L.marker([e.payload.doc.data()["loc"][0],e.payload.doc.data()["loc"][1]]).addTo(mymap);
              
          m.bindPopup(`<b>Nom</b><br>_${u.data()["nom"]}<br><b>Telephone</b><br>_${u.data()["tel"]}
          <br><b>Réferance commande</b><br>_${e.payload.doc.id}
          <br><b>Prix totale </b><br>_${e.payload.doc.data()["total"]} DT
          `);

            })

          })
        })
      // let marker = L.marker([history.state.latitude, history.state.longitude]).addTo(mymap);
      // let marker2 = L.marker([position.coords.latitude+0.0001, position.coords.longitude]).addTo(mymap);

      // marker.bindPopup("<b>Hello world!</b><br>I am a popup.");

    })
  }

}
