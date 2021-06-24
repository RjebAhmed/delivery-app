import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from './../../../model/user';
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
  user: any = []
  total:string;
  date=[]
  constructor(private db: AngularFirestore,private storage: AngularFireStorage) {
    console.log(history.state.id);
    this.db.collection("Lignecommande").doc(history.state.id).snapshotChanges().subscribe(lc => {
 this.total=lc.payload.data()["total"]
   var d=lc.payload.data()["date"]+1800000
   var hours = new Date(d).getHours().toString();
   var minuts = new Date(d).getMinutes().toString();
this.date=[hours,minuts]
















      this.db.collection("Users").doc(lc.payload.data()["userID"]).get().subscribe(u => {
        this.user = u.data()
        
        this.user.image=this.storage.ref(this.user.image).getDownloadURL()


        // this.image = this.storage.ref(data.data()["image"]).getDownloadURL()


      })
      var loc = lc.payload.data()["loc"];
      navigator.geolocation.getCurrentPosition(position => {

        var mymap = L.map('map').setView([loc[0], loc[1]], 17);

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
        let marker = L.marker([loc[0], loc[1]]).addTo(mymap);


      })

    })



  }

  ngOnInit() {


  }
}
