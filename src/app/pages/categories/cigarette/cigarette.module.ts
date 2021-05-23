import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CigarettePageRoutingModule } from './cigarette-routing.module';

import { CigarettePage } from './cigarette.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CigarettePageRoutingModule
  ],
  declarations: [CigarettePage]
})
export class CigarettePageModule {}
