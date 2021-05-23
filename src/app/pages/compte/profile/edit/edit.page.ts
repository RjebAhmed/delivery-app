import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  nom: string;
  adresse: string;
  password: string;
  oldPassword: string;

  tel: number;
  email: string;
  change:string=""
  value:string;
  constructor(private auth :AngularFireAuth,private db:AngularFirestore) {
    this.change=history.state.change
    this.value=history.state.value


   }
  ngOnInit() {
  }
updateNom(){
  this.auth.authState.subscribe(u=>{
    this.db.collection("Users").doc(u.uid).update({nom:this.nom})
    .then(done=>console.log("done"))
    .catch(err=>console.log(err) )

  })
}
updateAdresse(){
  this.auth.authState.subscribe(u=>{
    this.db.collection("Users").doc(u.uid).update({adresse:this.adresse})
    .then(done=>console.log("done"))
    .catch(err=>console.log(err) )

  })
}
updatePassword(){
  console.log(this.value);
  console.log(this.oldPassword);

  
  if (this.value==this.oldPassword) {
    this.auth.authState.subscribe(u=>{
 
      this.db.collection("Users").doc(u.uid).update({password:this.password})
      .then(done=>console.log("done"))
      .catch(err=>console.log(err) )
  
    })
  } else {
console.log("mot de pass iucorrecte");

  }

}
updateTel(){
  this.auth.authState.subscribe(u=>{
    this.db.collection("Users").doc(u.uid).update({tel:this.tel})
    .then(done=>console.log("done"))
    .catch(err=>console.log(err) )

  })
}
updateEmail(){
  this.auth.authState.subscribe(u=>{
    this.db.collection("Users").doc(u.uid).update({email:this.email})
    .then(done=>console.log("done"))
    .catch(err=>console.log(err) )

  })
}
}
