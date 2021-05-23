import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  nom: string = "";
  adresse: string = "";
  password: string = "";
  tel: string = "";
  email: string = "";
  constructor(private db: AngularFirestore, private auth: AngularFireAuth, private toast: ToastController) { }

  ngOnInit() {
  }
  async showToast(color: string, msg: string) {
    await this.toast.create({
      message: msg,
      duration: 5000,
      color: color,
      keyboardClose: true,

    }).then(res => res.present())
  }
  signup(form: NgForm) {

    if (this.email != "" && this.tel != "" && this.password != "" && this.adresse != "" && this.nom != "") {
      var user1: User = form.value

      this.auth.createUserWithEmailAndPassword(user1.email, user1.password)
        .then(user => {
          this.db.collection("Users").doc(user.user.uid).set(user1)
            .then(done => {
              console.log("done");

            })
            .catch(err => console.log("db problem" + err.message))
        })
        .catch(err => {
          if (`The email address is badly formatted.` == err.message) {
            this.showToast("danger", "L'adresse e-mail est mal formatée.")
            console.log(err);
          }
          if (`The email address is badly formatted.` == err.message) {
            this.showToast("danger", "Le mot de passe doit contenir au moins 6 caractères")
            console.log(err);
          }
          if (`The email address is already in use by another account.` == err.message) {
            this.showToast("danger", "L'adresse e-mail est déjà utilisée par un autre compte.")
            console.log(err);
          }
        })



    }
    else {
      this.showToast("danger","Tous les champs doit être rempli")

    }
  }
}