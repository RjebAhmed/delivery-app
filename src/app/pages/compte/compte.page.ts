import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  nom: string;
  user: any;
  id: string;
  image: any = null
  @ViewChild('selector') file: any;
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private toast: ToastController,
    private alert: AlertController,
    private router: Router,
    private storage: AngularFireStorage


  ) {
    this.getImage()
    this.getNom()
  }
  getNom(){
    this.auth.authState.subscribe(u => {
      if (u) {
        this.user = u
        this.id = u.uid
        this.db.collection("Users").doc(u.uid).get().subscribe(e => {
          this.nom = e.data()["nom"]
        })
  
      }
   
    })
  }
  onselectFile(e) {
    if (e.target.files) {
      const files = e.target.files[0]
      const filePath = "" + Date.now() + '_' + files.name
      this.storage.upload(filePath, files)
      this.db.collection("Users").doc(this.id).update({ image: filePath })
        .then(done => {
          this.getImage()
        })
        .catch(err => console.log(err))
    }
  }
  test() {
    console.log(this.id);
    console.log(this.image);


  }
  getImage() {
    this.auth.authState.subscribe(u => {
      if (u) {
        this.db.collection("Users").doc(u.uid).get().subscribe(data => {
          if (data.data()["image"]) {
                      this.image = this.storage.ref(data.data()["image"]).getDownloadURL()

          }
          
  
        }) 
      }
    
    })

  }
  async presentAlert() {
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
    console.log('onDidDismiss resolved with role', role);
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
  logout() {
    this.auth.signOut()
      .then(done => {
      
        this.showToast("success", "vous deconnectée avec succeé")
        location.reload()

      })
      .catch(err => console.log(err.message))
  }
  goTo(page: string) {
    this.presentAlert()
    this.router.navigate([page])
  }
}
