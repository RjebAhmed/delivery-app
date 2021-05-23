import { Item } from './../../model/item';
import { InternalStorageService } from './../../services/internal-storage.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  avis = []

  constructor(private is: InternalStorageService, private db: AngularFirestore) {
    this.getAvis()
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  getAvis() {
    console.log("eeeeee");

    this.db.collection("Avis", ref => ref.where("etat", "!=", "waiting")).snapshotChanges().subscribe(data => {

      this.avis = data.map(e => {
        var day = new Date(e.payload.doc.data()["date"]).getDate().toString();
        var mon = (new Date(e.payload.doc.data()["date"]).getMonth() + 1).toString();
        var year = new Date(e.payload.doc.data()["date"]).getFullYear().toString();




        var d = day + "/" + mon + "/" + year + "  "
        return {
          nom: e.payload.doc.data()["nom"],
          satrs: e.payload.doc.data()["stars"],
          date: d,
          avie: e.payload.doc.data()["avis"],
          id: e.payload.doc.id


        }
      })
    })
  }
  ngOnInit() {
  }
  setStorage() {
    var item4: Item = { nom: "kaskrout", quantite: "5 kg", prix: "5", autre: "tes test test", imageurl: "not found" }
    this.is.set(item4.nom, JSON.stringify(item4))
      .then(result => { console.log(result) })
      .catch(err => {
        console.log(err.message);
      })
  }
  getStorage() {
    this.is.get("kaskrout")
      .then(result => {
        console.log(JSON.parse(result.value));

      })
      .catch(err => {
        console.log(err.message);
      })
  }
  geKeys() {
    this.is.getkeys()
      .then(result => {
        result.value.forEach(element => {
          this.is.get(element.substr(8, element.length)).then(result => { console.log(result) })
            .catch(err => {
              console.log(err.message);
            })

        });


      })
      .catch(err => {
        console.log(err.message);
      })
  }

}