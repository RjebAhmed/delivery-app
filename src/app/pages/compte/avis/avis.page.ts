import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { Avis } from 'src/app/model/avis';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.page.html',
  styleUrls: ['./avis.page.scss'],
})
export class AvisPage implements OnInit {
  stars: number = 3;
  avis: string;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private lc: LoadingController
  ) { }

  ngOnInit() {
  }
  updateStar(s: number) {
    this.stars = s;
    console.log(this.stars);

  }
  addAvis() {
    this.loading()
    this.auth.user.subscribe(u => {
      this.db.collection('Users').doc(u.uid).get().subscribe(user => {
        var d = new Date().getTime()
        var currentAvis: Avis = { nom: user.data()["nom"], avis: this.avis, stars: this.stars, date: d, etat: "waiting", image: user.data()["image"] }
        this.db.collection("Avis").add(currentAvis)
          .then(done => console.log("done"))
          .catch(err => console.log(err.message))
      })
    })

  }
  loading() {
    this.lc.create({
      message: "loading"
    }).then(load => {
      load.present();
      setTimeout(() => {
        load.dismiss()
      }, 5000)
    })
  }
}
