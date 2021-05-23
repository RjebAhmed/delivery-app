import { InternalStorageService } from './../../../services/internal-storage.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
  etat: string;
  list = []
  items = [];

uid;
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private is: InternalStorageService) {
    console.log(history.state.id)

    this.getState()

      this.auth.authState.subscribe(u =>{
        this.uid= u.uid
      })
      console.log(this.uid);
      
  }

  ngOnInit() {

  }
t(){

}

  getState() {
    this.db.collection("Lignecommande").doc(history.state.id).snapshotChanges().subscribe(data => {
      if (data.payload.data()["etat"] == "refuser") {

        setTimeout(() => {

          this.router.navigate(["chat"], { state: { id:data.payload.data()["userID"]  } }) 
        },
          5000);

      }
      if (data.payload.data()["etat"] == "accepter" ) {
        this.is.clear().then(done=>console.log(done)          ).catch(done=>console.log(done) )

        setTimeout(() => {
          this.router.navigate(["/compte/commande-en-cours"])
        },
          5000);

      }
      this.etat = data.payload.data()["etat"]
    })







    // this.auth.user.subscribe(user => {
    //   this.db.collection("Lignecommande", ref =>
    //     ref.where('userID', "==", history.state.id)).snapshotChanges().subscribe(data => {
    //       if (data.length > 0) {
    //         this.list = data.map(e => {
    //           if (e.payload.doc.data()["etat"] == "accepter") {

    //             setTimeout(() => {
    //               console.log("hello");
    //             },
    //               5000);

    //           }
    //           else {
    //             console.log("noooooo");

    //           }
    //           return {
    //             etat: e.payload.doc.data()["etat"]

    //           }
    //         })
    //       }
    //     })
    // })


  }

  getItems() {
    this.items = []
    this.is.getkeys().then(result => {
      result.value.forEach(element => {
        this.is.get(element.substr(8, element.length))
          .then(rst => {
            var item = JSON.parse(rst.value)

            this.items.push(item)
          })


      });
    })
      .catch(err => {
        console.log(err.message);
      })


  }
  test() {
    console.log(this.list);
    console.log("hello");


  }
}
