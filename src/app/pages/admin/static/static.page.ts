import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static',
  templateUrl: './static.page.html',
  styleUrls: ['./static.page.scss'],
})
export class StaticPage implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) {
  }
  livreurs = []
  goDetails(liv) {
    this.router.navigate(["/admin/static/details"], { state: { liv: liv } })
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAllLivreurs()
  }
  getAllLivreurs() {
    this.livreurs = []
    this.db.collection("Livreurs").snapshotChanges().subscribe(data => {
      data.map(e => {

        var day = new Date(e.payload.doc.data()["début"]).getDate().toString();
        var mon = (new Date(e.payload.doc.data()["début"]).getMonth() + 1).toString();
        var year = new Date(e.payload.doc.data()["début"]).getFullYear().toString();
        var hours = new Date(e.payload.doc.data()["début"]).getHours().toString();
        var minuts = new Date(e.payload.doc.data()["début"]).getMinutes().toString();




        var d = day + "/" + mon + "/" + year + "  " + hours + ":" + minuts
        this.livreurs.push({
          id: e.payload.doc.id,
          adresse: e.payload.doc.data()["adresse"],
          debut: d,
          email: e.payload.doc.data()["email"],
          nbc: e.payload.doc.data()["nombreDeCommandesLivrée"],
          nom: e.payload.doc.data()["nom"],
          tel: e.payload.doc.data()["tel"],

        })
      })
    })
  }

}
