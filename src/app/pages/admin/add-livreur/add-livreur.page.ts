import { Livreur } from './../../../model/livreur';
import { User } from './../../../model/user';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-livreur',
  templateUrl: './add-livreur.page.html',
  styleUrls: ['./add-livreur.page.scss'],
})
export class AddLivreurPage implements OnInit {

  nom: string = "";
  adresse: string = "";
  password: string = "";
  tel: string = "";
  email: string = "";
  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private toast: ToastController) { }

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
var d:Date=new Date;
    if (this.email != "" && this.tel != "" && this.password != "" && this.adresse != "" && this.nom != "") {
      var user1:Livreur = {nom:this.nom,email:this.email,password:this.password,adresse:this.adresse,tel:this.tel,début:d.getTime(),nombreDeCommandesLivrée:0}

      this.auth.createUserWithEmailAndPassword(user1.email, user1.password)
        .then(user => {
          this.db.collection("Livreurs").doc(user.user.uid).set(user1)
            .then(done => {
              console.log("yeeesss");
              this.showToast("success", "Livreur ajouter avec success")
              form.resetForm()

            })
            .catch(err => console.log("db problem" + err.message))
        })
        .catch(err => {
          if (`The email address is badly formatted.` == err.message) {
            this.showToast("danger", "L'adresse e-mail est mal formatée.")
            console.log(err);
          }
          if (`Password should be at least 6 characters` == err.message) {
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
      this.showToast("danger", "Tous les champs doit être rempli")

    }
  }
}
