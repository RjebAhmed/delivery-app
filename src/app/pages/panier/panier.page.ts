import { Item } from './../../model/item';
import { LigneCommande } from './../../model/ligne-commande';

import { AngularFirestore } from '@angular/fire/firestore';
import { InternalStorageService } from './../../services/internal-storage.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  @ViewChildren('selector') item: QueryList<ElementRef>;
  @ViewChildren('selector2') quantite: QueryList<ElementRef>;
  id: string = "";
  loc: boolean = false;
  qte: number = 1;
  total: number = 0
  items = [];
  orders = []
  constructor(private is: InternalStorageService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private toast: ToastController,
    private alert: AlertController



  ) {
    this.getItems()

    this.afAuth.authState.subscribe(u => {
      if (u) {
        this.id = u.uid
      }
    })

  }
  async presentLoginAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Identification requise',
      message: `Vous devez vous connecter d'abord `,
      buttons: [
        {
          text: 'annuler',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Login',
          handler: (data: any) => {
            this.router.navigate(["/login"])
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async presentLcationAlert(uid) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: `Choix d'adresse`,
      message: `Vous pouvez choisir entre suivre votre emplacement (GPS) ou utiliser votre adresse précédemment entrer `,
      buttons: [
        {
          text: 'Mon address',
          handler: (data: any) => {


            var d: Date = new Date;
            console.log("heloooooo noooooooo");

            for (let i = 0; i < this.items.length; i++) {
              this.db.collection("Produits").add(this.items[i])
                .then(prod => {
                  this.orders.push(prod.id)

                  if (i == this.items.length - 1) {
                    let lc: LigneCommande = { loc: [], date: d.getTime(), userID: uid, total: this.total, orders: this.orders, etat: "" }
                    console.log(lc);

                    this.db.collection("Lignecommande").add(lc)
                      .then(lcc =>
                        this.router.navigate(["/panier/validation"], { state: { id: lcc.id } }))
                      .catch(err => console.log(err.message))
                  }

                })

                .catch(err => console.log(err.message))
            }

          }
        },
        {
          text: 'Truck my location',
          handler: (data: any) => {
            var d: Date = new Date;
            console.log("heloooooo noooooooo");
            var lo = []
            navigator.geolocation.getCurrentPosition(position => {
              lo.push(position.coords.latitude, position.coords.longitude)
            })
            for (let i = 0; i < this.items.length; i++) {
              this.db.collection("Produits").add(this.items[i])
                .then(prod => {
                  this.orders.push(prod.id)

                  if (i == this.items.length - 1) {
                    let lc: LigneCommande = { loc: lo, date: d.getTime(), userID: uid, total: this.total, orders: this.orders, etat: "" }
                    console.log(lc);

                    this.db.collection("Lignecommande").add(lc)
                      .then(lcc =>
                        this.router.navigate(["/panier/validation"], { state: { id: lcc.id } }))
                      .catch(err => console.log(err.message))
                  }

                })

                .catch(err => console.log(err.message))
            }
          }
        }
      ]
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  async showToast(color: string, msg: string) {
    await this.toast.create({
      message: msg,
      duration: 5000,
      color: color,
      keyboardClose: true,
      cssClass: 'toast_style'


    }).then(res => res.present())
  }
  ionViewWillEnter() {
    this.total = 0
    this.getItems();
  }

  async validez() {
    // const alert = await this.alert.create({
    //   cssClass: 'my-custom-class',
    //   header: `Choix d'adresse`,
    //   message: `Vous pouvez choisir entre suivre votre emplacement (GPS) ou utiliser votre adresse précédemment entrer `,
    //   buttons: [
    //     {
    //       text: 'Mon address',
    //       handler: (data: any) => {
    //         console.log('Canceled', data);
    //       }
    //     },
    //     {
    //       text: 'Truck my location',
    //       handler: (data: any) => {
    //         this.loc = true
    //       }
    //     }
    //   ]
    // });
    // console.log(this.loc);

    // await alert.present();
    // const { role } = await alert.onDidDismiss();

    // fi lawel nthabtou eli el total akthar men 5laf
    // ba3d nchoufou el user connecte walla 
    // kanah mouch connecte nab3thouh lpage el login 
    // si non 
    // console.log(this.id);

    if (this.total > 5) {

      this.afAuth.authState.subscribe(auth => {
        if (auth) {
          this.presentLcationAlert(auth.uid)
        }
        else {
          this.presentLoginAlert()
        }
      })
    } else {
      this.showToast("azra9", "votre commande doit depassé 5 Dinar")
    }


























    // if (this.total > 5) {

    //   this.afAuth.authState.subscribe(auth => {
    //     if (auth) {
    //       var d: Date = new Date;
    //       console.log();

    //       for (let i = 0; i < this.items.length; i++) {
    //         this.db.collection("Produits").add(this.items[i])
    //           .then(prod => {
    //             this.orders.push(prod.id)

    //             if (i == this.items.length - 1) {
    //               let lc: LigneCommande = { date: d.getTime(), userID: auth.uid, total: this.total, orders: this.orders, etat: "" }
    //               console.log(lc);

    //               this.db.collection("Lignecommande").add(lc)
    //                 .then(lcc =>
    //                   this.router.navigate(["/panier/validation"], { state: { id: lcc.id } }))
    //                 .catch(err => console.log(err.message))
    //             }

    //           })

    //           .catch(err => console.log(err.message))
    //       }
    //     }
    //     else {
    //       this.presentLoginAlert()
    //     }
    //   })
    // } else {
    //   this.showToast("azra9", "votre commande doit depassé 5 Dinar")
    // }
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
        this.total = 0;
        this.ionViewWillEnter();

      }
      )
      .catch(err => console.log(err)
      )

  }

}
