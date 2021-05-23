import { Item } from './../../model/item';
import { LigneCommande } from './../../model/ligne-commande';

import { AngularFirestore } from '@angular/fire/firestore';
import { InternalStorageService } from './../../services/internal-storage.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  @ViewChildren('selector') item: QueryList<ElementRef>;
  @ViewChildren('selector2') quantite: QueryList<ElementRef>;
  id: string = "";

  qte: number = 1;
  price: number = 7;
  total: number = 0
  items = [];
  orders = []
  constructor(private is: InternalStorageService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore

  ) {
    this.getItems()

    this.afAuth.authState.subscribe(u => {
      if (u) {
        this.id = u.uid
      }
    })

  }
  ionViewWillEnter() {
    this.getItems();
  }
  validez() {
    // fi lawel nthabtou eli el total akthar men 5laf
    // ba3d nchoufou el user connecte walla 
    // kanah mouch connecte nab3thouh lpage el login 
    // si non 
    console.log(this.id);
    if (this.id == "") {
      this.router.navigate(["/login"])

    }
    if (this.total > 5) {

      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          for (let i = 0; i < this.items.length; i++) {
            this.db.collection("Produits").add(this.items[i])
              .then(prod => {
                this.orders.push(prod.id)

                if (i == this.items.length - 1) {
                  let lc: LigneCommande = { userID: auth.uid, total: this.total, orders: this.orders, etat: "" }
                  console.log(lc);

                  this.db.collection("Lignecommande").add(lc)
                    .then(lcc =>
                      this.router.navigate(["/panier/validation"], { state: { id: lcc.id } }))
                    .catch(err => console.log(err.message))
                }

              })

              .catch(err => console.log(err.message))
          }
          console.log(this.orders);

          // this.items.forEach(item => {

          //   this.db.collection("Produits").add(item)
          //   .then(prod=>{
          //       this.orders.push(prod.id)
          //       console.log(this.orders);

          //   })

          //   .catch(err=>console.log(err.message))
          // });


          // let lc:LigneCommande={userID:auth.uid,total:this.total,orders:this.orders}
          // console.log(lc);

          // this.db.collection("Lignecommande").add(lc)
          // .then(()=>          this.router.navigate(["/validation"])    )
          // .catch(err=>console.log(err.message)        )

        }
        else {
          this.router.navigate(["/login"])

        }

      })
    } else {
      console.log("9athitak lazemha tfout 5 laf");

    }


  }
  ngOnInit() {
  }
  val
  add(i, key: string) {
    this.is.get(key)
      .then(rst => {
        var item = JSON.parse(rst.value)
        item["prix"] = "" + (parseFloat(item["prix"]) + parseFloat(item["prix"]) / parseFloat(item["quantite"]))
        item["quantite"] = "" + (parseFloat(item["quantite"]) + 1)
        this.item.toArray()[i].nativeElement.innerHTML = item["prix"]
        this.quantite.toArray()[i].nativeElement.innerHTML = item["quantite"]
        this.total += item["prix"] / item["quantite"]
        this.is.set(item.nom, JSON.stringify(item))
          .then()
          .catch(err => {
            console.log(err.message);
          })
      })
  }
  min(i, key: string) {

    this.is.get(key)
      .then(rst => {


        var item = JSON.parse(rst.value)
        if (parseFloat(item["quantite"]) > 1) {
          item["prix"] = "" + (parseFloat(item["prix"]) - parseFloat(item["prix"]) / parseFloat(item["quantite"]))
          item["quantite"] = "" + (parseFloat(item["quantite"]) - 1)
          this.item.toArray()[i].nativeElement.innerHTML = item["prix"]
          this.quantite.toArray()[i].nativeElement.innerHTML = item["quantite"]
          this.total -= item["prix"] / item["quantite"]

          this.is.set(item.nom, JSON.stringify(item))
            .then()
            .catch(err => {
              console.log(err.message);
            })
        }



      })


  }
  getItems() {
    this.items = []
    this.is.getkeys().then(result => {
      result.value.forEach(element => {
        this.is.get(element.substr(8, element.length))
          .then(rst => {
            var item = JSON.parse(rst.value)
            this.total += parseFloat(item["prix"]);

            this.items.push(item)
          })


      });
    })
      .catch(err => {
        console.log(err.message);
      })


  }

  deleteItem(key: string) {

    this.is.delete(key)
      .then(rst => {
this.ionViewWillEnter()    ;

      }
      )
      .catch(err => console.log(err)
      )

  }

}
