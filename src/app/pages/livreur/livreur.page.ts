import { User } from './../../model/user';
import { Item } from './../../model/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.page.html',
  styleUrls: ['./livreur.page.scss'],
})
export class LivreurPage implements OnInit {
  orders = []

  constructor(
    private db: AngularFirestore,
    private router:Router
  ) {
    this.getOrders()
  }

  ngOnInit() {
  }
  location(uid, loc) {
    console.log(loc);
    
  this.router.navigate(['/livreur/details'], {state:{uid:uid,latitude:loc[0],longitude:loc[1]}})


  }
  livrer(id: string) {
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
          var day = new Date(e.payload.doc.data()["date"]).toString().split(' ')[0];
          var mon = (new Date(e.payload.doc.data()["date"]).getMonth() + 1).toString();
          var year = new Date(e.payload.doc.data()["date"]).getFullYear().toString();
          var hours = new Date(e.payload.doc.data()["date"]).getHours().toString();

          var minuts = (new Date(e.payload.doc.data()["date"]).getMinutes() < 10 ? '0' : '') + new Date(e.payload.doc.data()["date"]).getMinutes()


          var d = day + " " + mon + " " + year
          var t = hours + ":" + minuts;
          return {
            items: items,
            userID: e.payload.doc.data()["userID"],
            etat: e.payload.doc.data()["etat"],
            total: e.payload.doc.data()["total"],
            id: e.payload.doc.id,
            users: users,
            date: d,
            time: t,
            loc: e.payload.doc.data()["loc"],
          }
        })
      })

  }
}
