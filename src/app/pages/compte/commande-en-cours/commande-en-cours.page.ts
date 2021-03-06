import { Item } from './../../../model/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-commande-en-cours',
  templateUrl: './commande-en-cours.page.html',
  styleUrls: ['./commande-en-cours.page.scss'],
})
export class CommandeEnCoursPage implements OnInit {
  orders = []
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.getOrders()

  }

  ngOnInit() {
  }
  getOrders() {
   this.auth.authState.subscribe(user=>{
    this.db.collection("Lignecommande", ref =>
    ref.where('etat', "==", "accepter").where('userID', "==",user.uid)).stateChanges().subscribe(data => {
      this.orders = data.map(e => {
        var items = []
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

        var minuts = (new Date(e.payload.doc.data()["date"]).getMinutes()<10?'0':'') + new Date(e.payload.doc.data()["date"]).getMinutes() 


        var d = day + " " + mon + " " + year
        var t = hours + ":" + minuts;
        return {
          items: items,
          userID: e.payload.doc.data()["userID"],
          etat: e.payload.doc.data()["etat"],
          total: e.payload.doc.data()["total"],
          id: e.payload.doc.id,
          date: d,
          time: t
        }
      })
    })
    
    })
    


  }
}
