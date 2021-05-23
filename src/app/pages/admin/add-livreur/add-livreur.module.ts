import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddLivreurPageRoutingModule } from './add-livreur-routing.module';

import { AddLivreurPage } from './add-livreur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddLivreurPageRoutingModule
  ],
  declarations: [AddLivreurPage]
})
export class AddLivreurPageModule {}
