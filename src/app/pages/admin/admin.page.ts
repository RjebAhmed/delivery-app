import { Item } from './../../model/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
 

  chatters = []
  users = []
  List = []
  finalList=[]
  constructor(private db: AngularFirestore,
              private router:Router
  ) {
    this.getUsers()
    this.getChatters()
  }
  ngOnInit() {
  }
  getChatters() {
    this.db.collection("Chat").snapshotChanges().subscribe(data => {

      this.chatters = data.map(e => {

        return e.payload.doc.data()["userID"]


      })
    })

  }
  getUsers() {
    this.db.collection("Users").snapshotChanges().subscribe(data => {

      this.users = data.map(e => {
        return {
          id:e.payload.doc.id,
          nom:e.payload.doc.data()["nom"]
          
        }
      })
    })
  }
  test() {
    this.finalList=[]
    this.chatters.forEach(element => {
      if (!this.List.includes(element)) {
        this.List.push(element)

      }
    });
    console.log(this.List);
    
this.List.forEach(e => {
  this.users.forEach(el => {
    console.log(el["id"]);
    console.log(e);
    
    
    if (el["id"]==e && el["id"] != "rgFRcn82bkhHvkEptnm4r9kC6kj2" ) {
      this.finalList.push(el)
    }
  });
});
    console.log(this.finalList);
    this.router.navigate(["admin/chat-list"], { state: { chatList:this.finalList  } }) 

  }
}
