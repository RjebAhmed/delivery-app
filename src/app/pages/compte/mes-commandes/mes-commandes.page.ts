import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from './../../../model/item';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.page.html',
  styleUrls: ['./mes-commandes.page.scss'],
})
export class MesCommandesPage implements OnInit {

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
    ref.where('etat', "==", "livrée").where('userID', "==",user.uid)).stateChanges().subscribe(data => {
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
        return {
          items: items,
          userID: e.payload.doc.data()["userID"],
          etat: e.payload.doc.data()["etat"],
          total: e.payload.doc.data()["total"],
          id: e.payload.doc.id
        }
      })
    })
    
    })
    


  }
}
