import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mySubscription: Subscription

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    // this.mySubscription = interval(10000).subscribe((x => {
    //   console.log("im in");
      
    //   this.auth.authState.subscribe(u => {
    //     if (u) {
    //       this.db.collection("Lignecommande", ref =>
    //         ref.where('userID', "==", u.uid)).snapshotChanges().subscribe(lc => {
    //           lc.map(e => {
    //             navigator.geolocation.getCurrentPosition(position => {

    //               this.db.collection("Lignecommande").doc(e.payload.doc.id).update({ loc: [position.coords.latitude, position.coords.longitude] })
              
    //             })
    //           })
    //         })
    //     }

    //   })

    // }));
  }
}
