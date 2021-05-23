import { Item } from './../../../model/item';
import { InternalStorageService } from './../../../services/internal-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fastfood',
  templateUrl: './fastfood.page.html',
  styleUrls: ['./fastfood.page.scss'],
})
export class FastfoodPage implements OnInit {
nom:string=""
quantite:string=""
prix:string=""
autre:string=""
items=[]
  constructor(private is : InternalStorageService) { 

this.getItems()
  }
setItem(){
  var item:Item={nom:this.nom,quantite:this.quantite,prix:this.prix,autre:this.autre,imageurl:"not found"}

   this.is.set(item.nom,JSON.stringify(item))
   .then(result=>{console.log(result)  })
   .catch(err=>{console.log(err.message);
   })
   this.getItems()
}
getItems(){
  this.items=[]
  this.is.getkeys() .then(result=>{
    result.value.forEach(element => {
      this.items.push(element)        
      
    });
   })
  .catch(err=>{console.log(err.message);
  })
  console.log(this.items);
    
  
}
  ngOnInit() {
  }

}
