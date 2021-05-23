import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.page.html',
  styleUrls: ['./avis.page.scss'],
})
export class AvisPage implements OnInit {
avis=[]
  constructor(private db:AngularFirestore) {
    this.getAvis()
   }

  ngOnInit() {
  }
getAvis(){
  this.db.collection("Avis",ref=>ref.where("etat","==","waiting")).snapshotChanges().subscribe(data=>{
    
    this.avis= data.map(e=>{
      var day=new Date(e.payload.doc.data()["date"]).getDate().toString();
      var mon=(new Date(e.payload.doc.data()["date"]).getMonth()+1).toString();
      var year=new Date(e.payload.doc.data()["date"]).getFullYear().toString();
     



      var d=day+"/"+mon+"/"+year+"  "
      return {
        nom:e.payload.doc.data()["nom"],
        satrs:e.payload.doc.data()["stars"],
        date:d,
        avie:e.payload.doc.data()["avis"],
        id:e.payload.doc.id
        

      }
    })
  })
}
accepter(id){
  console.log(id);
  
  this.db.collection("Avis").doc(id).update({etat:"accepter"})
  .then(done=>{this.getAvis()})
  .catch(err=>console.log(err.message) )
}
refuser(id){
  this.db.collection("Avis").doc(id).delete()
  .then(done=>this.getAvis())
  .catch(err=>console.log(err.message) )
}
}
