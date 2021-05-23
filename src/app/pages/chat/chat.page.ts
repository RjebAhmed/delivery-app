import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from './../../model/chat';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
id:string;
msg:string="";
conv=[]
who:boolean;
ID:string;
  constructor(private auth:AngularFireAuth,
    private db:AngularFirestore      
      ) {
        this.who=history.state.id == 'undefined'
    if (typeof history.state.id == 'undefined')
     {
      console.log("im not admin");
      
      this.auth.user.subscribe(user=>{
        this.ID=user.uid
        
        this.id=user.uid
        this.getConv()

        
      })
    }else{
      this.auth.user.subscribe(user=>{
        this.ID=user.uid
    
        
      })
      this.id=history.state.id
      console.log("im  admin");
      this.getConv()

    }

   
    
   }

  ngOnInit() {
  }
sendMsg(){
  var current = new Date();
console.log("ID"+this.ID);
console.log("id"+this.id);

  var message:Chat={userID:this.id,message:this.msg,
     date: current.getTime(),sender:(this.ID=="rgFRcn82bkhHvkEptnm4r9kC6kj2")}

this.db.collection("Chat").add(message)
.then(()=>this.getConv())
.catch(err=>console.log(err.message))
}
getConv(){
  // this.db.collection("chats")
  // .doc(this.uid)
  // .collection(this.o_id)
  // .snapshotChanges()
  // .subscribe(chat=>{
  //   this.chats= chat.map(e=>{
  //     return {
  //       id:e.payload.doc.id,
  //       uid:this.uid,
  //       msg:this.textMsg,
  //     }
  //   })
  // })

  this.db.collection("Chat",ref=> ref.where("userID","==",this.id).orderBy("date"))
  
  .snapshotChanges().subscribe(data=>{
    this.conv= data.map(e=>{
      var day=new Date(e.payload.doc.data()["date"]).getDate().toString();
      var mon=(new Date(e.payload.doc.data()["date"]).getMonth()+1).toString();
      var year=new Date(e.payload.doc.data()["date"]).getFullYear().toString();
      var hours=new Date(e.payload.doc.data()["date"]).getHours().toString();
      var minuts=new Date(e.payload.doc.data()["date"]).getMinutes().toString();




      var d=day+"/"+mon+"/"+year+"  "+hours+":"+minuts
      return {
        id:e.payload.doc.id,
        message:e.payload.doc.data()["message"],
        sender:e.payload.doc.data()["sender"],
        date: d
      }
    })
  })
}
}
