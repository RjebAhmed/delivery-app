import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  ngOnInit() {
  }
  forgot(form: NgForm) {
    this.auth.sendPasswordResetEmail(this.email)
    .then(done=>console.log("done"))
    .catch(err=>console.log(err)  )
  }
}
