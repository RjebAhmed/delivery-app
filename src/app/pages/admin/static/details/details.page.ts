import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Livreur } from './../../../../model/livreur';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  liv;
  constructor(private db: AngularFirestore, private router: Router) {
    this.liv = history.state.liv;
    console.log(this.liv);

  }
  exclu(id) {
    this.db.collection("Livreurs").doc(id).delete()
      .then(done => {
        this.router.navigate(["/admin/static"])

      })
  }
  ngOnInit() {
  }

}
