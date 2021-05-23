import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  chatList=[]
  constructor(private router:Router,
  ) {
   console.log( (history.state.chatList ));
  this.chatList= history.state.chatList

  }
  ngOnInit() {
  }
  move(id){
    this.router.navigate(["chat"], { state: { id:id  } }) 

  }
}
