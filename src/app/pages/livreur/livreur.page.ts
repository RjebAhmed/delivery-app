import { User } from './../../model/user';
import { Item } from './../../model/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.page.html',
  styleUrls: ['./livreur.page.scss'],
})
export class LivreurPage implements OnInit {
  orders = []
  mySubscription: Subscription
  orderTime = []
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    this.getOrders()
    this.mySubscription = interval(1000).subscribe((x => {
      this.getOrderTime()

    }));

  }
  test() {
    console.log(this.orderTime);

  }
  getOrderTime() {
    this.orderTime = []
    this.db.collection("Lignecommande", ref =>
      ref.where('etat', "==", "accepter")).snapshotChanges().subscribe(data => {
        data.map(e => {

          var dat: Date = new Date;
          if ((1800000 - (dat.getTime() - e.payload.doc.data()["date"])) > 0) {
            var d = this.transform(1800000 - (dat.getTime() - e.payload.doc.data()["date"]))
            this.orderTime.push(d);


          }
          else {
            this.orderTime.push("ra7 lghali");
            console.log("eeeeeeeeee");

          }

        })
      })
  }
  ionViewWillEnter() {
    this.getOrders()

  }

  ngOnInit() {
  }
  location(uid, loc) {
    console.log(loc);

    this.router.navigate(['/livreur/details'], { state: { uid: uid, latitude: loc[0], longitude: loc[1] } })


  }
  livrer(id: string) {
    this.auth.authState.subscribe(u => {
      this.db.collection("Livreurs").doc(u.uid).get().subscribe(liv => {
        this.db.collection("Livreurs").doc(u.uid).update({ nombreDeCommandesLivrée: liv.data()["nombreDeCommandesLivrée"] + 1 })
      })

    })
    this.db.collection("Lignecommande").doc(id).update({ etat: "livrée" })
      .then(done => this.getOrders())
      .catch(done => console.log("done"))

  }
  getOrders() {
    this.db.collection("Lignecommande", ref =>
      ref.where('etat', "==", "accepter")).snapshotChanges().subscribe(data => {
        this.orders = data.map(e => {
          var users = []
          var items = []
          this.db.collection("Users").doc(e.payload.doc.data()["userID"]).ref.get()
            .then(u => {
              var us: User = { nom: u.data()["nom"], adresse: u.data()["adresse"], tel: u.data()["tel"], email: u.data()["email"], password: u.data()["password"] }
              users.push(us)
            })
            .catch(err => console.log(err.message))




          var ids = e.payload.doc.data()["orders"]
          ids.forEach(element => {

            this.db.collection("Produits").doc(element).ref.get()
              .then(prod => {
                var i: Item = {
                  nom: prod.data()["nom"], prix: prod.data()["prix"],
                  quantite: prod.data()["quantite"], autre: prod.data()["autre"],
                  imageurl: prod.data()["imageurl"]
                }
                items.push(i)

              })
              .catch(err => console.log(err.message))
          });
          var dat: Date = new Date;

          var d = this.transform(dat.getTime() - e.payload.doc.data()["date"])
          return {
            items: items,
            userID: e.payload.doc.data()["userID"],
            etat: e.payload.doc.data()["etat"],
            total: e.payload.doc.data()["total"],
            id: e.payload.doc.id,
            users: users,
            date: d,
            loc: e.payload.doc.data()["loc"],
          }
        })
      })

  }
  transform(milliseconds) {
    //Get hours from milliseconds
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : '0' + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return + m + ':' + s;
  }
}
