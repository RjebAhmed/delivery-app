import { LigneCommande } from './../../model/ligne-commande';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
  etat: string;
  list = []

  constructor(private db: AngularFirestore) {
    // this.getState(history.state.id )

    this.getState("uQZ4CBMnEYYrjpMehUpv")


  }

  ngOnInit() {

  }
  test() {
    console.log("hello");

  }
  getState(id) {
    this.db.collection("Lignecommande", ref =>
      ref.where('userID', "==", "EpDG83QHOSRJPSxeWrCtVp5vMQz1")).snapshotChanges().subscribe(data => {
        if (data.length > 0) {
          this.list = data.map(e => {
            if (e.payload.doc.data()["etat"] == "accepter") {

              setTimeout(() => {
                console.log("hello");
              },
                5000);

            }
            else {
              console.log("noooooo");

            }
            return {
              etat: e.payload.doc.data()["etat"]

            }
          })
        }
      })

  }

}
