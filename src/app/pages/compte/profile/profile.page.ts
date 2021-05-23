import { User } from './../../../model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any;
  id:string;
  nom:string;
  adresse:string;
  tel:string;
  password:string;
  email:string;
  constructor(private auth:AngularFireAuth,
    private db:AngularFirestore,
    private router:Router
    ) {
    this.getUser()
   }

  ngOnInit() {
  }
  getUser(){
    this.auth.user.subscribe(u=>{
      console.log(u.uid);
      
      this.db.collection("Users").doc(u.uid).get().subscribe(data=>{
      this.id=data.id
      this.nom= data.data()["nom"]
      this.adresse= data.data()["adresse"]
      this.email= data.data()["email"]
      this.password= data.data()["password"]
      this.tel= data.data()["tel"]

  
      })
    })
  }
  toNom(){
    this.router.navigate(["/compte/profile/edit"], { state:{value:this.nom,change:"nom"}}) 
  }
  toEmail(){
    this.router.navigate(["/compte/profile/edit"], { state:{value:this.email,change:"email"}}) 
  }
  toPassword(){
    this.router.navigate(["/compte/profile/edit"], { state:{value:this.password,change:"password"}}) 
  }
  toTel(){
    this.router.navigate(["/compte/profile/edit"], { state:{value:this.tel,change:"tel"}}) 
  }
  toAdresse(){
    this.router.navigate(["/compte/profile/edit"], { state:{value:this.adresse,change:"adresse"}}) 
  }
}
