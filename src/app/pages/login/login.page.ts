import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router,
    private toast: ToastController
  ) {
    
   }
  async showToast(color: string, msg: string) {
    await this.toast.create({
      message: msg,
      duration: 5000,
      color: color,
      keyboardClose: true,

    }).then(res => res.present())
  }
  ngOnInit() {
    
  }
  login(form: NgForm) {
    if (this.email != "" && this.password != "") {
      this.auth.signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log("welcome");
          this.db.collection("Users").doc(user.user.uid).ref.get()
            .then(doc => {
              if (this.email == "admin@gmail.com" && this.password == "adminadmin") {
                this.router.navigate(["/admin"])
              }
              if (doc.exists) {
                console.log("you're a simple user");
                this.router.navigate(["/accueil"])

              }
              else {
                console.log("you're admin or delivery man");
                this.router.navigate(["/livreur"])

              }
            })

        })
        .catch(err => {
          console.log(`The password is invalid or the user does not have a password.`);
          console.log(err.message);
          
          
          if (`The email address is badly formatted.` == err.message) {
            this.showToast("danger", "L'adresse e-mail est mal formatée.")
            console.log(err);
          }
          if (`The password is invalid or the user does not have a password.` == err.message) {
            this.showToast("danger", "Le mot de passe est invalide")
            console.log(err);
          }
          if (`There is no user record corresponding to this identifier. The user may have been deleted.` == err.message) {
            this.showToast("danger", "Il n'y a pas d'utilisateur correspondant à cet identifiant")
            console.log(err);
          }
          else {
            this.showToast("danger", err.message)
            console.log(err);
          }

        })
    } else {
      this.showToast("danger", "Tous les champs doit être rempli")

    }
  }
}
