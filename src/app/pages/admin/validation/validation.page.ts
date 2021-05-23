import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from './../../../model/item';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
  orders = []
  username:string;
  constructor(private db: AngularFirestore,private router:Router) {
    this.getOrders()
  }

  ngOnInit() {
  }
  accept(id: string) {
    this.db.collection("Lignecommande").doc(id).update({ etat: "accepter" })
      .then(done => this.getOrders())
      .catch(done => console.log("done"))

  }
  refuse(id: string,userID:string) {
    
    this.db.collection("Lignecommande").doc(id).update({ etat: "refuser" })
      .then(done => 
        {
          
          this.router.navigate(["/chat"], { state: { id:id  } }) 

        }
        )
      .catch(done => console.log("done"))

  }
  getOrders() {
var username=""
    this.db.collection("Lignecommande" ,ref =>
    ref.where('etat', "==", "")).stateChanges().subscribe(data => {


      console.log(username);
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
          nom: username,
          userID: e.payload.doc.data()["userID"],
          etat: e.payload.doc.data()["etat"],
          total: e.payload.doc.data()["total"],
          id: e.payload.doc.id
        }
      })
    })

  }
  test() {
    console.log(this.orders);

  }
}

