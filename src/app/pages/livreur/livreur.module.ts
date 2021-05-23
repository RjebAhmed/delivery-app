import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LivreurPageRoutingModule } from './livreur-routing.module';

import { LivreurPage } from './livreur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LivreurPageRoutingModule
  ],
  declarations: [LivreurPage]
})
export class LivreurPageModule {}
